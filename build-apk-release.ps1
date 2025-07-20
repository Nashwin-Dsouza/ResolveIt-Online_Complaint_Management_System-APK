# PowerShell script to build Release APK with version increment
Write-Host "========================================" -ForegroundColor Green
Write-Host "Building ResolveIt Release APK" -ForegroundColor Green
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

# Change to Client directory
Set-Location "Client"

# Install dependencies if needed
Write-Host ""
Write-Host "Installing dependencies..."
npm install

# Build the Next.js project
Write-Host ""
Write-Host "Building Next.js project..."
npm run build

# Sync with Capacitor
Write-Host ""
Write-Host "Syncing with Capacitor..."
npx cap sync android

# Build Release APK using Gradle
Write-Host ""
Write-Host "Building Release APK..."
Set-Location "android"
& .\gradlew assembleRelease

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    # Rename the APK file to include version
    $originalApkPath = "app\build\outputs\apk\release\app-release.apk"
    $newApkPath = "app\build\outputs\apk\release\ResolveIt-v$newVersion.apk"
    
    if (Test-Path $originalApkPath) {
        Rename-Item -Path $originalApkPath -NewName "ResolveIt-v$newVersion.apk"
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Release APK Build Successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "APK location: android\app\build\outputs\apk\release\ResolveIt-v$newVersion.apk"
        Write-Host ""
        Write-Host "You can find your release APK in the above location."
        Write-Host "Note: This APK is signed and ready for distribution."
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "Release APK Built but file not found for renaming!" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "Check: android\app\build\outputs\apk\release\"
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Release APK Build Failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Please check the error messages above."
    Write-Host "Make sure you have configured signing keys for release builds."
    Write-Host ""
}

# Return to root directory
Set-Location ".."
Set-Location ".."

Read-Host "Press Enter to continue" 