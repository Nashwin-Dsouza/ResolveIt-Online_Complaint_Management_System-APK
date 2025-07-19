@echo off
echo ========================================
echo    Fixing SDK Version Mismatch
echo ========================================

echo.
echo 🔧 This script will help fix SDK version issues
echo.

echo 📱 Checking Android SDK location...
if exist "%LOCALAPPDATA%\Android\Sdk" (
    echo ✅ Android SDK found at: %LOCALAPPDATA%\Android\Sdk
    set ANDROID_SDK=%LOCALAPPDATA%\Android\Sdk
) else if exist "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" (
    echo ✅ Android SDK found at: C:\Users\%USERNAME%\AppData\Local\Android\Sdk
    set ANDROID_SDK=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
) else (
    echo ❌ Android SDK not found in common locations
    echo Please install Android SDK or update local.properties
    pause
    exit /b 1
)

echo.
echo 🔄 Updating SDK tools...
echo This may take a few minutes...

cd /d "%ANDROID_SDK%\tools\bin"
if exist "sdkmanager.bat" (
    echo 📦 Updating SDK tools...
    call sdkmanager.bat --update
    if errorlevel 1 (
        echo ⚠️  SDK update failed, trying alternative method...
        cd /d "%ANDROID_SDK%\cmdline-tools\latest\bin"
        if exist "sdkmanager.bat" (
            call sdkmanager.bat --update
        )
    )
) else (
    echo 📦 Trying cmdline-tools...
    cd /d "%ANDROID_SDK%\cmdline-tools\latest\bin"
    if exist "sdkmanager.bat" (
        call sdkmanager.bat --update
    ) else (
        echo ❌ sdkmanager not found
        echo Please install Android SDK Command-line Tools
    )
)

echo.
echo 🧹 Cleaning Gradle caches...
cd /d "%~dp0Client\android"
call gradlew.bat clean

echo.
echo ✅ SDK fix completed!
echo 📱 Try building the APK again
echo.
pause 