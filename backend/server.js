/* ------------------------------------------------------------------ *
 *  server.js – FreeFire backend
 * ------------------------------------------------------------------ */

// Core / 3rd-party imports
import express  from 'express';
import cors     from 'cors';
import dotenv   from 'dotenv';
import morgan   from 'morgan';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto   from 'crypto';
import path     from 'path';
import { fileURLToPath } from 'url';
import Registration from './models/Registration.js';

/* ------------------------------------------------------------------ *
 *  Path helpers & env
 * ------------------------------------------------------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/* ------------------------------------------------------------------ *
 *  Express app
 * ------------------------------------------------------------------ */
const app  = express();
const PORT = Number(process.env.PORT) || 5000;

/* ------------------------------------------------------------------ *
 *  MongoDB – connect once, log clearly
 * ------------------------------------------------------------------ */
let isMongoConnected = false;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('ℹ️  MONGODB_URI not set – running without database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isMongoConnected = true;
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.warn('⚠️  Continuing without database – data WILL NOT persist');
  }
};

connectDB();   // fire and forget (server still boots)

/* ------------------------------------------------------------------ *
 *  Middleware
 * ------------------------------------------------------------------ */
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://freefire-frontend.onrender.com',
  'https://freefire-frontend.onrender.com/'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* ------------------------------------------------------------------ *
 *  Initialize Razorpay
 * ------------------------------------------------------------------ */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/* ------------------------------------------------------------------ *
 *  Routes
 * ------------------------------------------------------------------ */
// Get Razorpay key
app.get('/api/payment/get-key', (_, res) => {
  res.json({
    key: process.env.RAZORPAY_KEY_ID
  });
});

// Create Razorpay order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const options = {
      amount: 50000, // ₹500 in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// Verify payment and save registration
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationData } = req.body;
    
    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required payment parameters' 
      });
    }

    // Verify payment signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid payment signature' 
      });
    }

    // If we have registration data, save it
    if (registrationData && isMongoConnected) {
      try {
        const registration = new Registration({
          ...registrationData,
          payment: {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: 50000, // ₹500 in paise
            currency: 'INR',
            status: 'completed',
            timestamp: new Date()
          },
          registeredAt: new Date()
        });
        
        await registration.save();
        console.log('✅ Registration saved successfully');
      } catch (saveError) {
        console.error('❌ Registration save error:', saveError);
        // Don't fail the payment verification if saving to DB fails
      }
    }
    
    // Return success response
    res.json({ 
      success: true, 
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
    
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error during payment verification',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/health', (_, res) => {
  res.json({
    status   : 'ok',
    mongoDB  : isMongoConnected ? 'connected' : 'disconnected',
    requests : 'alive'
  });
});

/* ---------- 1) save registration to DB (optional) -------------- */
app.post('/api/register', async (req, res) => {
  const { teamName, email, phone1, phone2, players } = req.body;

  if (!teamName || !email || !phone1 || !Array.isArray(players) || !players.length) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const doc = {
    teamName,
    email,
    phone1,
    phone2,
    players: players.filter(p => p && p.name && p.userId)
  };

  if (isMongoConnected) {
    try {
      await new Registration(doc).save();
      console.log('💾 Registration stored in MongoDB');
    } catch (err) {
      console.error('Mongo save error (ignored):', err.message);
    }
  }

  res.status(201).json({ success: true, data: doc });
});

/* ---------- 404 + error handlers ------------------------------- */
app.use((_, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// final error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal error' });
});

/* ------------------------------------------------------------------ *
 *  Boot server (auto-increment port if in use)
 * ------------------------------------------------------------------ */
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀  Server listening on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} busy, trying ${port + 1}…`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);

/* ------------------------------------------------------------------ */
export default app;
