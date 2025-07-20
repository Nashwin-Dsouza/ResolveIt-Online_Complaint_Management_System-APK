@echo off
echo ========================================
echo Recreating .env file
echo ========================================

cd Server

echo Creating new .env file...
(
echo MONGO_URI=mongodb+srv://onlinecomplainmanager:9fwlOMmoiNWRwqdz@cluster0.ekzummo.mongodb.net/Online_Complaint_Mangement_System?retryWrites=true^&w=majority^&appName=Cluster0
echo EMAIL_USER=onlinecomplainmanager@gmail.com
echo EMAIL_PASS=blnnvbrleobetzvp
echo PORT=5000
echo JWT_SECRET=n@sh@2711
) > .env

echo.
echo ========================================
echo .env file recreated!
echo ========================================
echo.
echo New .env file contents:
type .env
echo.
echo ========================================
echo Testing environment variables...
echo ========================================
node ..\debug-env.js
echo.
pause 