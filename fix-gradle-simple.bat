@echo off
echo ========================================
echo    Fixing Gradle Build Issues
echo ========================================

cd /d "%~dp0Client"

echo.
echo 🧹 Cleaning Gradle caches...
call android\gradlew.bat clean
if errorlevel 1 (
    echo ❌ Gradle clean failed
    pause
    exit /b 1
)

echo.
echo 🗑️  Removing build directories...
if exist "android\build" rmdir /s /q "android\build"
if exist "android\app\build" rmdir /s /q "android\app\build"
if exist "android\.gradle" rmdir /s /q "android\.gradle"

echo.
echo 🔄 Syncing project with Gradle files...
call android\gradlew.bat --refresh-dependencies
if errorlevel 1 (
    echo ❌ Gradle sync failed
    pause
    exit /b 1
)

echo.
echo ✅ Gradle fix completed!
echo 📱 You can now try building the APK again
echo.
pause 