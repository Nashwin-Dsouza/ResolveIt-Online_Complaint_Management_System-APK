# Network Permission System Guide

## Overview

This guide explains the comprehensive network permission system implemented in the ResolveIt app. The system provides manual internet permission handling, network diagnostics, and offline functionality.

## What Was Implemented

### 1. Enhanced Android Permissions
The app now includes comprehensive network permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
```

### 2. Network Security Configuration
Created `network_security_config.xml` to allow cleartext traffic for development and local networks.

### 3. Enhanced Network Utilities (`src/utils/networkUtils.ts`)
- **Manual Permission Requests**: Interactive dialogs for requesting internet permission
- **Network Status Detection**: Real-time network connectivity monitoring
- **Enhanced Fetch with Retry**: Automatic retry logic with exponential backoff
- **Offline Support**: Local storage for complaints when offline
- **Toast Notifications**: User-friendly status messages

### 4. Network Permission Handler Component (`src/components/NetworkPermissionHandler.tsx`)
- **Automatic Permission Detection**: Checks for internet permission on app start
- **Interactive Permission Dialog**: User-friendly permission request interface
- **Network Status Indicator**: Visual indicator when offline
- **Real-time Monitoring**: Listens for network status changes

### 5. Enhanced Internet Test Component (`src/components/EnhancedInternetTest.tsx`)
- **Comprehensive Diagnostics**: Tests navigator status, network connectivity, and permissions
- **Latency Measurement**: Measures network response time
- **Detailed Reporting**: Shows technical details and troubleshooting tips
- **Visual Status Indicators**: Color-coded status display

## How to Use

### 1. Automatic Integration
The `NetworkPermissionHandler` is automatically integrated into the app layout (`src/app/layout.tsx`). It will:
- Check for internet permission on app start
- Show a permission dialog if needed
- Display network status indicators
- Handle network status changes

### 2. Manual Permission Requests
You can manually request internet permission anywhere in your app:

```typescript
import NetworkUtils from '../utils/networkUtils';

// Request permission
const hasPermission = await NetworkUtils.requestInternetPermission();

if (hasPermission) {
  console.log('Internet permission granted');
} else {
  console.log('Internet permission denied');
}
```

### 3. Network Status Monitoring
Monitor network status changes:

```typescript
import NetworkUtils from '../utils/networkUtils';

// Add network listener
NetworkUtils.addNetworkListener((isOnline) => {
  if (isOnline) {
    console.log('Network connection restored');
  } else {
    console.log('Network connection lost');
  }
});

// Get current status
const isOnline = NetworkUtils.getNetworkStatus();
```

### 4. Enhanced API Calls
The `ApiService` automatically uses the enhanced network utilities:

```typescript
import ApiService from '../services/apiService';

const apiService = new ApiService();

// This will automatically check permissions and handle retries
const complaints = await apiService.getComplaints();
```

### 5. Testing Network Connectivity
Visit `/network-test` in your app to access the comprehensive network diagnostics page.

## Testing the System

### 1. Network Test Page
Navigate to `http://localhost:3000/network-test` to access the comprehensive network diagnostics.

### 2. Manual Testing
1. **Enable/Disable Network**: Toggle airplane mode or disconnect WiFi
2. **Revoke Permissions**: Go to device settings and revoke internet permission
3. **Test Offline Mode**: Submit complaints while offline
4. **Test Reconnection**: Reconnect to network and verify sync

### 3. Android Testing
1. **Install APK**: Build and install the app on an Android device
2. **Check Permissions**: Go to Settings > Apps > ResolveIt > Permissions
3. **Test Permission Dialog**: The app should show permission request dialog
4. **Test Network Changes**: Toggle WiFi/mobile data

## Troubleshooting

### Common Issues

1. **Permission Dialog Not Showing**
   - Check if `showPermissionDialog` prop is set to `true`
   - Verify the component is properly imported and used

2. **Network Test Failing**
   - Check firewall settings
   - Verify proxy configuration
   - Ensure the test endpoint is accessible

3. **Android Permission Issues**
   - Go to Settings > Apps > ResolveIt > Permissions
   - Manually enable internet permission
   - Check if the app has proper network security configuration

4. **Offline Complaints Not Syncing**
   - Check if the app has internet permission
   - Verify the API service is properly configured
   - Check browser console for errors

### Debug Information

The enhanced network test provides detailed diagnostic information:
- Navigator online status
- Network connectivity test results
- Permission status
- Network latency
- Technical details (user agent, platform, etc.)

## File Structure

```
Client/
├── src/
│   ├── components/
│   │   ├── NetworkPermissionHandler.tsx    # Main permission handler
│   │   └── EnhancedInternetTest.tsx        # Network diagnostics
│   ├── utils/
│   │   └── networkUtils.ts                 # Enhanced network utilities
│   └── app/
│       ├── layout.tsx                      # App layout with permission handler
│       └── network-test/
│           └── page.tsx                    # Network test page
└── android/
    └── app/
        └── src/
            └── main/
                ├── AndroidManifest.xml     # Android permissions
                └── res/
                    └── xml/
                        └── network_security_config.xml  # Network security config
```

## Best Practices

1. **Always Check Network Status**: Use `NetworkUtils.getNetworkStatus()` before making API calls
2. **Handle Offline Scenarios**: Implement offline storage for critical data
3. **Show User Feedback**: Use toast notifications to inform users about network status
4. **Graceful Degradation**: Provide alternative functionality when offline
5. **Test Thoroughly**: Test on various network conditions and devices

## Security Considerations

1. **Network Security Config**: The current config allows cleartext traffic for development
2. **Production Deployment**: Update network security config for production
3. **Permission Handling**: Always handle permission denial gracefully
4. **Data Validation**: Validate all network responses before processing

## Future Enhancements

1. **Background Sync**: Implement background synchronization for offline data
2. **Network Quality Monitoring**: Add bandwidth and connection quality detection
3. **Advanced Retry Logic**: Implement more sophisticated retry strategies
4. **Network Analytics**: Track network performance and user experience metrics 