import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  phone: { type: String }
});

const registrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  phone1: { type: String, required: true },
  phone2: { type: String },
  players: [playerSchema],
  payment: {
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    timestamp: { type: Date }
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Registration', registrationSchema);
