"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SignupForm from "./SignupForm.js"; // Make sure path is correct
import LoginForm from "./LoginForm.js";
import OtpInput from "./OtpInput.js";

// Add types for form data
interface LoginFormData {
  email: string;
  password: string;
}
interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  password: string;
}

type AuthFormData = LoginFormData | SignupFormData;

type OtpType = 'login' | 'signup';

export default function SlidingAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpFormData, setOtpFormData] = useState<AuthFormData | null>(null); // store all form data
  const [otpType, setOtpType] = useState<OtpType>("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Handler to trigger OTP input
  const handleRequestOtp = async (formData: AuthFormData, type: OtpType) => {
    setOtpFormData(formData);
    setOtpType(type);
    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, type }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowOtp(true);
      } else {
        console.error("Failed to send OTP:", data.error);
        alert("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error sending OTP. Please try again.");
    }
  };

  // Handler to go back from OTP
  const handleBackFromOtp = () => {
    setShowOtp(false);
    setOtpFormData(null);
    setOtpType('login'); // Use a valid OtpType value
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-6xl h-[40rem] bg-white shadow-xl rounded-2xl overflow-hidden flex">
        {/* Animated Blue panel */}
        <motion.div
          key="blue-panel"
          initial={false}
          animate={{ x: isSignup ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute top-0 left-0 w-1/2 h-full bg-blue-600 text-white flex flex-col items-center justify-center p-8"
          style={{ zIndex: 10 }}
        >
          <div className="absolute inset-0 transform -skew-x-12 bg-blue-700"></div>
          <div className="relative z-20 flex flex-col items-center">
            <Image
              src="/images/resolveit.png"
              alt="ResolveIt Logo"
              width={80}
              height={80}
              className="mb-4 drop-shadow-[0_0_12px_#ffffff]"
            />
            <h1 className="text-3xl font-bold">ResolveIt</h1>
            {!isSignup ? (
              <>
                <p className="text-center mt-2 text-sm text-blue-100">
                  Manage complaints effortlessly
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p className="text-center mt-2 text-sm text-blue-100">
                  Welcome! Please sign up to continue.
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
                  onClick={() => setIsSignup(false)}
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Forms container */}
        <div className="flex w-full h-full relative">
          <AnimatePresence mode="wait" initial={false}>
            {!showOtp ? (
              !isSignup ? (
                <motion.div
                  key="login-form"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-1/2 flex items-center justify-center p-10 relative"
                  style={{ marginLeft: "50%" }}
                >
                  <LoginForm onRequestOtp={handleRequestOtp} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup-form"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-1/2 flex items-center justify-center p-10 relative"
                  style={{ marginLeft: 0 }}
                >
                  <SignupForm onRequestOtp={handleRequestOtp} />
                </motion.div>
              )
            ) : (
              <motion.div
                key="otp-form"
                initial={{ y: 100, x: 0, opacity: 0 }}
                animate={{
                  y: -100,
                  x: 0,
                  opacity: 1
                }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 60, damping: 18 }}
                className="w-1/2 flex items-center justify-center p-10 relative"
                style={{ marginLeft: isSignup ? 0 : "50%" }}
              >
                <OtpInput 
                  onBack={handleBackFromOtp} 
                  formData={otpFormData}
                  type={otpType}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
