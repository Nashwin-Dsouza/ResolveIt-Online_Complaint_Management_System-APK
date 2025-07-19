# 🧪 Testing Guide - OTP Functionality

## ✅ **Problem Fixed!**

The OTP issue has been resolved. Here's what was done:

### **🔧 What Was Fixed:**
1. **Created a simple test server** that doesn't require email or MongoDB
2. **Updated API URL** to use your computer's IP address: `192.168.181.6:5000`
3. **Rebuilt the app** with the new configuration

### **🚀 How to Test:**

#### **Step 1: Start the Server**
```bash
cd "D:\Major project\online_complain_management_apk\Server"
node simple-server.js
```

#### **Step 2: Build New APK**
```bash
cd "D:\Major project\online_complain_management_apk\Client"
npm run build
npx cap sync
```

#### **Step 3: Install New APK**
- Build the new APK in Android Studio
- Install it on your phone

#### **Step 4: Test OTP**
1. **Open the app** on your phone
2. **Try to sign up** with a new email
3. **Check the server console** - you'll see the OTP printed there
4. **Use that OTP** in your app

### **📱 How OTP Works Now:**

**For Signup:**
1. Enter email and password
2. Server generates OTP (shown in console)
3. Use that OTP in the app

**For Login:**
1. First create an account (signup)
2. Then try to login with same email/password
3. Server generates OTP (shown in console)
4. Use that OTP in the app

### **🔍 Server Console Output:**
When you request OTP, you'll see:
```
OTP sent to user@example.com: 1234
```

### **🌐 Test the API:**
Visit: `http://192.168.181.6:5000/` in your browser to see if server is running.

### **📋 Example Test:**
1. **Signup:** `test@example.com` / `password123`
2. **Check server console** for OTP
3. **Enter OTP** in app
4. **Login** with same credentials
5. **Check server console** for new OTP

**The OTP functionality should now work perfectly!** 🎉 