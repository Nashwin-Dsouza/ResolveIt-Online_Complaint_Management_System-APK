@echo off
echo 🚀 Starting APK Build Process...

REM Check if we're in the right directory
if not exist "Client" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "Server" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Step 1: Install dependencies
echo 📦 Installing Client dependencies...
cd Client
call npm install

echo 📦 Installing Server dependencies...
cd ..\Server
call npm install

REM Step 2: Build the web app
echo 🔨 Building web application...
cd ..\Client
call npm run build

REM Step 3: Sync with Capacitor
echo 📱 Syncing with Capacitor...
call npm run cap:sync

echo ✅ Build process completed!
echo.
echo 📋 Next steps:
echo 1. Run: npm run cap:open:android
echo 2. In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
echo 3. Find your APK in: android/app/build/outputs/apk/debug/
echo.
echo 🔧 Or build from command line:
echo cd android ^&^& gradlew assembleDebug
pause 