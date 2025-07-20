import dotenv from "dotenv";
dotenv.config();

console.log("========================================");
console.log("Environment Variables Test");
console.log("========================================");

console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");

console.log("\n========================================");
console.log("Detailed Values:");
console.log("========================================");

if (process.env.MONGO_URI) {
    console.log("MONGO_URI:", process.env.MONGO_URI.substring(0, 50) + "...");
} else {
    console.log("MONGO_URI: undefined");
}

if (process.env.EMAIL_USER) {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
} else {
    console.log("EMAIL_USER: undefined");
}

if (process.env.EMAIL_PASS) {
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS === "your-gmail-app-password" ? "❌ Not configured" : "✅ Configured");
} else {
    console.log("EMAIL_PASS: undefined");
}

if (process.env.JWT_SECRET) {
    console.log("JWT_SECRET:", process.env.JWT_SECRET.substring(0, 10) + "...");
} else {
    console.log("JWT_SECRET: undefined");
}

console.log("\n========================================");
console.log("Test Complete");
console.log("========================================"); 