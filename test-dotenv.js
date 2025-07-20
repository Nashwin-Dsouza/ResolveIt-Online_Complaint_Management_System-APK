import dotenv from "dotenv";
import path from "path";

console.log("=== Testing dotenv Configuration ===");

// Get current working directory
const cwd = process.cwd();
console.log("Current working directory:", cwd);

// Check if .env file exists
const envPath = path.join(cwd, '.env');
console.log("Looking for .env at:", envPath);

// Try to load .env file explicitly
const result = dotenv.config({ path: envPath });
console.log("dotenv.config() result:", result);

if (result.error) {
    console.log("❌ Error loading .env:", result.error.message);
} else {
    console.log("✅ .env file loaded successfully");
}

console.log("\n=== Environment Variables ===");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "FOUND" : "MISSING");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "FOUND" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");

if (process.env.MONGO_URI) {
    console.log("MONGO_URI value:", process.env.MONGO_URI.substring(0, 50) + "...");
}
if (process.env.EMAIL_USER) {
    console.log("EMAIL_USER value:", process.env.EMAIL_USER);
}
if (process.env.EMAIL_PASS) {
    console.log("EMAIL_PASS value:", process.env.EMAIL_PASS.substring(0, 10) + "...");
}
if (process.env.JWT_SECRET) {
    console.log("JWT_SECRET value:", process.env.JWT_SECRET.substring(0, 10) + "...");
}

console.log("\n=== Test Complete ==="); 