# Postman Testing Guide for OTP System

## Base URL (Render)
```
https://resolveit-online-complaint-management-xncb.onrender.com
```

## 1. Send OTP

**Method:** `POST`  
**URL:** `https://resolveit-online-complaint-management-xncb.onrender.com/api/otp/send`  
**Headers:** 
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "your-email@gmail.com",
  "type": "login"
}
```

**Expected Response:**
```json
{
  "message": "OTP sent successfully",
  "email": "your-email@gmail.com"
}
```

## 2. Verify OTP

**Method:** `POST`  
**URL:** `https://resolveit-online-complaint-management-xncb.onrender.com/api/otp/verify`  
**Headers:** 
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "your-email@gmail.com",
  "otp": "1234",
  "type": "login"
}
```

**Expected Response:**
```json
{
  "message": "OTP verified successfully",
  "user": {
    "_id": "...",
    "email": "your-email@gmail.com",
    "name": "..."
  }
}
```

## 3. Resend OTP

**Method:** `POST`  
**URL:** `https://resolveit-online-complaint-management-xncb.onrender.com/api/otp/resend`  
**Headers:** 
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "your-email@gmail.com",
  "type": "login"
}
```

## 4. Test Server Status

**Method:** `GET`  
**URL:** `https://resolveit-online-complaint-management-xncb.onrender.com/`  
**Expected Response:**
```
API is running
```

## Testing Steps

1. **Your server is already running on Render** at:
   ```
   https://resolveit-online-complaint-management-xncb.onrender.com
   ```

2. **Test server status** (GET `/`)

3. **Send OTP** (POST `/api/otp/send`)

4. **Check your email** for the 4-digit OTP

5. **Verify OTP** (POST `/api/otp/verify`)

## Common Issues & Solutions

### Issue: "Failed to send OTP email"
**Solution:** Check your `.env` file and Gmail App Password

### Issue: "Email service configuration failed"
**Solution:** Verify EMAIL_USER and EMAIL_PASS in `.env`

### Issue: "User not found" (for login)
**Solution:** Create a user first or use "signup" type

### Issue: "User already exists" (for signup)
**Solution:** Use "login" type or different email

## Environment Variables Required

Create `Server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/resolveit
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
JWT_SECRET=your-secret-key
``` 