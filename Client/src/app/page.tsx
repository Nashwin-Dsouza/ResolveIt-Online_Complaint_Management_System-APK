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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send`, {
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
      <div className="relative w-full max-w-6xl h-auto md:h-[40rem] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Animated Blue panel */}
        <motion.div
          key="blue-panel"
          initial={false}
          animate={{ x: isSignup ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '0%' : '100%') : '0%' }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative md:absolute top-0 left-0 w-full md:w-1/2 h-60 md:h-full bg-blue-600 text-white flex flex-col items-center justify-center p-6 md:p-8"
          style={{ zIndex: 10 }}
        >
          <div className="absolute inset-0 transform -skew-x-12 bg-blue-700 hidden md:block"></div>
          <div className="relative z-20 flex flex-col items-center">
            <Image
              src="/images/resolveit.png"
              alt="ResolveIt Logo"
              width={60}
              height={60}
              className="mb-2 md:mb-4 drop-shadow-[0_0_12px_#ffffff]"
            />
            <h1 className="text-2xl md:text-3xl font-bold">ResolveIt</h1>
            {!isSignup ? (
              <>
                <p className="text-center mt-2 text-xs md:text-sm text-blue-100">
                  Manage complaints effortlessly
                </p>
                <button
                  className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition text-sm md:text-base"
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p className="text-center mt-2 text-xs md:text-sm text-blue-100">
                  Welcome! Please sign up to continue.
                </p>
                <button
                  className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition text-sm md:text-base"
                  onClick={() => setIsSignup(false)}
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Forms container */}
        <div className="flex w-full h-full relative flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {!showOtp ? (
              !isSignup ? (
                <motion.div
                  key="login-form"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10 relative"
                  style={{ marginLeft: "auto" }}
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
                  className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10 relative"
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
                className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10 relative"
                style={{ marginLeft: isSignup ? 0 : "auto" }}
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
