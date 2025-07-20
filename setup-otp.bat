@echo off
echo ========================================
echo OTP System Setup
echo ========================================

echo.
echo Please follow these steps to set up OTP:
echo.
echo 1. Create a .env file in the Server directory
echo 2. Add your Gmail credentials
echo 3. Enable Gmail App Password
echo.
echo Press any key to continue...
pause

echo.
echo Creating .env template...
(
echo # Database Configuration
echo MONGO_URI=mongodb://localhost:27017/resolveit
echo.
echo # Email Configuration ^(Gmail^)
echo EMAIL_USER=your-email@gmail.com
echo EMAIL_PASS=your-app-password
echo.
echo # Server Configuration
echo PORT=5000
echo.
echo # JWT Secret ^(for future use^)
echo JWT_SECRET=your-jwt-secret-key
) > Server\.env

echo.
echo ========================================
echo .env file created!
echo ========================================
echo.
echo Please edit Server\.env and add your:
echo - Gmail address in EMAIL_USER
echo - Gmail App Password in EMAIL_PASS
echo.
echo To get Gmail App Password:
echo 1. Go to Google Account settings
echo 2. Enable 2-Factor Authentication
echo 3. Go to Security ^> App passwords
echo 4. Generate password for "Mail"
echo.
pause 