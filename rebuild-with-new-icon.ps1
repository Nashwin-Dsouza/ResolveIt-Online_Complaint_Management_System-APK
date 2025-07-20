# PowerShell script to rebuild APK with new app icon
Write-Host "========================================" -ForegroundColor Green
Write-Host "Rebuilding ResolveIt APK with New Icon" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Read current version
$currentVersion = Get-Content "version.txt" -Raw
$currentVersion = $currentVersion.Trim()
Write-Host "Current version: $currentVersion"

# Increment version (patch version)
$versionParts = $currentVersion.Split('.')
$major = $versionParts[0]
$minor = $versionParts[1]
$patch = [int]$versionParts[2]
$newPatch = $patch + 1
$newVersion = "$major.$minor.$newPatch"
Write-Host "New version: $newVersion"

# Update version file
$newVersion | Out-File "version.txt" -Encoding UTF8

# Update build.gradle with new version
Write-Host ""
Write-Host "Updating build.gradle with version $newVersion..."
$buildGradlePath = "Client\android\app\build.gradle"
$content = Get-Content $buildGradlePath -Raw
$updatedContent = $content -replace 'versionName "[^"]*"', "versionName `"$newVersion`""
$updatedContent | Out-File $buildGradlePath -Encoding ASCII

# Set production environment variables
Write-Host ""
Write-Host "Setting production environment..."
$env:NEXT_PUBLIC_API_URL = "https://resolveit-online-complaint-management-xncb.onrender.com"
Write-Host "API URL set to: $env:NEXT_PUBLIC_API_URL"

# Change to Client directory
Set-Location "Client"

# Install dependencies if needed
Write-Host ""
Write-Host "Installing dependencies..."
npm install

# Build the Next.js project with production environment
Write-Host ""
Write-Host "Building Next.js project (Production)..."
npm run build

# Sync with Capacitor
Write-Host ""
Write-Host "Syncing with Capacitor..."
npx cap sync android

# Build APK using Gradle
Write-Host ""
Write-Host "Building APK with new icon..."
Set-Location "android"
& .\gradlew assembleDebug

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    # Rename the APK file to include version
    $originalApkPath = "app\build\outputs\apk\debug\app-debug.apk"
    $newApkPath = "app\build\outputs\apk\debug\ResolveIt-v$newVersion-debug.apk"
    
    if (Test-Path $originalApkPath) {
        Rename-Item -Path $originalApkPath -NewName "ResolveIt-v$newVersion-debug.apk"
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "APK Build Successful with New Icon!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "APK location: android\app\build\outputs\apk\debug\ResolveIt-v$newVersion-debug.apk"
        Write-Host "New Icon: White gear with blue circle and teal checkmark"
        Write-Host "API URL: https://resolveit-online-complaint-management-xncb.onrender.com"
        Write-Host ""
        Write-Host "You can find your APK in the above location."
        Write-Host "Install the new APK to see the updated icon!"
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "APK Built but file not found for renaming!" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "Check: android\app\build\outputs\apk\debug\"
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "APK Build Failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Please check the error messages above."
    Write-Host ""
}

# Return to root directory
Set-Location ".."
Set-Location ".."

Read-Host "Press Enter to continue" 