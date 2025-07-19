const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration for mobile app
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'capacitor://localhost', 'http://localhost'],
  credentials: true
}));

app.use(express.json());

// In-memory storage for testing
const users = [];
const otps = [];

// Generate simple OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP endpoint
app.post('/api/otp/send', (req, res) => {
  try {
    const { email, type, password } = req.body;
    
    console.log('OTP request:', { email, type, password });

    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }

    // For login, check if user exists
    if (type === 'login') {
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    }

    // For signup, check if user doesn't exist
    if (type === 'signup') {
      const user = users.find(u => u.email === email);
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Generate and store OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Remove existing OTP for this email
    const otpIndex = otps.findIndex(o => o.email === email && o.type === type);
    if (otpIndex !== -1) {
      otps.splice(otpIndex, 1);
    }

    // Store new OTP
    otps.push({
      email,
      otp,
      type,
      expiresAt,
      isUsed: false
    });

    console.log(`OTP sent to ${email}: ${otp}`);

    res.status(200).json({ 
      message: 'OTP sent successfully',
      email: email
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP endpoint
app.post('/api/otp/verify', (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!email || !otp || !type) {
      return res.status(400).json({ error: 'Email, OTP, and type are required' });
    }

    // Find OTP record
    const otpRecord = otps.find(o => 
      o.email === email && 
      o.otp === otp && 
      o.type === type && 
      !o.isUsed && 
      o.expiresAt > new Date()
    );

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Mark OTP as used
    otpRecord.isUsed = true;

    // For login OTP, return user data
    if (type === 'login') {
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      return res.status(200).json({
        message: 'OTP verified successfully',
        user: { email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    }

    // For signup OTP, return success
    res.status(200).json({
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  try {
    const { firstName, lastName, email, dob, password } = req.body;

    if (!firstName || !lastName || !email || !dob || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      dob,
      password,
      createdAt: new Date()
    };

    users.push(newUser);

    console.log('User created:', email);

    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User logged in:', email);

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'ResolveIt API is running!',
    endpoints: [
      'POST /api/otp/send',
      'POST /api/otp/verify', 
      'POST /api/auth/signup',
      'POST /api/auth/login'
    ]
  });
});

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  const now = new Date();
  const expiredCount = otps.length;
  for (let i = otps.length - 1; i >= 0; i--) {
    if (otps[i].expiresAt < now) {
      otps.splice(i, 1);
    }
  }
  if (expiredCount !== otps.length) {
    console.log(`Cleaned up ${expiredCount - otps.length} expired OTPs`);
  }
}, 5 * 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Simple ResolveIt Server running on port ${PORT}`);
  console.log(`📱 API available at: http://localhost:${PORT}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/`);
}); 