const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'https://localhost', 
    'capacitor://localhost',
    'https://resolveit-online-complaint-management-xncb.onrender.com',
    'https://resolveit-online-complaint-management.onrender.com',
    'capacitor://resolveit-online-complaint-management-xncb.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/devices', deviceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;