# 📱 APK Naming Guide

## ✅ **Yes, You Can Rename APK Files!**

### **Multiple Ways to Rename:**

## 🚀 **Method 1: Automatic Naming (Recommended)**

### **Use the Enhanced Build Script:**
```bash
# Just double-click:
build-apk.bat
```

**This will automatically create:**
- `ResolveIt_v1.0.0_2024-07-19_15-30-45.apk`
- Format: `AppName_vVersion_Date_Time.apk`

## 🎯 **Method 2: Manual Rename Tool**

### **Use the Rename Script:**
```bash
# Double-click:
rename-apk.bat
```

**Then enter your desired name:**
- `ResolveIt_ComplaintApp.apk`
- `MyApp_v2.apk`
- `ResolveIt_2024.apk`

## 📝 **Method 3: Manual File Rename**

### **Navigate to APK Location:**
```
D:\Major project\online_complain_management_apk\Client\android\app\build\outputs\apk\debug\
```

### **Rename the file:**
- Right-click `app-debug.apk`
- Select "Rename"
- Enter your desired name
- Example: `ResolveIt_ComplaintManager.apk`

## 🎨 **Naming Convention Ideas:**

### **Version-Based:**
- `ResolveIt_v1.0.0.apk`
- `ResolveIt_v1.1.0.apk`
- `ResolveIt_v2.0.0.apk`

### **Date-Based:**
- `ResolveIt_2024-07-19.apk`
- `ResolveIt_July2024.apk`
- `ResolveIt_19Jul2024.apk`

### **Feature-Based:**
- `ResolveIt_ComplaintApp.apk`
- `ResolveIt_Mobile.apk`
- `ResolveIt_Android.apk`

### **Combined:**
- `ResolveIt_v1.0.0_July2024.apk`
- `ResolveIt_ComplaintApp_v1.0.apk`
- `ResolveIt_Mobile_v1.0.0.apk`

## 🔧 **Customize Automatic Naming:**

### **Edit build-apk.bat:**
```batch
:: Change version number
set "version=1.0.0"

:: Change app name
set "new_filename=ResolveIt_v%version%_%datestamp%_%timestamp%.apk"
```

### **Examples:**
```batch
:: Simple version
set "new_filename=ResolveIt_v%version%.apk"

:: With date only
set "new_filename=ResolveIt_%datestamp%.apk"

:: Custom format
set "new_filename=MyComplaintApp_v%version%.apk"
```

## 📋 **Best Practices:**

### **✅ Good Names:**
- `ResolveIt_v1.0.0.apk`
- `ResolveIt_ComplaintApp.apk`
- `ResolveIt_2024-07-19.apk`
- `ResolveIt_Mobile_v1.0.apk`

### **❌ Avoid:**
- `app-debug.apk` (default name)
- `myapp.apk` (too generic)
- `ResolveIt_v1.0.0_2024-07-19_15-30-45.apk` (too long)

## 🎯 **Quick Commands:**

### **Build with Auto-Naming:**
```bash
# Double-click:
build-apk.bat
```

### **Manual Rename:**
```bash
# Double-click:
rename-apk.bat
```

### **Check APK Location:**
```bash
cd "D:\Major project\online_complain_management_apk\Client\android\app\build\outputs\apk\debug"
dir *.apk
```

## 📱 **Installation:**

### **After Renaming:**
1. **Copy renamed APK** to your phone
2. **Enable "Install from Unknown Sources"**
3. **Install the APK**
4. **Test your app**

### **Multiple APKs:**
- You can keep multiple versions
- Each with different names
- Easy to identify and manage

## 🎉 **Benefits of Renaming:**

### **✅ Organization:**
- Easy to identify different versions
- Clear version tracking
- Professional appearance

### **✅ Management:**
- Keep multiple versions
- Easy backup and sharing
- Clear file identification

### **✅ Distribution:**
- Professional file names
- Easy for users to identify
- Better user experience

---

## 🚀 **Quick Start:**

1. **Build APK:** Double-click `build-apk.bat`
2. **Auto-named APK** will be created
3. **Or use:** `rename-apk.bat` for custom names
4. **Install** on your phone

**🎉 Your APK will have a professional, organized name!** 