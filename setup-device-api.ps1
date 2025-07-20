# Device API Setup Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Device API Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Store the original directory
$OriginalDir = Get-Location

# Check if we're in the correct directory
if (-not (Test-Path "Server")) {
    Write-Host "❌ Error: Server directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    Write-Host "Current directory: $($OriginalDir.Path)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "Client")) {
    Write-Host "❌ Error: Client directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    Write-Host "Current directory: $($OriginalDir.Path)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📁 Current directory: $($OriginalDir.Path)" -ForegroundColor Green
Write-Host ""

# Install server dependencies
Write-Host "🔧 Installing server dependencies..." -ForegroundColor Yellow
Set-Location "Server"

if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found in Server directory!" -ForegroundColor Red
    Set-Location $OriginalDir
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Running: npm install uuid" -ForegroundColor Gray
$serverResult = npm install uuid 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install server dependencies!" -ForegroundColor Red
    Write-Host $serverResult -ForegroundColor Red
    Set-Location $OriginalDir
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Server dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Install client dependencies
Write-Host "🔧 Installing client dependencies..." -ForegroundColor Yellow
Set-Location $OriginalDir
Set-Location "Client"

if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found in Client directory!" -ForegroundColor Red
    Set-Location $OriginalDir
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Running: npm install @capacitor/core" -ForegroundColor Gray
$clientResult = npm install @capacitor/core 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install client dependencies!" -ForegroundColor Red
    Write-Host $clientResult -ForegroundColor Red
    Set-Location $OriginalDir
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Client dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Return to original directory
Set-Location $OriginalDir

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ All dependencies installed successfully" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Start the server: cd Server && npm run dev" -ForegroundColor White
Write-Host "2. Start the client: cd Client && npm run dev" -ForegroundColor White
Write-Host "3. Visit /devices to view device management" -ForegroundColor White
Write-Host "4. Check /network-test for network diagnostics" -ForegroundColor White
Write-Host ""
Write-Host "📱 The device API will automatically:" -ForegroundColor Yellow
Write-Host "   - Register devices when the app opens" -ForegroundColor White
Write-Host "   - Track device information and statistics" -ForegroundColor White
Write-Host "   - Update device heartbeat every 5 minutes" -ForegroundColor White
Write-Host "   - Store device data in MongoDB" -ForegroundColor White
Write-Host ""
Write-Host "🔍 To test the API:" -ForegroundColor Yellow
Write-Host "   - Open the app in a browser or mobile device" -ForegroundColor White
Write-Host "   - Check the browser console for device registration logs" -ForegroundColor White
Write-Host "   - Visit /devices page to see device information" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit" 