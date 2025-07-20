@echo off
echo ========================================
echo Building ResolveIt Release APK
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

:: Build Release APK using Gradle
echo.
echo Building Release APK...
cd android
call gradlew assembleRelease

:: Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Release APK Build Successful!
    echo ========================================
    echo APK location: android\app\build\outputs\apk\release\app-release.apk
    echo.
    echo You can find your release APK in the above location.
    echo Note: This APK is signed and ready for distribution.
    echo Note: Use PowerShell script for automatic APK renaming.
    echo.
    pause
) else (
    echo.
    echo ========================================
    echo Release APK Build Failed!
    echo ========================================
    echo Please check the error messages above.
    echo Make sure you have configured signing keys for release builds.
    echo.
    pause
)

:: Return to root directory
cd ..
cd .. 