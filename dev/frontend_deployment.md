# Frontend Deployment Checklist

## Pre-deployment Tasks
- [x] Firebase project initialized
- [x] firebase.json configured
- [x] CRA components ready
- [-] Firebase Functions
  * Previous deployment expired
  * Awaiting new function deployment
  * Will need new function URL
- [ ] Environment variables setup
  * REACT_APP_API_URL (pending new function URL)
  * REACT_APP_GOOGLE_CLIENT_ID (to be verified)
  * Stripe payment links configured

## Build Process
1. Environment Setup
   - [ ] Create client/.env from .env.example
   - [ ] Set REACT_APP_API_URL to Firebase Function URL
   - [ ] Verify Google OAuth client ID
   - [ ] Confirm all env variables are set

2. Build Steps
   - [ ] Run `npm install` to ensure dependencies
   - [ ] Run `npm run build` to create production build
   - [ ] Verify build output in client/build/

3. Deployment Steps
   - [ ] Run `firebase deploy --only hosting`
   - [ ] Verify deployment success
   - [ ] Check deployed URL
   - [ ] Test OAuth flow
   - [ ] Verify subscription links

## Post-deployment Tasks
1. Domain Setup
   - [ ] Configure custom domain in Firebase Console
   - [ ] Set up DNS records
   - [ ] Verify SSL certificate provisioning

2. Testing
   - [ ] Test OAuth login flow
   - [ ] Verify API connectivity
   - [ ] Check subscription flow
   - [ ] Test responsive design
   - [ ] Verify security headers

3. Monitoring
   - [ ] Set up Firebase Hosting monitoring
   - [ ] Configure error reporting
   - [ ] Set up performance monitoring
   - [ ] Enable Firebase Analytics

## Rollback Plan
1. If deployment fails:
   - Run `firebase hosting:clone [version]`
   - Verify previous version is restored
   - Check logs for issues

2. If OAuth issues:
   - Verify environment variables
   - Check Firebase Function logs
   - Confirm Google OAuth configuration

3. If performance issues:
   - Check Firebase Hosting metrics
   - Verify CDN configuration
   - Review caching headers

## Notes
- Using Firebase Hosting free tier (10GB storage)
- CDN and SSL included
- Auto-scaling enabled
- Zero infrastructure cost
