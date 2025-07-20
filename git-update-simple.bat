@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Git Update Script (Simple Version)
echo ========================================
echo.

:: Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not a git repository!
    echo Please run this script from a git repository directory.
    pause
    exit /b 1
)

:: Check if git is installed
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Error: Git is not installed or not in PATH!
    pause
    exit /b 1
)

echo 📁 Current directory: %CD%
echo.

:: Step 1: Set origin
echo 🔄 Step 1: Setting Git origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git
echo ✅ Origin set
echo.

:: Step 2: Show status
echo 📊 Step 2: Git status...
git status
echo.

:: Step 3: Add changes
echo 📦 Step 3: Adding changes...
git add .
echo ✅ Changes added
echo.

:: Step 4: Generate commit message
echo 📝 Step 4: Generating commit message...

:: Handle commit counter
if not exist "commit-counter.txt" (
    echo 1 > commit-counter.txt
)
set /p COUNTER=<commit-counter.txt
set /a COUNTER+=1
echo %COUNTER% > commit-counter.txt

:: Get date/time
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do (
    set "CURRENT_DATE=%%c-%%b-%%a"
    set "CURRENT_TIME=%%d:%%e:%%f"
)

set "COMMIT_MSG=Update #%COUNTER% - %CURRENT_DATE% %CURRENT_TIME%"
echo Commit message: %COMMIT_MSG%
echo.

:: Step 5: Commit (with better error handling)
echo 💾 Step 5: Committing changes...

:: Prevent git from opening editor
git config --global core.editor "echo"

:: Check if there are changes to commit
git diff --cached --quiet
if %ERRORLEVEL% equ 0 (
    echo ⚠️  No staged changes to commit.
    echo Checking for unstaged changes...
    git diff --quiet
    if %ERRORLEVEL% equ 0 (
        echo ⚠️  No changes detected at all.
        echo Do you want to continue with push anyway? (y/n)
        set /p CONTINUE=
        if /i not "!CONTINUE!"=="y" (
            echo Exiting...
            pause
            exit /b 1
        )
        echo Continuing with push...
    ) else (
        echo 📦 Adding unstaged changes...
        git add .
        git commit -m "%COMMIT_MSG%"
        if %ERRORLEVEL% equ 0 (
            echo ✅ Changes committed successfully
        ) else (
            echo ❌ Failed to commit changes
            echo Do you want to continue with push anyway? (y/n)
            set /p CONTINUE=
            if /i not "!CONTINUE!"=="y" (
                echo Exiting...
                pause
                exit /b 1
            )
            echo Continuing with push...
        )
    )
) else (
    git commit -m "%COMMIT_MSG%"
    if %ERRORLEVEL% equ 0 (
        echo ✅ Changes committed successfully
    ) else (
        echo ❌ Failed to commit changes
        echo Do you want to continue with push anyway? (y/n)
        set /p CONTINUE=
        if /i not "!CONTINUE!"=="y" (
            echo Exiting...
            pause
            exit /b 1
        )
        echo Continuing with push...
    )
)
echo.

:: Step 6: Push
echo 🚀 Step 6: Pushing to GitHub...
git push -u origin main 2>nul
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Trying master branch...
    git push -u origin master 2>nul
    if %ERRORLEVEL% neq 0 (
        echo ❌ Failed to push to GitHub
        echo Possible issues:
        echo 1. No internet connection
        echo 2. Repository doesn't exist or is private
        echo 3. Authentication required
        echo 4. Branch name mismatch
        pause
        exit /b 1
    )
)
echo ✅ Successfully pushed to GitHub!
echo.

:: Step 7: Show final status
echo 📊 Step 7: Final status...
git status
echo.

echo ========================================
echo    Git Update Complete! 🎉
echo ========================================
echo ✅ Commit #%COUNTER% pushed successfully
echo.
pause 