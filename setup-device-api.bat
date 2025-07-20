@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Device API Setup Script
echo ========================================
echo.

:: Store the original directory
set "ORIGINAL_DIR=%CD%"

:: Check if we're in the correct directory
if not exist "Server" (
    echo ❌ Error: Server directory not found!
    echo Please run this script from the project root directory.
    echo Current directory: %CD%
    pause
    exit /b 1
)

if not exist "Client" (
    echo ❌ Error: Client directory not found!
    echo Please run this script from the project root directory.
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo 📁 Current directory: %CD%
echo.

:: Install server dependencies
echo 🔧 Installing server dependencies...
cd /d "%CD%\Server"
if not exist "package.json" (
    echo ❌ Error: package.json not found in Server directory!
    cd /d "%ORIGINAL_DIR%"
    pause
    exit /b 1
)

echo Running: npm install uuid
call npm install uuid
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to install server dependencies!
    cd /d "%ORIGINAL_DIR%"
    pause
    exit /b 1
)
echo ✅ Server dependencies installed successfully
echo.

:: Install client dependencies
echo 🔧 Installing client dependencies...
cd /d "%ORIGINAL_DIR%\Client"
if not exist "package.json" (
    echo ❌ Error: package.json not found in Client directory!
    cd /d "%ORIGINAL_DIR%"
    pause
    exit /b 1
)

echo Running: npm install @capacitor/core
call npm install @capacitor/core
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to install client dependencies!
    cd /d "%ORIGINAL_DIR%"
    pause
    exit /b 1
)
echo ✅ Client dependencies installed successfully
echo.

:: Return to original directory
cd /d "%ORIGINAL_DIR%"

echo ========================================
echo    Setup Complete! 🎉
echo ========================================
echo.
echo ✅ All dependencies installed successfully
echo.
echo 📋 Next steps:
echo 1. Start the server: cd Server ^&^& npm run dev
echo 2. Start the client: cd Client ^&^& npm run dev
echo 3. Visit /devices to view device management
echo 4. Check /network-test for network diagnostics
echo.
echo 📱 The device API will automatically:
echo    - Register devices when the app opens
echo    - Track device information and statistics
echo    - Update device heartbeat every 5 minutes
echo    - Store device data in MongoDB
echo.
echo 🔍 To test the API:
echo    - Open the app in a browser or mobile device
echo    - Check the browser console for device registration logs
echo    - Visit /devices page to see device information
echo.
echo Press any key to exit...
pause >nul 