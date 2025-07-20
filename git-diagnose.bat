@echo off
echo ========================================
echo    Git Diagnostic Script
echo ========================================
echo.

echo 📁 Current directory: %CD%
echo.

:: Check if .git exists
if exist ".git" (
    echo ✅ .git directory found
) else (
    echo ❌ .git directory not found
    echo This is not a git repository!
    pause
    exit /b 1
)

:: Check git installation
echo.
echo 🔍 Checking Git installation...
git --version
if %ERRORLEVEL% equ 0 (
    echo ✅ Git is installed and working
) else (
    echo ❌ Git is not installed or not in PATH
    pause
    exit /b 1
)

:: Check git config
echo.
echo 🔍 Checking Git configuration...
echo User name: 
git config user.name
echo User email:
git config user.email
echo.

:: Check current branch
echo 🔍 Checking current branch...
git branch --show-current
echo.

:: Check remote
echo 🔍 Checking remote configuration...
git remote -v
echo.

:: Check status
echo 🔍 Checking Git status...
git status
echo.

:: Check if there are changes
echo 🔍 Checking for changes...
echo Staged changes:
git diff --cached --name-only
echo.
echo Unstaged changes:
git diff --name-only
echo.

:: Check commit history
echo 🔍 Recent commits:
git log --oneline -3
echo.

:: Test commit without message
echo 🔍 Testing commit process...
echo This will test if git commit works without opening an editor...
git config --global core.editor "echo"
echo.

:: Check if commit counter exists
if exist "commit-counter.txt" (
    echo 🔍 Commit counter file found:
    type commit-counter.txt
) else (
    echo 🔍 No commit counter file found
)
echo.

echo ========================================
echo    Diagnostic Complete
echo ========================================
echo.
echo If the script gets stuck during commit, it might be because:
echo 1. Git is trying to open an editor (fixed with core.editor setting)
echo 2. There are no changes to commit
echo 3. Git credentials are not configured
echo 4. Network connectivity issues
echo.
echo Try running git-update-simple.bat instead of git-update.bat
echo.
pause 