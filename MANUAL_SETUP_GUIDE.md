# Manual Device API Setup Guide

If the automated setup scripts don't work, follow this manual setup guide.

## Prerequisites

- Node.js and npm installed
- MongoDB running
- Git (optional, for version control)

## Step 1: Install Server Dependencies

1. Open Command Prompt or PowerShell
2. Navigate to the Server directory:
   ```bash
   cd Server
   ```

3. Install the required dependency:
   ```bash
   npm install uuid
   ```

4. Verify installation by checking `package.json`:
   ```json
   {
     "dependencies": {
       "uuid": "^9.0.0"
     }
   }
   ```

## Step 2: Install Client Dependencies

1. Navigate to the Client directory:
   ```bash
   cd ../Client
   ```

2. Install the required dependency:
   ```bash
   npm install @capacitor/core
   ```

3. Verify installation by checking `package.json`:
   ```json
   {
     "dependencies": {
       "@capacitor/core": "^5.5.0"
     }
   }
   ```

## Step 3: Start the Server

1. Navigate to the Server directory:
   ```bash
   cd Server
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. You should see output like:
   ```
   MongoDB connected
   Server running on port 5000
   ```

## Step 4: Start the Client

1. Open a new Command Prompt or PowerShell window
2. Navigate to the Client directory:
   ```bash
   cd Client
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. You should see output like:
   ```
   Ready - started server on 0.0.0.0:3000
   ```

## Step 5: Test the Device API

1. Open your browser and go to `http://localhost:3000`
2. The device should automatically register when the page loads
3. Check the browser console for device registration logs
4. Visit `http://localhost:3000/devices` to see device management
5. Visit `http://localhost:3000/network-test` for network diagnostics

## Troubleshooting

### Common Issues

1. **"npm not found"**
   - Install Node.js from https://nodejs.org/
   - Restart your command prompt after installation

2. **"MongoDB connection failed"**
   - Make sure MongoDB is running
   - Check your `.env` file in the Server directory
   - Verify the MongoDB connection string

3. **"Port already in use"**
   - Kill the process using the port:
     ```bash
     # Windows
     netstat -ano | findstr :3000
     taskkill /PID <PID> /F
     
     # macOS/Linux
     lsof -ti:3000 | xargs kill -9
     ```

4. **"Module not found"**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

### Manual Dependency Installation

If npm install fails, try these alternatives:

```bash
# Clear npm cache
npm cache clean --force

# Install with verbose output
npm install uuid --verbose

# Install with legacy peer deps
npm install uuid --legacy-peer-deps
```

### Environment Variables

Make sure your Server `.env` file contains:

```env
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=5000
NODE_ENV=development
```

## Verification

To verify everything is working:

1. **Check Server Logs**: Look for device registration requests
2. **Check Browser Console**: Look for device registration logs
3. **Check Database**: Verify devices are being stored in MongoDB
4. **Test API Endpoints**: Use Postman or curl to test the API

### Test API with curl

```bash
# Test device registration
curl -X POST http://localhost:5000/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Test Device",
    "platform": "web",
    "userAgent": "Mozilla/5.0 (Test Browser)"
  }'

# Test device statistics
curl http://localhost:5000/api/devices/stats/overview
```

## Next Steps

After successful setup:

1. **Build for Production**:
   ```bash
   cd Client
   npm run build
   ```

2. **Build Android APK**:
   ```bash
   npm run cap:sync
   npm run cap:open:android
   ```

3. **Deploy to Server**:
   - Upload Server files to your hosting provider
   - Set up environment variables
   - Start the server

## Support

If you're still having issues:

1. Check the console for error messages
2. Verify all file paths are correct
3. Ensure you're running from the project root directory
4. Try running the commands manually instead of using scripts

## File Structure Check

Make sure your project structure looks like this:

```
online_complain_management_apk/
├── Server/
│   ├── package.json
│   ├── app.js
│   ├── models/
│   │   └── Device.js
│   ├── controllers/
│   │   └── deviceController.js
│   └── routes/
│       └── deviceRoutes.js
├── Client/
│   ├── package.json
│   ├── src/
│   │   ├── utils/
│   │   │   └── deviceUtils.ts
│   │   ├── components/
│   │   │   └── DeviceInitializer.tsx
│   │   └── app/
│   │       ├── layout.tsx
│   │       └── devices/
│   │           └── page.tsx
│   └── setup-device-api.bat
└── setup-device-api.bat
``` 