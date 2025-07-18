import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  port: 587,
  secure: false
});

// Generate OTP
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, type) => {
  try {
    const subject = type === 'login' 
      ? 'Login OTP - ResolveIt' 
      : 'Signup OTP - ResolveIt';
    
    // Use a public URL for the logo (adjust if needed)
    const logoUrl = 'https://your-domain.com/images/resolveit.png'; // <-- Update this to your actual public URL
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f6fb; border-radius: 16px; box-shadow: 0 4px 24px rgba(37,99,235,0.08); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px 0 16px 0; text-align: center;">
          <img src="${logoUrl}" alt="ResolveIt Logo" style="width: 72px; height: 72px; margin-bottom: 12px; border-radius: 16px; box-shadow: 0 2px 8px #1d4ed8; background: white;" />
          <h1 style="color: white; margin: 0; font-size: 32px; letter-spacing: 1px;">ResolveIt</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Online Complaint Management System</p>
        </div>
        <div style="background: white; padding: 36px 32px 32px 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);">
          <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 22px;">Your One-Time Password (OTP)</h2>
          <div style="background: #f3f4f6; padding: 24px; border-radius: 10px; text-align: center; margin: 24px 0;">
            <h1 style="color: #2563eb; font-size: 40px; margin: 0; letter-spacing: 12px; font-weight: bold;">${otp}</h1>
          </div>
          <p style="color: #374151; margin-bottom: 20px; font-size: 16px;">
            Please use this OTP to complete your ${type === 'login' ? 'login' : 'signup'} process. This code is valid for <b>10 minutes</b>.
          </p>
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 6px;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Security Tip:</strong> Never share your OTP with anyone. If you did not request this, please ignore this email.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            This is an automated message from <b>ResolveIt</b>. Please do not reply to this email.<br/>
            &copy; ${new Date().getFullYear()} ResolveIt
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Verify transporter
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email service configured successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration failed:', error);
    return false;
  }
}; 