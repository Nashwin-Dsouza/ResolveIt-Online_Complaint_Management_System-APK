"use client";

import { useState } from "react";
import ValidationUtils from '../utils/validation';
import SecureStorage from '../utils/secureStorage';

const getEmoji = (strength) => {
  if (strength === 'weak') return '😡';
  if (strength === 'medium') return '😐';
  if (strength === 'strong') return '😃';
  return '';
};

export default function SignupForm({ onRequestOtp }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [remember, setRemember] = useState(false);

  const passwordStrength = ValidationUtils.getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg("");
    if (name !== 'password') setErrorMsg("");
    // Don't clear errorMsg for password typing, only after submit
  };

  const handlePasswordFocus = () => {
    setPasswordTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setShowPasswordError(false);
const firstNameValidation = ValidationUtils.validateName(formData.firstName, 'First Name');
    const lastNameValidation = ValidationUtils.validateName(formData.lastName, 'Last Name');
    const emailValidation = ValidationUtils.validateEmail(formData.email);
    const dobValidation = ValidationUtils.validateDateOfBirth(formData.dob);
    const passwordValidation = ValidationUtils.validatePassword(formData.password);

    if (!firstNameValidation.isValid) {
      setErrorMsg(firstNameValidation.errors.join(', '));
      return;
    }

    if (!lastNameValidation.isValid) {
      setErrorMsg(lastNameValidation.errors.join(', '));
      return;
    }

    if (!emailValidation.isValid) {
      setErrorMsg(emailValidation.errors.join(', '));
      return;
    }

    if (!dobValidation.isValid) {
      setErrorMsg(dobValidation.errors.join(', '));
      return;
    }

    if (!passwordValidation.isValid) {
      setErrorMsg(passwordValidation.errors.join(', '));
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
if (remember) {
        await SecureStorage.setRememberLogin(true);
      }
      await onRequestOtp(formData, 'signup');
      setSuccessMsg("Signup request sent! Please check your email for OTP.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
      });
      setPasswordTouched(false);
    } catch {
      setErrorMsg("Signup failed. Please try again.");
    }
    setIsLoading(false);
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
      <label htmlFor="firstName" className="block mb-1 text-sm sm:text-base">First Name</label>
      <input
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
        required
      />
      <label htmlFor="lastName" className="block mb-1 text-sm sm:text-base">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
        required
      />
      <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
      <input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
        required
      />
      <label htmlFor="dob" className="block mb-1 text-sm sm:text-base">Date of Birth</label>
      <input
        id="dob"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base"
        required
      />
      <label htmlFor="password" className="block mb-1 text-sm sm:text-base">Password</label>
      {passwordTouched && (
        <div className="mb-1 text-xs text-gray-600">
          Password must be at least 6 characters, contain letters and numbers for medium (😐), and at least 8 characters with a special character for strong (😃).
        </div>
      )}
      <div className="relative flex items-center">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handlePasswordFocus}
          placeholder="Password"
          className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition pr-10 text-sm sm:text-base"
          required
        />
        {passwordTouched && (
          <span
            className={`absolute right-10 top-1/2 transform -translate-y-1/2 text-xl select-none ${
              passwordStrength === 'weak' ? 'text-red-500' :
              passwordStrength === 'medium' ? 'text-yellow-500' :
              'text-green-500'
            }`}
          >
            {getEmoji(passwordStrength)}
          </span>
        )}
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
      {showPasswordError && (
        <div className="flex items-center text-red-600 font-semibold text-sm mt-1">
          <span className="mr-2">❌</span> Password is too weak. Please use a stronger password.
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:drop-shadow-[0_0_8px_#2563EB] transition flex items-center justify-center text-sm sm:text-base"
        disabled={isLoading || passwordStrength === 'weak'}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </span>
        ) : "Sign Up"}
      </button>
    </form>
  );
}
