# 🚀 Render Backend Setup Guide

## ✅ **Great! You already have your backend on Render**

Now let's connect your app to use the Render backend instead of local server.

## 🔧 **Step 1: Update Your Render URL**

### **Open this file:** `Client/config.ts`

### **Replace the URL with your actual Render backend URL:**

```typescript
export const config = {
  // Replace this with your actual Render backend URL
  API_URL: 'https://your-actual-render-url.onrender.com',
};
```

### **Examples:**
- `https://resolveit-backend.onrender.com`
- `https://my-complaint-api.onrender.com`
- `https://your-app-name.onrender.com`

## 🔄 **Step 2: Rebuild Your App**

### **Option 1: Use the build script**
```bash
# Windows
build.bat

# Mac/Linux
./build.sh
```

### **Option 2: Manual build**
```bash
cd Client
npm run build
npx cap sync android
npx cap build android
```

## 🎯 **Step 3: Test Your App**

1. **Install the new APK** on your phone
2. **Try signup/login** - OTP should work
3. **No need to run local server** anymore!

## ✅ **Benefits of Using Render:**

- ✅ **24/7 availability** - No PC required
- ✅ **Professional hosting** - Reliable and fast
- ✅ **Real email OTP** - Works with actual email
- ✅ **Database persistence** - Data saved permanently
- ✅ **Share with others** - Anyone can use your app

## 🔍 **How to Find Your Render URL:**

1. **Go to Render Dashboard**
2. **Click on your service**
3. **Copy the URL** from the service overview
4. **It looks like:** `https://your-app-name.onrender.com`

## 🚨 **Important Notes:**

### **Make sure your Render backend has:**
- ✅ **CORS enabled** for mobile apps
- ✅ **Email service configured** for OTP
- ✅ **Database connected** for user data
- ✅ **All API endpoints working**

### **If OTP doesn't work:**
1. Check your Render service is running
2. Verify the URL in `config.ts`
3. Check Render logs for errors
4. Make sure email service is configured

## 🎉 **You're All Set!**

Once you update the URL and rebuild, your app will work 24/7 without needing your PC running!

**No more local server needed!** 🚀 