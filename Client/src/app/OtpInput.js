"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpInput({ onBack, formData, type }) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setErrorMsg("");
      setSuccessMsg("");
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setErrorMsg("Please enter a 4-digit OTP");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otpString,
          type
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("OTP verified successfully!");
        // After OTP is verified, complete login or signup
        if (type === 'login') {
          // Complete login
          const loginRes = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            setSuccessMsg("Login successful! Redirecting...");
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          } else {
            setErrorMsg(loginData.error || "Login failed");
          }
        } else {
          // Complete signup
          const signupRes = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const signupData = await signupRes.json();
          if (signupRes.ok) {
            setSuccessMsg("Signup successful! Please login.");
            setTimeout(() => {
              onBack(); // Go back to login/signup form
            }, 1500);
          } else {
            setErrorMsg(signupData.error || "Signup failed");
          }
        }
      } else {
        setErrorMsg(data.error || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/otp/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          type
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("OTP resent successfully!");
        setOtp(["", "", "", ""]);
      } else {
        setErrorMsg(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
        <p className="text-gray-600 text-sm">
          We have sent a 4-digit code to your email
        </p>
        {formData && formData.email && (
          <p className="text-blue-600 text-sm font-medium mt-1">{formData.email}</p>
        )}
      </div>
      {errorMsg && (
        <div className="text-red-600 font-semibold text-center">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="text-green-600 font-semibold text-center">{successMsg}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg font-semibold"
              maxLength={1}
              required
              disabled={isLoading}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:drop-shadow-[0_0_8px_#2563EB] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="w-full text-blue-600 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Resend OTP"}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full text-gray-600 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
      </form>
    </div>
  );
} 