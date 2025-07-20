# PowerShell script to build APK with version increment
Write-Host "========================================" -ForegroundColor Green
Write-Host "Building ResolveIt APK" -ForegroundColor Green
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

# Build APK using Gradle
Write-Host ""
Write-Host "Building APK..."
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
        Write-Host "APK Build Successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "APK location: android\app\build\outputs\apk\debug\ResolveIt-v$newVersion-debug.apk"
        Write-Host ""
        Write-Host "You can find your APK in the above location."
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