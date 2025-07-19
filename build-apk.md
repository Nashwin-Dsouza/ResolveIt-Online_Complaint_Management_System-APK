# APK Build Guide

## Prerequisites
- Node.js and npm installed
- Android Studio installed
- Android SDK configured
- Java JDK installed

## Step 1: Set up Environment Variables
1. Create `.env.local` file in `Client/` directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. Create `.env` file in `Server/` directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

## Step 2: Install Dependencies
```bash
# In Client directory
cd Client
npm install

# In Server directory
cd ../Server
npm install
```

## Step 3: Build the Web App
```bash
# In Client directory
npm run build
```

## Step 4: Sync with Capacitor
```bash
# In Client directory
npm run cap:sync
```

## Step 5: Open Android Studio
```bash
# In Client directory
npm run cap:open:android
```

## Step 6: Build APK in Android Studio
1. Open Android Studio
2. Wait for project to sync
3. Go to Build → Build Bundle(s) / APK(s) → Build APK(s)
4. APK will be generated in `android/app/build/outputs/apk/debug/`

## Alternative: Command Line Build
```bash
# In Client/android directory
./gradlew assembleDebug
```

## Testing the APK
1. Transfer APK to your phone
2. Install the APK
3. Make sure your server is running on the same network
4. Update `NEXT_PUBLIC_API_URL` to your computer's IP address if needed

## Troubleshooting
- If build fails, try: `npm run cap:sync` again
- Make sure all environment variables are set
- Check that server is running and accessible 