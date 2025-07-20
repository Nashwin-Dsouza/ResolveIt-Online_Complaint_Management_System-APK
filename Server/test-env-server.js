import dotenv from "dotenv";
dotenv.config();

console.log("=== Environment Test (Server Directory) ===");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "FOUND" : "MISSING");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "FOUND" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");

if (process.env.MONGO_URI) {
    console.log("MongoDB URI starts with:", process.env.MONGO_URI.substring(0, 30) + "...");
} else {
    console.log("ERROR: MONGO_URI is missing!");
}

if (process.env.EMAIL_USER) {
    console.log("Email user:", process.env.EMAIL_USER);
} else {
    console.log("ERROR: EMAIL_USER is missing!");
}

if (process.env.EMAIL_PASS) {
    if (process.env.EMAIL_PASS === "your-gmail-app-password") {
        console.log("WARNING: EMAIL_PASS needs to be configured!");
    } else {
        console.log("Email password: CONFIGURED");
    }
} else {
    console.log("ERROR: EMAIL_PASS is missing!");
}

console.log("=== Test Complete ==="); 