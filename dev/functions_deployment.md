# Firebase Functions Redeployment Checklist

## Pre-deployment Tasks
- [x] Dependencies configured in package.json
  * @google-cloud/bigquery: ^7.3.0
  * @google-cloud/functions-framework: ^3.3.0
  * firebase-admin: ^11.11.0
  * firebase-functions: ^4.5.0
  * google-auth-library: ^9.2.0
  * jsonwebtoken: ^9.0.2

- [ ] OAuth Configuration
  * JavaScript Origins:
    - Development: http://localhost:3000
    - Production: https://miguelai.web.app
  * Redirect URIs:
    - Development: http://localhost:5001/miguelai/us-central1/handleGoogleAuth
    - Production: https://us-central1-miguelai.cloudfunctions.net/handleGoogleAuth

- [ ] Environment Configuration
  * GOOGLE_OAUTH_CLIENT_ID
  * GOOGLE_OAUTH_CLIENT_SECRET
  * JWT_SECRET
  * FRONTEND_URL (development/production)
  * GCP_PROJECT_ID
  * BIGQUERY_DATASET
  * CORS_ORIGINS (JSON array of allowed origins)
  * NODE_ENV (development/production)
  * FUNCTION_REGION
  * GOOGLE_CLOUD_PROJECT

- [x] Security Improvements
  * CORS origin whitelisting implemented
  * Security headers configured
  * JWT expiration set to 24h
  * BigQuery query parameterization

## Deployment Steps
1. Environment Setup
   - [ ] Verify .env file in functions directory
   - [ ] Check all required env variables
   - [ ] Confirm BigQuery permissions

2. Function Deployment
   - [ ] Run `firebase deploy --only functions`
   - [ ] Note new function URLs
   - [ ] Update frontend configuration
   - [ ] Test endpoints

3. Function Verification
   - [ ] Test OAuth endpoint
   - [ ] Test subscription verification
   - [ ] Check BigQuery connectivity
   - [ ] Verify CORS settings

## Post-deployment Tasks
1. Update Configuration
   - [ ] Update client/.env with new function URL
   - [ ] Update documentation with new endpoints
   - [ ] Verify frontend can reach new endpoints

2. Testing
   - [ ] Test OAuth flow end-to-end
   - [ ] Verify BigQuery queries
   - [ ] Check error handling
   - [ ] Test rate limiting

3. Monitoring Setup
   - [ ] Enable Cloud Functions logging
   - [ ] Set up error alerts
   - [ ] Configure performance monitoring
   - [ ] Test logging output

## Function URLs
Previous URLs (expired):
- OAuth: [to be replaced]
- Verification: [to be replaced]

New URLs (after deployment):
- OAuth: [pending]
- Verification: [pending]

## Notes
- Using Firebase Functions free tier (2M invocations)
- Node.js 18 runtime
- Auto-scaling enabled
- Zero infrastructure cost

## Rollback Plan
1. If deployment fails:
   - Check Cloud Functions logs
   - Verify environment variables
   - Check IAM permissions
   - Revert to last known good configuration

2. If function issues:
   - Check error logs
   - Verify BigQuery connectivity
   - Test endpoints manually
   - Check CORS configuration
