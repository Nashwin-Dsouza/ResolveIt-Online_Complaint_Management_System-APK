@echo off
echo ========================================
echo Copying ResolveIt Logo to Android
echo ========================================

:: Check if logo exists
if not exist "Client\public\images\resolveit.png" (
    echo ERROR: Logo file not found at Client\public\images\resolveit.png
    echo Please make sure your logo is in the correct location.
    pause
    exit /b 1
)

echo Found logo: Client\public\images\resolveit.png

:: Create directories if they don't exist
if not exist "Client\android\app\src\main\res\mipmap-hdpi" mkdir "Client\android\app\src\main\res\mipmap-hdpi"
if not exist "Client\android\app\src\main\res\mipmap-mdpi" mkdir "Client\android\app\src\main\res\mipmap-mdpi"
if not exist "Client\android\app\src\main\res\mipmap-xhdpi" mkdir "Client\android\app\src\main\res\mipmap-xhdpi"
if not exist "Client\android\app\src\main\res\mipmap-xxhdpi" mkdir "Client\android\app\src\main\res\mipmap-xxhdpi"
if not exist "Client\android\app\src\main\res\mipmap-xxxhdpi" mkdir "Client\android\app\src\main\res\mipmap-xxxhdpi"

echo.
echo Copying logo to Android directories...

:: Copy logo to all mipmap directories
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"

:: Copy as round icons too
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png"

:: Copy as foreground icons
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher_foreground.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher_foreground.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher_foreground.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_foreground.png"
copy "Client\public\images\resolveit.png" "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png"

echo.
echo ========================================
echo Logo Copy Complete!
echo ========================================
echo Your resolveit.png logo has been copied to all Android icon directories.
echo.
echo Note: This copies the original size. For best results, your logo should be:
echo - Square (1:1 aspect ratio)
echo - At least 192x192 pixels
echo - PNG format with transparency
echo.
echo You can now build your APK with: build-apk.bat
echo.
pause 