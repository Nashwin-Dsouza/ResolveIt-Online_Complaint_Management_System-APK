const User = require('../models/User');

// Simple authentication middleware
// In production, you would use JWT tokens
const authenticateUser = async (req, res, next) => {
  try {
    // For this demo, we'll use a simple approach with user email in headers
    // In production, you would verify JWT tokens
    const userEmail = req.headers['user-email'];
    const authToken = req.headers['authorization'];

    if (!userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify user exists
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    // Attach user to request
    req.user = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// For demo purposes - extract user email from session or token
const getUserFromRequest = (req) => {
  // This is a simplified approach for demo
  // In production, you would extract from JWT token
  return req.headers['user-email'] || null;
};

module.exports = {
  authenticateUser,
  getUserFromRequest
};
