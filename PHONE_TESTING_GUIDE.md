# 📱 Phone Testing Guide - OTP Fix

## ❌ **Problem:**
- Testing on phone but getting "Error sending OTP"
- Phone can't connect to `localhost:5000`
- Need to use computer's IP address

## ✅ **Solution: Use Computer's IP Address**

### **Step 1: Update IP Address**
```bash
# Double-click this file:
update-ip.bat
```

**This will:**
- ✅ Detect your computer's IP address
- ✅ Update config.ts automatically
- ✅ Show you the network URL

### **Step 2: Start Test Server**
```bash
# Double-click this file:
start-test-server.bat
```

**You'll see:**
```
🚀 Test Server running on:
   Local: http://localhost:5000
   Network: http://192.168.1.XXX:5000
📱 Use Network URL for phone testing
```

### **Step 3: Build New APK**
```bash
# Double-click this file:
build-apk.bat
```

### **Step 4: Test on Phone**
1. **Install APK** on phone
2. **Enter email** in app
3. **Click "Login with OTP"**
4. **Check computer console** for OTP code
5. **Enter OTP** in phone app
6. **Success!** ✅

## 🔧 **How It Works:**

### **Network Setup:**
- **Computer:** Runs server on all network interfaces
- **Phone:** Connects via computer's IP address
- **Same WiFi:** Both devices on same network

### **IP Address Detection:**
- Automatically finds your computer's IP
- Updates config.ts with correct URL
- Shows both local and network URLs

## 📋 **Prerequisites:**

### **✅ Requirements:**
- **Same WiFi network** (computer and phone)
- **Windows Firewall** allows port 5000
- **Test server running** on computer

### **✅ Network Check:**
1. **Computer and phone** on same WiFi
2. **No firewall blocking** port 5000
3. **Server accessible** from phone

## 🎯 **Quick Commands:**

### **1. Update IP:**
```bash
# Double-click:
update-ip.bat
```

### **2. Start Server:**
```bash
# Double-click:
start-test-server.bat
```

### **3. Build APK:**
```bash
# Double-click:
build-apk.bat
```

## 🔍 **Troubleshooting:**

### **❌ "Connection Refused"**
- **Check:** Computer and phone on same WiFi
- **Check:** Windows Firewall allows port 5000
- **Check:** Server is running

### **❌ "Network Error"**
- **Try:** Different WiFi network
- **Try:** Mobile hotspot from computer
- **Try:** USB tethering

### **❌ "Server Not Found"**
- **Check:** IP address is correct
- **Check:** Server is running
- **Check:** Port 5000 is open

## 🚀 **Alternative Solutions:**

### **Option 1: Mobile Hotspot**
1. **Create hotspot** from computer
2. **Connect phone** to computer's hotspot
3. **Use localhost** in config (same device)

### **Option 2: USB Debugging**
1. **Enable USB debugging** on phone
2. **Connect via USB**
3. **Use ADB port forwarding**

### **Option 3: Public IP (Advanced)**
1. **Port forward** on router
2. **Use public IP** address
3. **Configure firewall** rules

## 📱 **Testing Flow:**

### **Expected Console Output:**
```
📧 OTP SENT:
Email: test@example.com
Type: login
OTP: 1234
Expires: 7/19/2025, 3:45:00 PM
```

### **Expected Phone Behavior:**
- ✅ "OTP sent successfully" message
- ✅ OTP input screen appears
- ✅ Verification works
- ✅ Login completes

## 🎉 **Success Indicators:**

### **✅ Server Running:**
- Console shows "Test Server running"
- Network URL displayed
- No error messages

### **✅ Phone Connected:**
- App shows "OTP sent successfully"
- No network errors
- OTP codes appear in console

### **✅ OTP Working:**
- 4-digit code in console
- Verification successful
- Login completes

---

## 🚀 **Immediate Action:**

1. **Update IP:** `update-ip.bat`
2. **Start Server:** `start-test-server.bat`
3. **Build APK:** `build-apk.bat`
4. **Test on Phone**

**This will fix the phone connectivity issue!** 