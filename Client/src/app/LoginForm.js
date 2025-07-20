"use client";

import { useState } from "react";
import ValidationUtils from '../utils/validation';
import SecureStorage from '../utils/secureStorage';
import ApiService from '../services/apiService';

export default function LoginForm({ onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    const emailValidation = ValidationUtils.validateEmail(formData.email);
    const passwordValidation = ValidationUtils.validatePassword(formData.password);

    if (!emailValidation.isValid) {
      setErrorMsg(emailValidation.errors.join(', '));
      return;
    }

    if (!passwordValidation.isValid) {
      setErrorMsg(passwordValidation.errors.join(', '));
      return;
    }

    setIsLoading(true);
    try {
      const apiService = new ApiService();
      await apiService.login(formData.email, formData.password);
      
      if (remember) {
        await SecureStorage.setRememberLogin(true);
      }
      
      setSuccessMsg("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });
      
      // Redirect to home page or dashboard
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid credentials')) {
        setErrorMsg("Invalid email or password");
      } else if (error.message.includes('User not found')) {
        setErrorMsg("User not found. Please check your email");
      } else if (error.message.includes('Account not verified')) {
        setErrorMsg("Please verify your account first");
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword(formData.email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2 sm:p-4">
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
      <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
        required
      />
      <label htmlFor="password" className="block mb-1 text-sm sm:text-base">Password</label>
      <div className="relative flex items-center">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition pr-10 text-sm sm:text-base"
          required
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none p-1 bg-white rounded-full"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403-3.22-1.125-4.575m-1.875 2.25A9.956 9.956 0 0112 21c-1.657 0-3.22-.403-4.575-1.125m-2.25-1.875A10.05 10.05 0 013 12c0-1.657.403-3.22 1.125-4.575" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403-3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-1.657 0-3.22-.403-4.575-1.125m-2.25-1.875A10.05 10.05 0 013 12c0-1.657.403-3.22 1.125-4.575" /></svg>
          )}
        </button>
      </div>
      
      {/* Remember me checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Forgot Password?
        </button>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:drop-shadow-[0_0_8px_#2563EB] transition flex items-center justify-center text-sm sm:text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </span>
        ) : "Log In"}
      </button>
    </form>
  );
}
