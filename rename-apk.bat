@echo off
echo ========================================
echo    APK Rename Tool
echo ========================================
echo.

cd "D:\Major project\online_complain_management_apk\Client\android\app\build\outputs\apk\debug"

echo Current APK files:
dir *.apk

echo.
echo Enter new name for APK (without .apk extension):
set /p new_name=

if exist "app-debug.apk" (
    copy "app-debug.apk" "%new_name%.apk"
    echo.
    echo ✅ APK renamed to: %new_name%.apk
    echo.
    echo Updated file list:
    dir *.apk
) else (
    echo ❌ app-debug.apk not found!
    echo Make sure you've built the APK first.
)

echo.
pause 