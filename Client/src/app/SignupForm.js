"use client";

import { useState } from "react";
import ValidationUtils from '../utils/validation';
import ApiService from '../services/apiService';

const getEmoji = (strength) => {
  if (strength === 'weak') return '😡';
  if (strength === 'medium') return '😐';
  if (strength === 'strong') return '😃';
  return '';
};

export default function SignupForm() {
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
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordStrength = ValidationUtils.getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg("");
    setErrorMsg("");
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordFocus = () => {
    setPasswordTouched(true);
  };

  const validateField = (name, value) => {
    let validation;
    switch (name) {
      case 'firstName':
        validation = ValidationUtils.validateName(value, 'First Name');
        break;
      case 'lastName':
        validation = ValidationUtils.validateName(value, 'Last Name');
        break;
      case 'email':
        validation = ValidationUtils.validateEmail(value);
        break;
      case 'dob':
        validation = ValidationUtils.validateDateOfBirth(value);
        break;
      case 'password':
        validation = ValidationUtils.validatePassword(value);
        break;
      default:
        return true;
    }
    
    if (!validation.isValid) {
      setFieldErrors(prev => ({ ...prev, [name]: validation.errors[0] }));
      return false;
    } else {
      setFieldErrors(prev => ({ ...prev, [name]: "" }));
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    
    // Validate all fields
    const validations = [
      validateField('firstName', formData.firstName),
      validateField('lastName', formData.lastName),
      validateField('email', formData.email),
      validateField('dob', formData.dob),
      validateField('password', formData.password)
    ];
    
    if (validations.some(v => !v)) {
      return;
    }

    setIsLoading(true);
    try {
      const apiService = new ApiService();
      await apiService.signup(formData);
      
      setSuccessMsg("Account created successfully! Please check your email for verification.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
      });
      setPasswordTouched(false);
      setFieldErrors({});
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message.includes('Email already exists')) {
        setErrorMsg("Email already exists. Please use a different email or try logging in.");
      } else if (error.message.includes('Weak password')) {
        setErrorMsg("Password is too weak. Please use a stronger password.");
      } else if (error.message.includes('Invalid email')) {
        setErrorMsg("Please enter a valid email address.");
      } else {
        setErrorMsg("Signup failed. Please try again.");
      }
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
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base ${
          fieldErrors.firstName ? 'border-red-500' : ''
        }`}
        required
      />
      {fieldErrors.firstName && (
        <div className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</div>
      )}
      <label htmlFor="lastName" className="block mb-1 text-sm sm:text-base">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base ${
          fieldErrors.lastName ? 'border-red-500' : ''
        }`}
        required
      />
      {fieldErrors.lastName && (
        <div className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</div>
      )}
      <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
      <input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base ${
          fieldErrors.email ? 'border-red-500' : ''
        }`}
        required
      />
      {fieldErrors.email && (
        <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>
      )}
      <label htmlFor="dob" className="block mb-1 text-sm sm:text-base">Date of Birth</label>
      <input
        id="dob"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition text-sm sm:text-base ${
          fieldErrors.dob ? 'border-red-500' : ''
        }`}
        required
      />
      {fieldErrors.dob && (
        <div className="text-red-500 text-xs mt-1">{fieldErrors.dob}</div>
      )}
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
          className={`w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-600 transition pr-10 text-sm sm:text-base ${
            fieldErrors.password ? 'border-red-500' : ''
          }`}
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
      {fieldErrors.password && (
        <div className="text-red-500 text-xs mt-1">{fieldErrors.password}</div>
      )}
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
        ) : "Sign Up"}
      </button>
    </form>
  );
}
