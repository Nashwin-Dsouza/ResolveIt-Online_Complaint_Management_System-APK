# Git Update Scripts Guide

This guide explains how to use the automated Git update scripts to push your project to GitHub.

## Available Scripts

1. **`git-update.bat`** - Windows Batch script
2. **`git-update.ps1`** - PowerShell script (alternative)

## What the Scripts Do

### 🔄 **Step 1: Update Git Origin**
- Removes existing origin (if any)
- Sets new origin to: `https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git`

### 📊 **Step 2: Check Git Status**
- Shows current repository status
- Displays modified, added, and deleted files

### 📦 **Step 3: Add All Changes**
- Stages all modified files (`git add .`)
- Prepares changes for commit

### 📝 **Step 4: Generate Commit Message**
- Creates auto-incrementing commit counter
- Generates timestamped commit message
- Format: `Update #X - YYYY-MM-DD HH:MM:SS - Device API and network improvements`

### 💾 **Step 5: Commit Changes**
- Commits all staged changes with the generated message
- Handles cases where no changes exist

### 🚀 **Step 6: Push to GitHub**
- Pushes to `main` branch first, falls back to `master`
- Sets upstream tracking
- Handles authentication and connection errors

### 📊 **Step 7: Show Final Status**
- Displays final repository status
- Shows recent commit history

## How to Use

### **Option 1: Batch Script (Recommended)**
```bash
# Double-click the file or run from command prompt
git-update.bat
```

### **Option 2: PowerShell Script**
```bash
# Right-click and "Run with PowerShell" or run from PowerShell
.\git-update.ps1
```

## Prerequisites

1. **Git Installed**: Make sure Git is installed and in your PATH
2. **Git Repository**: Run from a directory with `.git` folder
3. **Internet Connection**: Required for pushing to GitHub
4. **Authentication**: You may need to authenticate with GitHub

## Auto-Incrementing Counter

The script creates a `commit-counter.txt` file that:
- Starts at 1 if it doesn't exist
- Increments by 1 each time you run the script
- Persists between script runs
- Resets if you delete the file

### Example Commit Messages:
- `Update #1 - 2024-01-15 14:30:25 - Device API and network improvements`
- `Update #2 - 2024-01-15 15:45:12 - Device API and network improvements`
- `Update #3 - 2024-01-15 16:20:33 - Device API and network improvements`

## Error Handling

The scripts handle common issues:

### **Git Not Installed**
```
❌ Error: Git is not installed or not in PATH!
Please install Git from https://git-scm.com/
```

### **Not a Git Repository**
```
❌ Error: Not a git repository!
Please run this script from a git repository directory.
```

### **No Changes to Commit**
```
❌ Failed to commit changes!
This might be because there are no changes to commit.
Do you want to continue with push anyway? (y/n)
```

### **Push Failed**
```
❌ Failed to push to remote repository!
Possible issues:
1. No internet connection
2. Repository doesn't exist or is private
3. Authentication required
4. Branch name mismatch
```

## Manual Git Commands

If the scripts don't work, you can run these commands manually:

```bash
# 1. Set origin
git remote remove origin
git remote add origin https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git

# 2. Check status
git status

# 3. Add changes
git add .

# 4. Commit (replace X with your counter)
git commit -m "Update #X - $(date) - Device API and network improvements"

# 5. Push
git push -u origin main
```

## Troubleshooting

### **Authentication Issues**
1. Configure Git credentials:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. Use GitHub CLI or Personal Access Token for authentication

### **Repository Access**
1. Make sure the repository exists on GitHub
2. Ensure you have write access to the repository
3. Check if the repository is private and you're authenticated

### **Branch Issues**
1. Check your current branch: `git branch`
2. Create main branch if it doesn't exist: `git checkout -b main`
3. Rename master to main: `git branch -M main`

### **Network Issues**
1. Check your internet connection
2. Try using SSH instead of HTTPS
3. Check firewall settings

## Customization

### **Change Repository URL**
Edit the script and change this line:
```bash
# In git-update.bat
set "REPO_URL=https://github.com/YourUsername/YourRepository.git"

# In git-update.ps1
$RepositoryUrl = "https://github.com/YourUsername/YourRepository.git"
```

### **Change Commit Message Format**
Edit the commit message generation:
```bash
# In git-update.bat
set "COMMIT_MSG=Your Custom Message #%COUNTER% - %CURRENT_DATE% %CURRENT_TIME%"

# In git-update.ps1
$commitMsg = "Your Custom Message #$counter - $currentDate $currentTime"
```

### **Reset Counter**
Delete the counter file to reset:
```bash
del commit-counter.txt
```

## Security Notes

1. **Repository URL**: The script uses HTTPS by default
2. **Credentials**: Store credentials securely using Git credential manager
3. **Access Control**: Ensure only authorized users can run the script
4. **Backup**: Always keep a backup of your work before pushing

## Support

If you encounter issues:

1. **Check the console output** for specific error messages
2. **Verify Git installation**: `git --version`
3. **Check repository status**: `git status`
4. **Test manual commands** before using the script
5. **Check GitHub repository** exists and is accessible

## Example Output

```
========================================
    Git Update Script
========================================

📁 Current directory: D:\Major project\online_complain_management_apk

🔄 Step 1: Updating Git origin...
Setting origin to: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git
✅ Origin updated successfully

📊 Step 2: Checking Git status...
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Client/src/app/LoginForm.js
        new file:   Server/models/Device.js

📦 Step 3: Adding all changes...
✅ All changes added

📝 Step 4: Generating commit message...
Commit message: Update #5 - 2024-01-15 16:30:25 - Device API and network improvements

💾 Step 5: Committing changes...
[main abc1234] Update #5 - 2024-01-15 16:30:25 - Device API and network improvements
 2 files changed, 150 insertions(+), 5 deletions(-)
✅ Changes committed successfully

🚀 Step 6: Pushing to remote repository...
Pushing to: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (12/12), 2.5 KiB | 2.5 MiB/s, done.
Total 12 (delta 3), reused 0 (delta 0), pack-reused 0
To https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git
   def5678..abc1234  main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
✅ Successfully pushed to remote repository!

📊 Step 7: Final status...
On branch main
Your branch is up to date with 'origin/main'.

📜 Step 8: Recent commits...
abc1234 (HEAD -> main, origin/main) Update #5 - 2024-01-15 16:30:25 - Device API and network improvements
def5678 Update #4 - 2024-01-15 15:20:10 - Device API and network improvements
ghi9012 Update #3 - 2024-01-15 14:15:45 - Device API and network improvements

========================================
    Git Update Complete! 🎉
========================================

✅ Summary:
   - Origin updated to GitHub repository
   - All changes added and committed
   - Commit #5 pushed successfully
   - Commit message: Update #5 - 2024-01-15 16:30:25 - Device API and network improvements

🔗 Repository: https://github.com/Nashwin-Dsouza/ResolveIt-Online_Complaint_Management_System-APK.git

Press Enter to exit...
``` 