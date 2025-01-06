# LookerHelp MVP

A single-page application for LookerHelp with Google OAuth authentication and Stripe payment integration.

## Architecture

- Frontend: Create React App (CRA)
- Authentication: Server-side Google OAuth flow
- Data Storage: BigQuery
- Hosting: Firebase Hosting
- Backend: Cloud Functions
- Payments: Stripe Payment Links

## Quick Start

1. Install Dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install Cloud Functions dependencies
cd ../functions
npm install
```

2. Environment Setup:
```bash
# Frontend (.env)
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=your_cloud_function_url
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_LIVE=https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL
REACT_APP_STRIPE_PAYMENT_LINK_MONTHLY_LIVE=https://buy.stripe.com/14kbKdcfTai85uo7su
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_OFFICE=https://buy.stripe.com/7sIg0tbbP1LC8GA3cd
REACT_APP_STRIPE_PAYMENT_LINK_APP=https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE

# Cloud Functions (.env)
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

3. Development:
```bash
# Start frontend
cd client
npm start

# Start Cloud Functions locally
cd functions
npm run serve
```

4. Deployment:
```bash
# Deploy frontend
cd client
npm run build
firebase deploy --only hosting

# Deploy functions
cd ../functions
firebase deploy --only functions
```

## Project Structure

```
lookerhelp/
├── client/                    # Frontend (CRA)
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── styles/          # CSS files
│   │   └── App.js           # Main app component
│   └── public/              # Static files
├── functions/                # Cloud Functions
│   ├── auth/                # Auth functions
│   └── bigquery_setup.sql   # BigQuery schema
```

## Features

1. Authentication
   - Server-side Google OAuth flow
   - JWT session management
   - User data stored in BigQuery

2. Subscription Management
   - Direct Stripe payment links
   - Subscription status tracking
   - BigQuery integration

3. Security
   - CORS configuration
   - Security headers
   - IAM roles and permissions

## Development Guide

1. Frontend Development
   - Components in `client/src/components`
   - Styles in `client/src/styles`
   - Environment variables in `client/.env`

2. Cloud Functions
   - Auth handlers in `functions/auth`
   - Environment variables in `functions/.env`
   - BigQuery setup in `functions/bigquery_setup.sql`

## Monitoring & Maintenance

1. Cloud Functions Dashboard
   - Monitor function execution
   - View logs and errors
   - Track performance

2. BigQuery Console
   - Query user data
   - Monitor subscription status
   - Run analytics

3. Firebase Hosting
   - View deployment status
   - Monitor CDN performance
   - SSL certificate management

## Troubleshooting

1. OAuth Issues
   - Verify credentials in Google Cloud Console
   - Check authorized domains
   - Validate redirect URIs

2. BigQuery Errors
   - Verify table schemas
   - Check IAM permissions
   - Validate query syntax

3. Deployment Issues
   - Check Firebase configuration
   - Verify environment variables
   - Review build logs

## Security Considerations

1. Authentication
   - Server-side OAuth flow
   - Secure JWT implementation
   - HTTP-only cookies

2. Data Storage
   - BigQuery IAM roles
   - Encrypted data at rest
   - Access logging

3. API Security
   - CORS configuration
   - Rate limiting
   - Security headers

## Deployment Checklist

1. Prerequisites
   - [ ] Google Cloud project setup
   - [ ] Firebase project created
   - [ ] Google OAuth credentials configured
   - [ ] BigQuery dataset created
   - [ ] Stripe payment links ready

2. Environment Configuration
   - [ ] Frontend .env file configured
   - [ ] Cloud Functions .env file configured
   - [ ] Firebase project settings updated
   - [ ] Google OAuth redirect URIs set

3. BigQuery Setup
   - [ ] Users table created
   - [ ] Subscriptions table created
   - [ ] Test data verified
   - [ ] IAM permissions configured

4. Frontend Deployment
   - [ ] Dependencies installed
   - [ ] Build successful
   - [ ] Firebase hosting configured
   - [ ] SSL certificate active

5. Backend Deployment
   - [ ] Dependencies installed
   - [ ] Cloud Functions deployed
   - [ ] Environment variables set
   - [ ] CORS configured

6. Testing
   - [ ] OAuth flow working
   - [ ] Subscription links accessible
   - [ ] BigQuery logging verified
   - [ ] Error handling tested

7. Monitoring
   - [ ] Cloud Logging enabled
   - [ ] Error reporting configured
   - [ ] Performance monitoring active
   - [ ] Billing alerts set

8. Documentation
   - [ ] API endpoints documented
   - [ ] Environment setup guide complete
   - [ ] Deployment process documented
   - [ ] Troubleshooting guide available
