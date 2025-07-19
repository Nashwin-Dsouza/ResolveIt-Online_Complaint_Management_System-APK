# OTP Testing Guide

## Problem
OTP is not sending when testing the app on phone.

## Solution Applied

### 1. Updated Config to Use Local Test Server
Changed `USE_LOCAL_SERVER: true` in `config.ts` to use local test server for OTP.

## Step-by-Step Testing Process

### Step 1: Start the Test Server
```bash
# Run this from your project folder
.\start-test-server.bat
```

**Expected Output:**
```
🚀 Test Server running on:
   Local: http://localhost:5000
   Network: http://192.168.56.1:5000
📧 OTP testing enabled - check console for codes
```

### Step 2: Update IP Address (If Needed)
If your IP is different, run:
```bash
.\update-ip.bat
```

### Step 3: Build and Install APK
```bash
# Build the APK
.\build-apk.bat

# Or install directly
.\fix-emulator.bat
```

### Step 4: Test OTP on Phone
1. **Open the ResolveIt app** on your phone
2. **Try to login/signup** with your email
3. **Check the test server console** for OTP codes
4. **Use the OTP code** shown in the console

## Troubleshooting OTP Issues

### Issue 1: "Network Error"
**Solution:**
1. Make sure test server is running
2. Check if phone and computer are on same WiFi
3. Try updating IP address with `.\update-ip.bat`

### Issue 2: "OTP not received"
**Solution:**
1. Check test server console for OTP codes
2. OTP codes appear in the console, not email
3. Use the code from console to login

### Issue 3: "Cannot connect to server"
**Solution:**
1. Check firewall settings
2. Make sure port 5000 is not blocked
3. Try different port in test server

## Testing Checklist

### ✅ Server Setup
- [ ] Test server is running
- [ ] IP address is correct
- [ ] Port 5000 is accessible

### ✅ App Configuration
- [ ] `USE_LOCAL_SERVER: true` in config.ts
- [ ] App is rebuilt with new config
- [ ] APK is installed on phone

### ✅ Network Setup
- [ ] Phone and computer on same WiFi
- [ ] No firewall blocking connection
- [ ] IP address is reachable

### ✅ OTP Testing
- [ ] Enter email in app
- [ ] Check server console for OTP
- [ ] Use OTP code to login
- [ ] App should login successfully

## Quick Test Commands

### Check Server Status
```bash
# Check if server is running
curl http://localhost:5000/health

# Check network access
curl http://192.168.56.1:5000/health
```

### View Server Logs
```bash
# Check OTP requests
netstat -an | findstr :5000
```

### Test API Directly
```bash
# Test OTP endpoint
curl -X POST http://192.168.56.1:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\"}"
```

## Alternative Testing Methods

### Method 1: Use Emulator
1. **Start emulator** in Android Studio
2. **Use localhost** instead of IP
3. **Test OTP** in emulator

### Method 2: Use Different Backend
1. **Set `USE_LOCAL_SERVER: false`** in config.ts
2. **Use Render backend** (if working)
3. **Test OTP** with real email

### Method 3: Manual OTP
1. **Check server console** for OTP codes
2. **Manually enter** OTP in app
3. **Bypass email** delivery issues

## Expected Results

### Successful OTP Test
1. **Enter email** in app
2. **See OTP code** in server console
3. **Enter OTP** in app
4. **Login successful**

### Server Console Output
```
📧 OTP sent to: user@example.com
🔢 OTP Code: 123456
⏰ Time: 2025-07-19 16:30:45
```

## Next Steps

1. **Start test server**
2. **Build and install app**
3. **Test OTP functionality**
4. **Check console for codes**
5. **Verify login works**

## Common Issues and Solutions

### Issue: "Server not found"
- Check if test server is running
- Verify IP address is correct
- Try restarting server

### Issue: "OTP expired"
- Generate new OTP
- Check server time settings
- Use OTP within 5 minutes

### Issue: "Invalid OTP"
- Check console for correct code
- Make sure no extra spaces
- Try regenerating OTP 