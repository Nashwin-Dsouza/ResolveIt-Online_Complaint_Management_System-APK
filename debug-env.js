import fs from 'fs';
import path from 'path';

console.log("=== Debug Environment File ===");

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
console.log("Looking for .env file at:", envPath);

if (fs.existsSync(envPath)) {
    console.log("✅ .env file exists");
    
    // Read raw content
    const content = fs.readFileSync(envPath, 'utf8');
    console.log("File size:", content.length, "characters");
    console.log("First 100 characters:", content.substring(0, 100));
    console.log("Last 100 characters:", content.substring(content.length - 100));
    
    // Check for BOM
    if (content.charCodeAt(0) === 0xFEFF) {
        console.log("⚠️  BOM detected at start of file");
    }
    
    // Split into lines
    const lines = content.split('\n');
    console.log("Number of lines:", lines.length);
    
    console.log("\n=== Line by line analysis ===");
    lines.forEach((line, index) => {
        if (line.trim()) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    });
    
} else {
    console.log("❌ .env file does not exist");
}

console.log("\n=== Environment Variables ===");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "FOUND" : "MISSING");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "FOUND" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");

console.log("\n=== Test Complete ==="); 