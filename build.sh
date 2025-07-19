#!/bin/bash

echo "🚀 Starting APK Build Process..."

# Check if we're in the right directory
if [ ! -d "Client" ] || [ ! -d "Server" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Step 1: Install dependencies
echo "📦 Installing Client dependencies..."
cd Client
npm install

echo "📦 Installing Server dependencies..."
cd ../Server
npm install

# Step 2: Build the web app
echo "🔨 Building web application..."
cd ../Client
npm run build

# Step 3: Sync with Capacitor
echo "📱 Syncing with Capacitor..."
npm run cap:sync

echo "✅ Build process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Run: npm run cap:open:android"
echo "2. In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "3. Find your APK in: android/app/build/outputs/apk/debug/"
echo ""
echo "🔧 Or build from command line:"
echo "cd android && ./gradlew assembleDebug" 