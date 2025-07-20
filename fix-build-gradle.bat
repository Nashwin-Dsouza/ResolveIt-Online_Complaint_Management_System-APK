@echo off
echo ========================================
echo Fixing build.gradle file
echo ========================================

echo Removing BOM characters from build.gradle...

:: Read the file and write it back without BOM
powershell -Command "Get-Content 'Client\android\app\build.gradle' -Raw | Out-File 'Client\android\app\build.gradle' -Encoding ASCII"

echo.
echo ========================================
echo Build.gradle file fixed!
echo ========================================
echo The file has been cleaned of BOM characters.
echo You can now run your build script.
echo.
pause 