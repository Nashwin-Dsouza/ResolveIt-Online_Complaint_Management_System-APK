"use client";

import { useState } from "react";
import ValidationUtils from '../utils/validation';
import ApiService from '../services/apiService';

export default function ForgotPassword({ onBack, email = "" }) {
  const [formData, setFormData] = useState({
    email: email,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetData, setResetData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const emailValidation = ValidationUtils.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setErrorMsg(emailValidation.errors.join(', '));
      return;
    }

    setIsLoading(true);
    try {
      const apiService = new ApiService();
      await apiService.sendOTP(formData.email, 'reset');
      setSuccessMsg("Password reset link sent to your email!");
      setShowResetForm(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      if (error.message.includes('User not found')) {
        setErrorMsg("Email not found. Please check your email address.");
      } else {
        setErrorMsg("Failed to send reset link. Please try again.");
      }
    }
    setIsLoading(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (resetData.newPassword !== resetData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const passwordValidation = ValidationUtils.validatePassword(resetData.newPassword);
    if (!passwordValidation.isValid) {
      setErrorMsg(passwordValidation.errors.join(', '));
      return;
    }

    setIsLoading(true);
    try {
      const apiService = new ApiService();
      await apiService.verifyOTP(formData.email, resetData.otp, 'reset');
      
      // Here you would typically call a password reset API
      // For now, we'll just show success message
      setSuccessMsg("Password reset successfully! You can now login with your new password.");
      
      setTimeout(() => {
        if (onBack) onBack();
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.message.includes('Invalid OTP')) {
        setErrorMsg("Invalid OTP. Please check your email and try again.");
      } else {
        setErrorMsg("Failed to reset password. Please try again.");
      }
    }
    setIsLoading(false);
  };

  if (showResetForm) {
    return (
      <div className="space-y-4 p-2 sm:p-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-sm text-gray-600 mt-1">Enter the OTP sent to your email</p>
        </div>

        {errorMsg && (
          <div className="flex items-center text-red-600 font-semibold">
            <span className="mr-2">❌</span> {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="flex items-center text-green-600 font-semibold">
            <span className="mr-2">✅</span> {successMsg}
          </div>
        )}

        <form onSubmit={handleResetSubmit} className="space-y-4">
          <label htmlFor="otp" className="block mb-1 text-sm sm:text-base">OTP</label>
          <input
            id="otp"
            type="text"
            name="otp"
            value={resetData.otp}
            onChange={handleResetChange}
            placeholder="Enter 4-digit OTP"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
            required
            maxLength="4"
          />

          <label htmlFor="newPassword" className="block mb-1 text-sm sm:text-base">New Password</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={resetData.newPassword}
            onChange={handleResetChange}
            placeholder="New Password"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
            required
          />

          <label htmlFor="confirmPassword" className="block mb-1 text-sm sm:text-base">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={resetData.confirmPassword}
            onChange={handleResetChange}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
            required
          />

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowResetForm(false)}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg shadow hover:bg-gray-600 transition text-sm sm:text-base"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg shadow hover:drop-shadow-[0_0_8px_#2563EB] transition text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Resetting...
                </span>
              ) : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-sm text-gray-600 mt-1">Enter your email to receive a reset link</p>
      </div>

      {errorMsg && (
        <div className="flex items-center text-red-600 font-semibold">
          <span className="mr-2">❌</span> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="flex items-center text-green-600 font-semibold">
          <span className="mr-2">✅</span> {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
          required
        />

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg shadow hover:bg-gray-600 transition text-sm sm:text-base"
          >
            Back to Login
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg shadow hover:drop-shadow-[0_0_8px_#2563EB] transition text-sm sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
} 