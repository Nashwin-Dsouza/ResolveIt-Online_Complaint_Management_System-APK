import dotenv from "dotenv";
import path from "path";

console.log("=== Testing Server Start ===");

// Load .env file
const envPath = path.join(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.log("❌ Error loading .env:", result.error.message);
    process.exit(1);
}

console.log("✅ .env file loaded");

// Test database connection
import connectDB from "./config/db.js";

console.log("Testing database connection...");
try {
    await connectDB();
    console.log("✅ Database connection successful!");
} catch (error) {
    console.log("❌ Database connection failed:", error.message);
}

console.log("=== Test Complete ==="); 