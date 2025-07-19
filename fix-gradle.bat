@echo off
echo ========================================
echo    Fixing Gradle Build Issues
echo ========================================

cd /d "%~dp0Client\android"

echo.
echo 🧹 Cleaning Gradle caches...
call gradlew.bat clean
if errorlevel 1 (
    echo ❌ Gradle clean failed
    pause
    exit /b 1
)

echo.
echo 🗑️  Removing build directories...
if exist "build" rmdir /s /q "build"
if exist "app\build" rmdir /s /q "app\build"
if exist ".gradle" rmdir /s /q ".gradle"

echo.
echo 🔄 Syncing project with Gradle files...
call gradlew.bat --refresh-dependencies
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