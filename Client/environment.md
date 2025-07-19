# Environment Setup for APK

## Create .env.local file in the Client directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## For production deployment, use your server URL:

```
NEXT_PUBLIC_API_URL=https://your-server-url.com
```

## Server Environment Variables (.env in Server directory):

```
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000
JWT_SECRET=your_jwt_secret
``` 