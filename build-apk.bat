@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Building ResolveIt APK
echo ========================================
echo.

cd "D:\Major project\online_complain_management_apk\Client"

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Building Next.js app...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build Next.js app
    pause
    exit /b 1
)

echo.
echo [3/5] Syncing with Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ❌ Failed to sync with Android
    pause
    exit /b 1
)

echo.
echo [4/5] Building APK...
cd android
call .\gradlew assembleDebug
if %errorlevel% neq 0 (
    echo ❌ Failed to build APK
    pause
    exit /b 1
)

echo.
echo [5/5] Renaming APK file...

:: Get current date and time
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=!dt:~2,2!" & set "YYYY=!dt:~0,4!" & set "MM=!dt:~4,2!" & set "DD=!dt:~6,2!"
set "HH=!dt:~8,2!" & set "Min=!dt:~10,2!" & set "Sec=!dt:~12,2!"
set "datestamp=!YYYY!-!MM!-!DD!"
set "timestamp=!HH!-!Min!-!Sec!"

:: Get version from package.json (you can modify this)
set "version=1.0.0"

:: Create new filename
set "new_filename=ResolveIt_v!version!_!datestamp!_!timestamp!.apk"

:: Rename the APK file
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    copy "app\build\outputs\apk\debug\app-debug.apk" "app\build\outputs\apk\debug\!new_filename!"
    echo ✅ APK renamed to: !new_filename!
) else (
    echo ❌ APK file not found
    pause
    exit /b 1
)

echo.
echo ========================================
echo    ✅ APK Build Successful!
echo ========================================
echo.
echo 📱 APK Files:
echo    Original: android\app\build\outputs\apk\debug\app-debug.apk
echo    Renamed:  android\app\build\outputs\apk\debug\!new_filename!
echo.
echo 📋 Next Steps:
echo    1. Copy APK to your phone
echo    2. Enable "Install from Unknown Sources"
echo    3. Install and test the app
echo.
echo 💡 Tip: You can manually rename the APK to any name you want!
echo.
pause 