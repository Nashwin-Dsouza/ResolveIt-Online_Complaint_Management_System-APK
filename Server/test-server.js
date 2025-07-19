const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store OTPs in memory (for testing)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Test Server is running!', status: 'OK' });
});

// Send OTP
app.post('/api/otp/send', (req, res) => {
  try {
    const { email, type } = req.body;
    
    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }
    
    if (!['login', 'signup'].includes(type)) {
      return res.status(400).json({ error: 'Invalid OTP type' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    // Store OTP
    const key = `${email}_${type}`;
    otpStore.set(key, { otp, expiresAt });
    
    // Log OTP to console (for testing)
    console.log(`\n📧 OTP SENT:`);
    console.log(`Email: ${email}`);
    console.log(`Type: ${type}`);
    console.log(`OTP: ${otp}`);
    console.log(`Expires: ${new Date(expiresAt).toLocaleString()}\n`);
    
    res.status(200).json({ 
      message: 'OTP sent successfully',
      email: email,
      note: 'Check console for OTP code'
    });
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  try {
    const { email, otp, type } = req.body;
    
    if (!email || !otp || !type) {
      return res.status(400).json({ error: 'Email, OTP, and type are required' });
    }
    
    const key = `${email}_${type}`;
    const storedData = otpStore.get(key);
    
    if (!storedData) {
      return res.status(400).json({ error: 'OTP not found' });
    }
    
    if (storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(key);
      return res.status(400).json({ error: 'OTP expired' });
    }
    
    // Remove OTP after successful verification
    otpStore.delete(key);
    
    console.log(`\n✅ OTP VERIFIED:`);
    console.log(`Email: ${email}`);
    console.log(`Type: ${type}\n`);
    
    res.status(200).json({
      message: 'OTP verified successfully',
      user: { email, name: 'Test User' }
    });
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Resend OTP
app.post('/api/otp/resend', (req, res) => {
  try {
    const { email, type } = req.body;
    
    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }
    
    // Delete existing OTP
    const key = `${email}_${type}`;
    otpStore.delete(key);
    
    // Call send OTP function
    return app._router.handle(req, res, () => {
      req.url = '/api/otp/send';
      req.method = 'POST';
      app._router(req, res);
    });
    
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ error: 'Failed to resend OTP' });
  }
});

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(key);
      console.log(`🧹 Cleaned up expired OTP for: ${key}`);
    }
  }
}, 5 * 60 * 1000);

// Get local IP address
const os = require('os');
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return 'localhost';
};

const localIP = getLocalIP();

// Start server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Test Server running on:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://${localIP}:${PORT}`);
  console.log(`📧 OTP testing enabled - check console for codes`);
  console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);
  console.log(`📱 Use Network URL for phone testing\n`);
});

module.exports = app; 