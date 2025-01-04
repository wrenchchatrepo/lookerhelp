# Google OAuth Configuration Guide

## Development Environment

### JavaScript Origins
```
http://localhost:3000
```
This is where your React app runs locally.

### Redirect URIs
```
https://miguelai.web.app/oauth-callback
```
This will be handled by our client-side route.

## Production Environment

### JavaScript Origins
```
https://miguelai.web.app
```
Your Firebase Hosting URL (or custom domain if configured)

### Redirect URIs
```
https://miguelai.web.app/oauth-callback
```
The same redirect URI for both environments, handled by the client

## Configuration Steps

1. Go to Google Cloud Console
2. Navigate to APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add both development and production URIs
5. Save changes

## Environment Variables

### Development (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=http://localhost:5001/miguelai/us-central1
```

### Production (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=https://us-central1-miguelai.cloudfunctions.net
```

## Security Notes

1. CORS Configuration:
```json
// Development
CORS_ORIGINS=["http://localhost:3000"]

// Production
CORS_ORIGINS=["https://miguelai.web.app"]
```

2. Verify that:
- All URLs use HTTPS in production
- Redirect URIs exactly match your function endpoints
- JavaScript origins match your hosting domains
- CORS origins match your JavaScript origins
