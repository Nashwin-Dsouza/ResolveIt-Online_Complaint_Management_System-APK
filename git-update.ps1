# Git Update Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Git Update Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Store the original directory
$OriginalDir = Get-Location

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    Write-Host "Please run this script from a git repository directory." -ForegroundColor Yellow
    Write-Host "Current directory: $($OriginalDir.Path)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if git is installed
try {
    $null = git --version
} catch {
    Write-Host "❌ Error: Git is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📁 Current directory: $($OriginalDir.Path)" -ForegroundColor Green
Write-Host ""

# Step 1: Change origin to the specified repository
Write-Host "🔄 Step 1: Updating Git origin..." -ForegroundColor Yellow
$RepositoryUrl = "https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git"
Write-Host "Setting origin to: $RepositoryUrl" -ForegroundColor Gray

# Remove existing origin if it exists
git remote remove origin 2>$null

# Add new origin
$originResult = git remote add origin $RepositoryUrl 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to set origin!" -ForegroundColor Red
    Write-Host $originResult -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Origin updated successfully" -ForegroundColor Green
Write-Host ""

# Step 2: Show Git status
Write-Host "📊 Step 2: Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 3: Add all changes
Write-Host "📦 Step 3: Adding all changes..." -ForegroundColor Yellow
$addResult = git add . 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to add changes!" -ForegroundColor Red
    Write-Host $addResult -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ All changes added" -ForegroundColor Green
Write-Host ""

# Step 4: Generate auto-incrementing commit message
Write-Host "📝 Step 4: Generating commit message..." -ForegroundColor Yellow

# Create commit counter file if it doesn't exist
$counterFile = "commit-counter.txt"
if (-not (Test-Path $counterFile)) {
    "1" | Out-File -FilePath $counterFile -Encoding UTF8
}

# Read current counter
$counter = [int](Get-Content $counterFile)

# Increment counter
$counter++

# Save new counter
$counter | Out-File -FilePath $counterFile -Encoding UTF8

# Get current date and time
$currentDate = Get-Date -Format "yyyy-MM-dd"
$currentTime = Get-Date -Format "HH:mm:ss"

# Create commit message
$commitMsg = "Update #$counter - $currentDate $currentTime - Device API and network improvements"

Write-Host "Commit message: $commitMsg" -ForegroundColor Gray
Write-Host ""

# Step 5: Commit changes
Write-Host "💾 Step 5: Committing changes..." -ForegroundColor Yellow
$commitResult = git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to commit changes!" -ForegroundColor Red
    Write-Host "This might be because there are no changes to commit." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Do you want to continue with push anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
}
Write-Host ""

# Step 6: Push to remote repository
Write-Host "🚀 Step 6: Pushing to remote repository..." -ForegroundColor Yellow
Write-Host "Pushing to: $RepositoryUrl" -ForegroundColor Gray

# Try to push to main branch first
$pushResult = git push -u origin main 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Failed to push to main branch, trying master..." -ForegroundColor Yellow
    $pushResult = git push -u origin master 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to push to remote repository!" -ForegroundColor Red
        Write-Host $pushResult -ForegroundColor Red
        Write-Host ""
        Write-Host "Possible issues:" -ForegroundColor Yellow
        Write-Host "1. No internet connection" -ForegroundColor White
        Write-Host "2. Repository doesn't exist or is private" -ForegroundColor White
        Write-Host "3. Authentication required" -ForegroundColor White
        Write-Host "4. Branch name mismatch" -ForegroundColor White
        Write-Host ""
        Write-Host "Please check your Git configuration and try again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host "✅ Successfully pushed to remote repository!" -ForegroundColor Green
Write-Host ""

# Step 7: Show final status
Write-Host "📊 Step 7: Final status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 8: Show commit history
Write-Host "📜 Step 8: Recent commits..." -ForegroundColor Yellow
git log --oneline -5
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Git Update Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Summary:" -ForegroundColor Green
Write-Host "   - Origin updated to GitHub repository" -ForegroundColor White
Write-Host "   - All changes added and committed" -ForegroundColor White
Write-Host "   - Commit #$counter pushed successfully" -ForegroundColor White
Write-Host "   - Commit message: $commitMsg" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Repository: $RepositoryUrl" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit" 