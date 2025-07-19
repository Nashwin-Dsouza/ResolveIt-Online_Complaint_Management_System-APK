@echo off
echo ========================================
echo    Starting Test Server for OTP
echo ========================================
echo.

cd "D:\Major project\online_complain_management_apk\Server"

echo Installing dependencies...
call npm install

echo.
echo Starting test server...
echo.
echo 📧 OTP codes will appear in this console
echo 📱 Use the app to send OTP requests
echo 🌐 Server running on: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

node test-server.js

pause 