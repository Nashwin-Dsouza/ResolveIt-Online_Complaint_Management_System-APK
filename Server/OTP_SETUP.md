# OTP System Setup Guide

## Environment Configuration

Create a `.env` file in the Server directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/resolveit

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000

# JWT Secret (for future use)
JWT_SECRET=your-jwt-secret-key
```

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → App passwords
   - Select "Mail" and your device
   - Copy the generated password
4. Use this password in `EMAIL_PASS`

## Features Implemented

### Backend
- ✅ OTP Model with expiration
- ✅ Email service with Nodemailer
- ✅ OTP generation and verification
- ✅ Automatic cleanup of expired OTPs
- ✅ Resend OTP functionality

### Frontend
- ✅ OTP input interface
- ✅ Email validation
- ✅ Loading states
- ✅ Error handling
- ✅ Success messages
- ✅ Auto-focus functionality

## API Endpoints

- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP
- `POST /api/otp/resend` - Resend OTP

## Usage

1. Start the server: `npm run dev`
2. Start the client: `npm run dev`
3. Enter email in login/signup form
4. Click "Login/Sign Up with OTP"
5. Check your email for the 4-digit code
6. Enter the OTP and verify

## Security Features

- OTPs expire after 10 minutes
- One-time use only
- Automatic cleanup of expired OTPs
- Email validation before sending
- Rate limiting (can be added) 