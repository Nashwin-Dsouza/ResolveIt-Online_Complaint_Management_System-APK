import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import cors from "cors";
import { verifyEmailConfig } from "./services/emailService.js";

import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

const app = express();

// Connect to DB
connectDB();

// Verify email configuration
verifyEmailConfig();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://resolve-it-online-complaint-git-ac3b91-nashwin-dsouzas-projects.vercel.app',
    'https://resolve-it-online-complaint-managem.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes (example)
app.get("/", (req, res) => res.send("API is running"));

// Use auth routes
app.use('/api/auth', authRoutes);

// Use OTP routes
app.use('/api/otp', otpRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
