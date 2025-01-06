# Master Configuration

## Environment Variables Reference

### OAuth Configuration
- `GOOGLE_OAUTH_CLIENT_ID` - Google OAuth client ID for authentication
- `GOOGLE_OAUTH_CLIENT_SECRET` - Google OAuth client secret
- `JWT_SECRET` - Secret for signing JWT tokens

### Project Configuration
- `FRONTEND_URL` = "miguelai.web.app"
- `GCP_PROJECT_ID` = "miguelai"
- `FUNCTION_REGION` = "us-central1"
- `NODE_ENV` = "production"

### BigQuery Configuration
- `BIGQUERY_DATASET` - Name of the BigQuery dataset

### Security Configuration
- `CORS_ORIGINS` - Array of allowed CORS origins for production

## Required Values (.env)

```env
# OAuth Configuration
GOOGLE_OAUTH_CLIENT_ID=<from_google_cloud_console>
GOOGLE_OAUTH_CLIENT_SECRET=<from_google_cloud_console>
JWT_SECRET=41843aa9f96a98d79ed8d3d57ded8b3edb05e61e6a0eff19b52ca0f6a41ec5a2795b77b6cb66480394330e26dbfadaa27764f152f7333b6ce020ddeffebb49eb

# Project Configuration
FRONTEND_URL=miguelai.web.app
GCP_PROJECT_ID=miguelai
FUNCTION_REGION=us-central1
NODE_ENV=production

# BigQuery Configuration
BIGQUERY_DATASET=lookerhelp_production

# Security Configuration
CORS_ORIGINS=["https://miguelai.web.app"]
```

## OAuth Configuration Details

### JavaScript Origins
- Development: http://localhost:3000
- Production: https://miguelai.web.app

### Redirect URIs
- Development: http://localhost:5001/miguelai/us-central1/handleGoogleAuth
- Production: https://us-central1-miguelai.cloudfunctions.net/handleGoogleAuth

## Function URLs
- OAuth Handler: https://us-central1-miguelai.cloudfunctions.net/handleGoogleAuth
- Verification Endpoint: https://us-central1-miguelai.cloudfunctions.net/verifySubscription

## Integration Points
1. Frontend → Cloud Functions
2. Cloud Functions → BigQuery
3. Stripe → Cloud Storage → BigQuery
4. OAuth → User Authentication
5. Slack → Stripe Integration

## Security Notes
- All production URLs must use HTTPS
- JWT expiration set to 24 hours
- CORS origins strictly limited to frontend domains
- OAuth flow secured with state parameter
- BigQuery queries use parameterized statements
