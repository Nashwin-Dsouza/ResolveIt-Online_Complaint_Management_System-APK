@echo off
echo ========================================
echo    Fixing Emulator Issues
echo ========================================

echo.
echo 🔍 Checking connected devices...
adb devices

echo.
echo 📱 Installing app on connected device...
cd /d "%~dp0Client\android"
adb install app\build\outputs\apk\debug\app-debug.apk

echo.
echo 🚀 Launching app...
adb shell am start -n com.resolveit.app/.MainActivity

echo.
echo ✅ App should now be running!
echo 📱 Check your emulator/device for the ResolveIt app
echo.
pause 