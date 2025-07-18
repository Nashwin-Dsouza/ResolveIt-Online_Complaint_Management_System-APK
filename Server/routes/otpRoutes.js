import express from 'express';
const router = express.Router();
import * as otpController from '../controllers/otpController.js';

// OTP routes
router.post('/send', otpController.sendOTP);
router.post('/verify', otpController.verifyOTP);
router.post('/resend', otpController.resendOTP);

export default router; 