import Otp from '../models/Otp.js';
import User from '../models/User.js';
import { generateOTP, sendOTPEmail } from '../services/emailService.js';

// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }

    if (!['login', 'signup'].includes(type)) {
      return res.status(400).json({ error: 'Invalid OTP type' });
    }

    // For login OTP, check if user exists
    if (type === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    // For signup OTP, check if user doesn't exist
    if (type === 'signup') {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTP for this email and type
    await Otp.deleteMany({ email, type });

    // Save new OTP
    const newOtp = new Otp({
      email,
      otp,
      type,
      expiresAt
    });
    await newOtp.save();

    // Send email
    const emailSent = await sendOTPEmail(email, otp, type);
    
    if (!emailSent) {
      await Otp.deleteOne({ _id: newOtp._id });
      return res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.status(200).json({ 
      message: 'OTP sent successfully',
      email: email // Return email for frontend reference
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!email || !otp || !type) {
      return res.status(400).json({ error: 'Email, OTP, and type are required' });
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({
      email,
      otp,
      type,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // For login OTP, return user data
    if (type === 'login') {
      const user = await User.findOne({ email }, '-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      return res.status(200).json({
        message: 'OTP verified successfully',
        user: user
      });
    }

    // For signup OTP, return success (user will be created in signup process)
    res.status(200).json({
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }

    // Delete existing OTP
    await Otp.deleteMany({ email, type });

    // Call send OTP function
    return await sendOTP(req, res);

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ error: 'Failed to resend OTP' });
  }
}; 