@echo off
echo ========================================
echo Fixing .env file
echo ========================================

echo.
echo Current .env file contents:
type Server\.env

echo.
echo ========================================
echo Adding missing EMAIL_PASS variable
echo ========================================

:: Add EMAIL_PASS to the .env file
echo EMAIL_PASS=your-gmail-app-password>> Server\.env

echo.
echo ========================================
echo .env file updated!
echo ========================================
echo.
echo Please edit Server\.env and replace:
echo "your-gmail-app-password" with your actual Gmail App Password
echo.
echo To get Gmail App Password:
echo 1. Go to Google Account settings
echo 2. Enable 2-Factor Authentication
echo 3. Go to Security ^> App passwords
echo 4. Generate password for "Mail"
echo 5. Copy the 16-character password
echo.
echo Updated .env file:
type Server\.env
echo.
pause 