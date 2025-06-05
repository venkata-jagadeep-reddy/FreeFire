import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import emailjs from 'emailjs-com';

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));

// EmailJS Configuration
emailjs.init(process.env.EMAILJS_USER_ID);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: process.env.ADMIN_EMAIL,
      message: message,
      reply_to: email
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.EMAILJS_USER_ID
    );

    if (response.status === 200) {
      return res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message',
      error: error.message 
    });
  }
});

// Registration Confirmation Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, teamName, playerId } = req.body;

    // Input validation
    if (!name || !email || !teamName || !playerId) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Send registration confirmation email
    const templateParams = {
      to_email: email,
      name: name,
      team_name: teamName,
      player_id: playerId,
      reply_to: process.env.ADMIN_EMAIL
    };

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      'freefire_registration_confirmation', // Your template name in EmailJS
      templateParams,
      process.env.EMAILJS_USER_ID
    );

    if (response.status === 200) {
      return res.status(200).json({ 
        success: true, 
        message: 'Registration successful! Check your email for confirmation.' 
      });
    } else {
      throw new Error('Failed to send registration confirmation');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again.',
      error: error.message 
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`CORS-enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

export default app;
