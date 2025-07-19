@echo off
echo ========================================
echo    Updating IP Address for Phone Testing
echo ========================================
echo.

cd "D:\Major project\online_complain_management_apk\Client"

echo Getting your computer's IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP: =%

echo Your IP address is: %IP%
echo.

echo Updating config.ts with your IP address...
powershell -Command "(Get-Content 'config.ts') -replace 'LOCAL_API_URL: .*', 'LOCAL_API_URL: \"http://%IP%:5000\",' | Set-Content 'config.ts'"

echo.
echo ✅ Config updated with IP: %IP%
echo.
echo 📱 Your phone can now connect to:
echo    http://%IP%:5000
echo.
echo 🚀 Next steps:
echo    1. Start test server: start-test-server.bat
echo    2. Build APK: build-apk.bat
echo    3. Install on phone and test
echo.
pause 