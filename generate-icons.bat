@echo off
echo ========================================
echo Generating Android Icons
echo ========================================

:: Check if ImageMagick is installed
magick --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ImageMagick is not installed. Please install it from https://imagemagick.org/
    echo After installation, run this script again.
    pause
    exit /b 1
)

:: Create icons directory if it doesn't exist
if not exist "Client\android\app\src\main\res\mipmap-hdpi" mkdir "Client\android\app\src\main\res\mipmap-hdpi"
if not exist "Client\android\app\src\main\res\mipmap-mdpi" mkdir "Client\android\app\src\main\res\mipmap-mdpi"
if not exist "Client\android\app\src\main\res\mipmap-xhdpi" mkdir "Client\android\app\src\main\res\mipmap-xhdpi"
if not exist "Client\android\app\src\main\res\mipmap-xxhdpi" mkdir "Client\android\app\src\main\res\mipmap-xxhdpi"
if not exist "Client\android\app\src\main\res\mipmap-xxxhdpi" mkdir "Client\android\app\src\main\res\mipmap-xxxhdpi"

echo Converting PNG logo to Android icons...

:: Generate icons for different densities
magick "Client\public\images\resolveit.png" -resize 72x72 "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher.png"
magick "Client\public\images\resolveit.png" -resize 48x48 "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher.png"
magick "Client\public\images\resolveit.png" -resize 96x96 "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher.png"
magick "Client\public\images\resolveit.png" -resize 144x144 "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png"
magick "Client\public\images\resolveit.png" -resize 192x192 "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"

:: Generate round icons
magick "Client\public\images\resolveit.png" -resize 72x72 -background transparent -gravity center -extent 72x72 "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png"
magick "Client\public\images\resolveit.png" -resize 48x48 -background transparent -gravity center -extent 48x48 "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png"
magick "Client\public\images\resolveit.png" -resize 96x96 -background transparent -gravity center -extent 96x96 "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png"
magick "Client\public\images\resolveit.png" -resize 144x144 -background transparent -gravity center -extent 144x144 "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png"
magick "Client\public\images\resolveit.png" -resize 192x192 -background transparent -gravity center -extent 192x192 "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png"

:: Generate foreground icons (for adaptive icons)
magick "Client\public\images\resolveit.png" -resize 108x108 -background transparent -gravity center -extent 108x108 "Client\android\app\src\main\res\mipmap-hdpi\ic_launcher_foreground.png"
magick "Client\public\images\resolveit.png" -resize 72x72 -background transparent -gravity center -extent 72x72 "Client\android\app\src\main\res\mipmap-mdpi\ic_launcher_foreground.png"
magick "Client\public\images\resolveit.png" -resize 144x144 -background transparent -gravity center -extent 144x144 "Client\android\app\src\main\res\mipmap-xhdpi\ic_launcher_foreground.png"
magick "Client\public\images\resolveit.png" -resize 216x216 -background transparent -gravity center -extent 216x216 "Client\android\app\src\main\res\mipmap-xxhdpi\ic_launcher_foreground.png"
magick "Client\public\images\resolveit.png" -resize 288x288 -background transparent -gravity center -extent 288x288 "Client\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png"

echo.
echo ========================================
echo Icons Generated Successfully!
echo ========================================
echo Icons have been created in the Android mipmap directories.
echo You can now build your APK with the new logo.
echo.
pause 