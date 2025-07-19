# 🔧 OTP Error Fix Guide

## ❌ **Current Problem:**
- "Error sending OTP. Please try again"
- Email service not configured
- Missing environment variables

## ✅ **Solution Steps:**

## 🎯 **Option 1: Use Render Backend (Recommended)**

### **Your Render Backend is Already Set Up:**
- **URL:** `https://resolveit-online-complaint-management.onrender.com`
- **Status:** ✅ Deployed and running
- **Email Service:** ✅ Configured on Render

### **Check Your App Configuration:**
```javascript
// File: Client/config.ts
export const config = {
  API_URL: 'https://resolveit-online-complaint-management.onrender.com',
};
```

### **Test Render Backend:**
1. **Open browser:** `https://resolveit-online-complaint-management.onrender.com`
2. **Should show:** "Server is running" message
3. **If not working:** Check Render dashboard

## 🔧 **Option 2: Fix Local Server**

### **Step 1: Create Environment File**
Create `.env` file in `Server/` directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/resolveit

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000

# JWT Secret
JWT_SECRET=your-secret-key
```

### **Step 2: Gmail App Password Setup**
1. **Go to:** [Google Account Settings](https://myaccount.google.com/)
2. **Enable:** 2-Factor Authentication
3. **Generate App Password:**
   - Security → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
4. **Use this password** in `EMAIL_PASS`

### **Step 3: Start Local Server**
```bash
cd "D:\Major project\online_complain_management_apk\Server"
npm install
npm start
```

## 🚀 **Option 3: Quick Test Server**

### **Use Simple Test Server:**
```bash
cd "D:\Major project\online_complain_management_apk\Server"
node simple-server.js
```

**This will:**
- ✅ Start server on port 5000
- ✅ Use test email (no real emails sent)
- ✅ Show OTP in console
- ✅ Allow testing without email setup

## 📱 **Test Your APK:**

### **For Render Backend:**
1. **Ensure config.ts** points to Render URL
2. **Build new APK:** `build-apk.bat`
3. **Install and test**

### **For Local Server:**
1. **Start server** (Option 2 or 3)
2. **Update config.ts** to `http://localhost:5000`
3. **Build new APK:** `build-apk.bat`
4. **Install and test**

## 🔍 **Debugging Steps:**

### **1. Check Network Connection:**
```bash
# Test Render backend
curl https://resolveit-online-complaint-management.onrender.com

# Test local server
curl http://localhost:5000
```

### **2. Check Console Logs:**
- **Phone:** Enable developer options
- **Check:** Network requests
- **Look for:** API errors

### **3. Test API Endpoints:**
```bash
# Test OTP send
curl -X POST https://resolveit-online-complaint-management.onrender.com/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","type":"login"}'
```

## 🎯 **Quick Fix Commands:**

### **Option A: Use Render (Recommended)**
```bash
# 1. Verify config.ts has Render URL
# 2. Build APK
cd "D:\Major project\online_complain_management_apk"
.\build-apk.bat
```

### **Option B: Use Local Server**
```bash
# 1. Start server
cd "D:\Major project\online_complain_management_apk\Server"
node simple-server.js

# 2. Update config.ts to localhost
# 3. Build APK
cd "D:\Major project\online_complain_management_apk"
.\build-apk.bat
```

## 📋 **Common Issues:**

### **❌ "Network Error"**
- Check internet connection
- Verify API URL in config.ts
- Test backend URL in browser

### **❌ "Email Service Error"**
- Check Gmail app password
- Verify EMAIL_USER and EMAIL_PASS
- Use test server for quick testing

### **❌ "Backend Not Found"**
- Check if Render service is running
- Verify local server is started
- Check port configuration

## 🎉 **Expected Result:**

### **✅ Success Indicators:**
- OTP sent successfully message
- Email received with 4-digit code
- OTP verification works
- Login/signup completes

### **✅ Test Flow:**
1. Enter email in app
2. Click "Login with OTP"
3. Receive success message
4. Check email for OTP
5. Enter OTP and verify
6. Successfully logged in

---

## 🚀 **Recommended Action:**

**Use Render Backend (Option 1)** - it's already configured and deployed!

1. **Verify config.ts** has Render URL
2. **Build new APK:** `build-apk.bat`
3. **Install and test**

**🎉 Your OTP system should work perfectly!** 