@echo off
echo ========================================
echo Building ResolveIt APK
echo ========================================

:: Read current version
set /p CURRENT_VERSION=<version.txt
echo Current version: %CURRENT_VERSION%

:: Increment version (patch version)
for /f "tokens=1,2,3 delims=." %%a in ("%CURRENT_VERSION%") do (
    set MAJOR=%%a
    set MINOR=%%b
    set PATCH=%%c
)

:: Increment patch version
set /a NEW_PATCH=%PATCH%+1
set NEW_VERSION=%MAJOR%.%MINOR%.%NEW_PATCH%
echo New version: %NEW_VERSION%

:: Update version file
echo %NEW_VERSION%> version.txt

:: Update build.gradle with new version
echo.
echo Updating build.gradle with version %NEW_VERSION%...
echo Note: Version will be updated in the next build. Current version: %NEW_VERSION%

:: Change to Client directory
cd Client

:: Install dependencies if needed
echo.
echo Installing dependencies...
call npm install

:: Build the Next.js project
echo.
echo Building Next.js project...
call npm run build

:: Sync with Capacitor
echo.
echo Syncing with Capacitor...
call npx cap sync android

:: Build APK using Gradle
echo.
echo Building APK...
cd android
call gradlew assembleDebug

:: Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo APK Build Successful!
    echo ========================================
    echo APK location: android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo You can find your APK in the above location.
    echo Note: Use PowerShell script for automatic APK renaming.
    echo.
    pause
) else (
    echo.
    echo ========================================
    echo APK Build Failed!
    echo ========================================
    echo Please check the error messages above.
    echo.
    pause
)

:: Return to root directory
cd ..
cd .. 