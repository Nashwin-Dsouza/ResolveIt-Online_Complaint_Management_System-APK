# 🚀 Quick Start - APK Build

## Prerequisites
- ✅ Node.js & npm installed
- ✅ Android Studio installed
- ✅ Android SDK configured

## 🏃‍♂️ Quick Build (Windows)
1. **Run the build script:**
   ```bash
   build.bat
   ```

## 🏃‍♂️ Quick Build (Mac/Linux)
1. **Make script executable:**
   ```bash
   chmod +x build.sh
   ```
2. **Run the build script:**
   ```bash
   ./build.sh
   ```

## 📱 Manual Build Steps
1. **Set up environment:**
   - Create `Client/.env.local` with: `NEXT_PUBLIC_API_URL=http://localhost:5000`
   - Create `Server/.env` with your MongoDB and email settings

2. **Install dependencies:**
   ```bash
   cd Client && npm install
   cd ../Server && npm install
   ```

3. **Build web app:**
   ```bash
   cd Client && npm run build
   ```

4. **Sync with Capacitor:**
   ```bash
   npm run cap:sync
   ```

5. **Open Android Studio:**
   ```bash
   npm run cap:open:android
   ```

6. **Build APK:**
   - In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Or command line: `cd android && ./gradlew assembleDebug`

## 📍 APK Location
Your APK will be in: `Client/android/app/build/outputs/apk/debug/`

## 🔧 Troubleshooting
- If build fails, try: `npm run cap:sync` again
- Make sure server is running: `cd Server && npm run dev`
- Check environment variables are set correctly

## 📱 Testing
1. Transfer APK to your phone
2. Install and run
3. Make sure your server is accessible from your phone's network 