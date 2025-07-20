@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Git Update Script
echo ========================================
echo.

:: Store the original directory
set "ORIGINAL_DIR=%CD%"

:: Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not a git repository!
    echo Please run this script from a git repository directory.
    echo Current directory: %CD%
    pause
    exit /b 1
)

:: Check if git is installed
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Error: Git is not installed or not in PATH!
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo 📁 Current directory: %CD%
echo.

:: Step 1: Change origin to the specified repository
echo 🔄 Step 1: Updating Git origin...
echo Setting origin to: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git

:: Remove existing origin if it exists
git remote remove origin 2>nul

:: Add new origin
git remote add origin https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git

if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to set origin!
    pause
    exit /b 1
)

echo ✅ Origin updated successfully
echo.

:: Step 2: Show Git status
echo 📊 Step 2: Checking Git status...
git status
echo.

:: Step 3: Add all changes
echo 📦 Step 3: Adding all changes...
git add .
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to add changes!
    pause
    exit /b 1
)
echo ✅ All changes added
echo.

:: Step 4: Generate auto-incrementing commit message
echo 📝 Step 4: Generating commit message...

:: Create commit counter file if it doesn't exist
if not exist "commit-counter.txt" (
    echo 1 > commit-counter.txt
)

:: Read current counter
set /p COUNTER=<commit-counter.txt

:: Increment counter
set /a COUNTER+=1

:: Save new counter
echo %COUNTER% > commit-counter.txt

:: Get current date and time
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do (
    set "CURRENT_DATE=%%c-%%b-%%a"
    set "CURRENT_TIME=%%d:%%e:%%f"
)

:: Create commit message
set "COMMIT_MSG=Update #%COUNTER% - %CURRENT_DATE% %CURRENT_TIME% - Device API and network improvements"

echo Commit message: %COMMIT_MSG%
echo.

:: Step 5: Commit changes
echo 💾 Step 5: Committing changes...

:: Check if there are any changes to commit
git status --porcelain >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ⚠️  No changes detected to commit.
    echo.
    echo Do you want to continue with push anyway? (y/n)
    set /p CONTINUE=
    if /i not "!CONTINUE!"=="y" (
        echo Exiting...
        pause
        exit /b 1
    )
    echo Continuing with push...
    set COMMIT_RESULT=0
) else (
    :: Configure git to not open editor
    git config --global core.editor "echo"
    
    :: Try to commit with the message
    git commit -m "%COMMIT_MSG%" 2>&1
    set COMMIT_RESULT=%ERRORLEVEL%
    
    if %COMMIT_RESULT% neq 0 (
        echo ❌ Failed to commit changes!
        echo.
        echo Checking if there are any changes to commit...
        git status --porcelain
        echo.
        echo Do you want to continue with push anyway? (y/n)
        set /p CONTINUE=
        if /i not "!CONTINUE!"=="y" (
            echo Exiting...
            pause
            exit /b 1
        )
        echo Continuing with push...
    ) else (
        echo ✅ Changes committed successfully
    )
)
echo.

:: Step 6: Push to remote repository
echo 🚀 Step 6: Pushing to remote repository...
echo Pushing to: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git

:: Try to push to main branch first
git push -u origin main
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Failed to push to main branch, trying master...
    git push -u origin master
    if %ERRORLEVEL% neq 0 (
        echo ❌ Failed to push to remote repository!
        echo.
        echo Possible issues:
        echo 1. No internet connection
        echo 2. Repository doesn't exist or is private
        echo 3. Authentication required
        echo 4. Branch name mismatch
        echo.
        echo Please check your Git configuration and try again.
        pause
        exit /b 1
    )
)

echo ✅ Successfully pushed to remote repository!
echo.

:: Step 7: Show final status
echo 📊 Step 7: Final status...
git status
echo.

:: Step 8: Show commit history
echo 📜 Step 8: Recent commits...
git log --oneline -5
echo.

echo ========================================
echo    Git Update Complete! 🎉
echo ========================================
echo.
echo ✅ Summary:
echo    - Origin updated to GitHub repository
echo    - All changes added and committed
echo    - Commit #%COUNTER% pushed successfully
echo    - Commit message: %COMMIT_MSG%
echo.
echo 🔗 Repository: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git
echo.
echo Press any key to exit...
pause >nul 