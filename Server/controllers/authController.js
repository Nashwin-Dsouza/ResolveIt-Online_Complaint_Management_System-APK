import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, password } = req.body;

    const newUser = new User({ firstName, lastName, email, dob, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password field
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.error('Login failed: user not found for email', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For simplicity, plain text password comparison (should use hashing in production)
    if (user.password !== password) {
      console.error('Login failed: incorrect password for email', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
