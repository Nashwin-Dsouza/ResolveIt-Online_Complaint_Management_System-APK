@echo off
echo ========================================
echo Starting ResolveIt Server
echo ========================================

:: Check if .env file exists
if not exist "Server\.env" (
    echo ERROR: .env file not found!
    echo Please run setup-otp.bat first to create the .env file.
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists
if not exist "Server\node_modules" (
    echo Installing dependencies...
    cd Server
    npm install
    cd ..
)

:: Start the server
echo.
echo Starting server on port 5000...
echo.
cd Server
npm run dev

pause 