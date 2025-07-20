# Device API Documentation

## Overview

The Device API allows you to register, track, and manage devices that access your application. It automatically captures device information including phone model, platform, screen details, and more.

## Base URL

```
https://your-server.com/api/devices
```

## Authentication

Most endpoints don't require authentication, but you can associate devices with users for better tracking.

## Endpoints

### 1. Register Device

**POST** `/api/devices/register`

Registers a new device or updates an existing device's information.

#### Request Body

```json
{
  "deviceId": "optional-unique-id",
  "model": "Samsung Galaxy S21",
  "manufacturer": "Samsung",
  "platform": "android",
  "osVersion": "12.0",
  "appVersion": "1.0.0",
  "userAgent": "Mozilla/5.0...",
  "browser": "Chrome",
  "browserVersion": "91.0.4472.120",
  "screenWidth": 1080,
  "screenHeight": 2400,
  "pixelRatio": 3,
  "connectionType": "4g",
  "userId": "optional-user-id"
}
```

#### Required Fields
- `model`: Device model name
- `platform`: Device platform (android, ios, web, unknown)

#### Response

```json
{
  "success": true,
  "message": "Device registered successfully",
  "data": {
    "deviceId": "generated-or-provided-id",
    "model": "Samsung Galaxy S21",
    "platform": "android",
    "lastSeen": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Update Device Heartbeat

**PUT** `/api/devices/heartbeat/:deviceId`

Updates the last seen timestamp for a device.

#### Parameters
- `deviceId`: The unique device identifier

#### Response

```json
{
  "success": true,
  "message": "Device heartbeat updated",
  "data": {
    "deviceId": "device-id",
    "lastSeen": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Get Device Information

**GET** `/api/devices/:deviceId`

Retrieves detailed information about a specific device.

#### Parameters
- `deviceId`: The unique device identifier

#### Response

```json
{
  "success": true,
  "data": {
    "_id": "device-mongodb-id",
    "deviceId": "unique-device-id",
    "model": "Samsung Galaxy S21",
    "manufacturer": "Samsung",
    "platform": "android",
    "osVersion": "12.0",
    "appVersion": "1.0.0",
    "userAgent": "Mozilla/5.0...",
    "browser": "Chrome",
    "browserVersion": "91.0.4472.120",
    "screenWidth": 1080,
    "screenHeight": 2400,
    "pixelRatio": 3,
    "connectionType": "4g",
    "userId": "user-id-or-null",
    "isActive": true,
    "lastSeen": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Get All Devices

**GET** `/api/devices`

Retrieves a paginated list of all devices.

#### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `platform`: Filter by platform (android, ios, web)
- `isActive`: Filter by active status (true, false)

#### Example Request
```
GET /api/devices?page=1&limit=20&platform=android&isActive=true
```

#### Response

```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "_id": "device-id-1",
        "deviceId": "unique-id-1",
        "model": "Samsung Galaxy S21",
        "platform": "android",
        "lastSeen": "2024-01-15T10:30:00.000Z",
        "userId": {
          "_id": "user-id",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

### 5. Get Devices by User

**GET** `/api/devices/user/:userId`

Retrieves all devices associated with a specific user.

#### Parameters
- `userId`: The user's MongoDB ObjectId

#### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "device-id-1",
      "deviceId": "unique-id-1",
      "model": "Samsung Galaxy S21",
      "platform": "android",
      "lastSeen": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 6. Update Device

**PUT** `/api/devices/:deviceId`

Updates device information.

#### Parameters
- `deviceId`: The unique device identifier

#### Request Body
```json
{
  "model": "Updated Model Name",
  "osVersion": "13.0",
  "appVersion": "1.1.0",
  "userId": "new-user-id"
}
```

#### Response

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "_id": "device-id",
    "deviceId": "unique-id",
    "model": "Updated Model Name",
    "osVersion": "13.0",
    "appVersion": "1.1.0",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 7. Deactivate Device

**DELETE** `/api/devices/:deviceId`

Marks a device as inactive.

#### Parameters
- `deviceId`: The unique device identifier

#### Response

```json
{
  "success": true,
  "message": "Device deactivated successfully",
  "data": {
    "_id": "device-id",
    "deviceId": "unique-id",
    "isActive": false,
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 8. Get Device Statistics

**GET** `/api/devices/stats/overview`

Retrieves overall device statistics.

#### Response

```json
{
  "success": true,
  "data": {
    "total": 150,
    "active": 120,
    "recent": 45,
    "byPlatform": {
      "android": 80,
      "ios": 40,
      "web": 30
    }
  }
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common HTTP Status Codes

- `200`: Success
- `400`: Bad Request (missing required fields)
- `404`: Device not found
- `500`: Internal server error

## Client-Side Integration

### JavaScript/TypeScript Example

```typescript
import DeviceUtils from './utils/deviceUtils';

// Initialize device tracking
await DeviceUtils.initialize();

// Register device manually
const result = await DeviceUtils.registerDevice();
if (result.success) {
  console.log('Device registered:', result.deviceId);
}

// Update heartbeat
await DeviceUtils.updateHeartbeat();

// Associate with user
await DeviceUtils.associateWithUser('user-id');

// Get device statistics
const stats = await DeviceUtils.getDeviceStats();
```

### React Component Example

```jsx
import React, { useEffect } from 'react';
import DeviceUtils from './utils/deviceUtils';

const App = () => {
  useEffect(() => {
    // Initialize device tracking when app starts
    DeviceUtils.initialize();
  }, []);

  return (
    <div>
      <h1>My App</h1>
      {/* Your app content */}
    </div>
  );
};
```

## Database Schema

### Device Collection

```javascript
{
  deviceId: String,           // Unique device identifier
  model: String,              // Device model name
  manufacturer: String,        // Device manufacturer
  platform: String,           // Platform (android, ios, web, unknown)
  osVersion: String,          // Operating system version
  appVersion: String,         // App version
  userAgent: String,          // Browser user agent
  browser: String,            // Browser name
  browserVersion: String,     // Browser version
  screenWidth: Number,        // Screen width in pixels
  screenHeight: Number,       // Screen height in pixels
  pixelRatio: Number,         // Device pixel ratio
  connectionType: String,     // Network connection type
  userId: ObjectId,           // Associated user (optional)
  isActive: Boolean,          // Device active status
  lastSeen: Date,             // Last activity timestamp
  createdAt: Date,            // Registration timestamp
  updatedAt: Date             // Last update timestamp
}
```

## Security Considerations

1. **Device ID Generation**: Device IDs are generated using UUID v4 for uniqueness
2. **Data Validation**: All input data is validated before storage
3. **Rate Limiting**: Consider implementing rate limiting for device registration
4. **Privacy**: Be mindful of user privacy when collecting device information
5. **GDPR Compliance**: Ensure compliance with data protection regulations

## Best Practices

1. **Automatic Registration**: Register devices automatically when the app starts
2. **Heartbeat Updates**: Send heartbeat updates periodically (every 5-10 minutes)
3. **User Association**: Associate devices with users after login
4. **Error Handling**: Implement proper error handling for network failures
5. **Offline Support**: Handle cases where the device is offline

## Testing

### Test Device Registration

```bash
curl -X POST https://your-server.com/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Test Device",
    "platform": "web",
    "userAgent": "Mozilla/5.0 (Test Browser)",
    "screenWidth": 1920,
    "screenHeight": 1080
  }'
```

### Test Device Statistics

```bash
curl https://your-server.com/api/devices/stats/overview
```

## Troubleshooting

### Common Issues

1. **Device Not Registering**
   - Check network connectivity
   - Verify API endpoint URL
   - Check server logs for errors

2. **Duplicate Device IDs**
   - Ensure proper device ID generation
   - Check for race conditions in registration

3. **Heartbeat Failures**
   - Verify device ID is stored locally
   - Check network connectivity
   - Ensure proper error handling

### Debug Information

Enable debug logging in your client application:

```typescript
// Enable debug mode
localStorage.setItem('debug', 'true');

// Check device registration status
console.log('Device ID:', DeviceUtils.getDeviceId());
console.log('Is Registered:', DeviceUtils.isDeviceRegistered());
``` 