# Emulator Fix Guide

## Problem
The emulator opens but gets stuck and the app doesn't launch.

## Quick Fix Steps

### Option 1: Restart Emulator
1. **Close the stuck emulator**
2. **In Android Studio**: Tools → AVD Manager
3. **Click the play button** next to your emulator
4. **Wait for it to fully boot** (can take 2-3 minutes)

### Option 2: Cold Boot Emulator
1. **In Android Studio**: Tools → AVD Manager
2. **Click the dropdown arrow** next to your emulator
3. **Select "Cold Boot Now"**
4. **Wait for complete startup**

### Option 3: Create New Emulator
1. **In Android Studio**: Tools → AVD Manager
2. **Click "Create Virtual Device"**
3. **Choose "Phone" → "Pixel 2"**
4. **Select "API 34" or "API 33"**
5. **Click "Finish"**

## Advanced Fixes

### Fix 1: Increase Emulator Memory
1. **In AVD Manager**: Click the pencil icon next to your emulator
2. **Click "Show Advanced Settings"**
3. **Increase "RAM" to 2048 MB**
4. **Increase "VM Heap" to 256 MB**
5. **Click "Finish"**

### Fix 2: Enable Hardware Acceleration
1. **In AVD Manager**: Click the pencil icon
2. **Under "Emulated Performance"**:
   - Set "Graphics" to "Hardware - GLES 2.0"
   - Enable "Use Host GPU"
3. **Click "Finish"**

### Fix 3: Check System Requirements
- **Windows**: Enable Hyper-V or HAXM
- **At least 8GB RAM** recommended
- **Intel VT-x or AMD-V** enabled in BIOS

## Alternative: Test on Real Device

### Option 1: USB Debugging
1. **Enable Developer Options** on your phone:
   - Settings → About Phone → Tap "Build Number" 7 times
2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. **Connect phone via USB**
4. **In Android Studio**: Run → Select your phone

### Option 2: Install APK Directly
1. **Find the APK file**:
   ```
   Client\android\app\build\outputs\apk\debug\app-debug.apk
   ```
2. **Copy to your phone**
3. **Install manually** (enable "Install from Unknown Sources")

## Command Line Options

### Check Emulator Status
```bash
# List running emulators
adb devices

# Kill stuck emulator
adb kill-server
adb start-server
```

### Install APK Directly
```bash
# Navigate to project
cd Client\android

# Install APK
adb install app\build\outputs\apk\debug\app-debug.apk
```

## Troubleshooting

### Issue: "Emulator not responding"
**Solution**:
1. Close emulator completely
2. Restart Android Studio
3. Try cold boot

### Issue: "App not installing"
**Solution**:
1. Check if emulator is fully booted
2. Try installing via adb
3. Check app permissions

### Issue: "Slow emulator"
**Solution**:
1. Increase RAM allocation
2. Enable hardware acceleration
3. Close other applications

## Quick Test Commands

### Test Emulator Connection
```bash
adb devices
```

### Install and Run App
```bash
cd Client\android
gradlew.bat installDebug
```

### View App Logs
```bash
adb logcat | findstr "resolveit"
```

## Next Steps

1. **Try restarting the emulator first**
2. **If still stuck, try cold boot**
3. **If emulator issues persist, test on real device**
4. **Use the APK file directly if needed**

## Prevention

- **Keep emulator updated**
- **Allocate sufficient resources**
- **Use hardware acceleration**
- **Regularly clean emulator data** 