# LookerHelp MVP Development Plan

## Overview
A clean, focused implementation of LookerHelp's core features: a Create React App (CRA) Single Page Application with server-side Google OAuth authentication flow and Stripe payment links integration. The application tracks subscribers and payments in BigQuery for Slack integration verification.

## Project Structure
```
lookerhelp/
├── client/                    # CRA Frontend
│   ├── public/
│   └── src/
│       ├── components/        # React components
│       │   ├── Auth.js       # Google OAuth component
│       │   └── App.js        # Main SPA component
│       ├── context/
│       │   └── AuthContext.js # Authentication state
│       ├── styles/           # CSS files
│       └── utils/            # Helper functions
├── functions/                 # Cloud Functions
│   └── auth/
│       ├── index.js          # OAuth handler function
│       └── utils/
│           └── bigquery.js   # BigQuery operations
├── firebase.json             # Firebase configuration
└── .env                      # Environment variables
```

## Core Features

### 1. Google OAuth Authentication (Server-Side Flow)
- Implementation based on lookerhelp_google_oauth_req.md
- Server-side OAuth flow for enhanced security
- JWT-based session management
- Secure user authentication state
- BigQuery integration for user tracking

### 2. Subscription Plans
Direct Stripe payment links for each tier:
- Weekly Live Support: https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL
- Monthly Live Support: https://buy.stripe.com/14kbKdcfTai85uo7su
- Weekly Office Hours: https://buy.stripe.com/7sIg0tbbP1LC8GA3cd
- App Access: https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE

## Implementation Timeline

### Day 1: GCP & Project Setup
- [ ] GCP Configuration:
  - [ ] Enable required APIs (Cloud Functions, BigQuery, Logging)
  - [ ] Setup IAM roles and service account
  - [ ] Configure BigQuery dataset and tables
  - [ ] Enable Cloud Logging and Billing reports
- [ ] Initialize new CRA project
- [ ] Setup Firebase project
- [ ] Configure environment variables

### Day 2: Authentication & BigQuery
- [ ] Implement server-side Google OAuth flow in Cloud Function
- [ ] Setup BigQuery tables for user tracking:
  - [ ] Users table (auth status, email)
  - [ ] Subscriptions table (plan type, status)
  - [ ] Payments table (subscription details)
- [ ] Create AuthContext for frontend state
- [ ] Test OAuth flow and data storage

### Day 3: Frontend Core
- [ ] Single Page App implementation:
  - [ ] Main landing page
  - [ ] Google Sign-in integration
  - [ ] Subscription link buttons
- [ ] Style implementation using brand colors
- [ ] Responsive design testing

### Day 4: Integration & Testing
- [ ] Connect frontend with OAuth Cloud Function
- [ ] Implement Stripe payment link redirects
- [ ] Setup Cloud Logging
- [ ] Test user flows:
  - [ ] Authentication
  - [ ] Subscription process
  - [ ] BigQuery data validation
- [ ] Verify Slack integration

### Day 5: Deployment & Verification
- [ ] Deploy frontend to Firebase Hosting
- [ ] Deploy Cloud Functions
- [ ] Configure custom domain and SSL
- [ ] End-to-end testing in production
- [ ] Verify monitoring and logging
- [ ] Document deployment process

## Technical Specifications

### Frontend (CRA)
- React with hooks
- Context API for state management
- CSS modules for styling
- Responsive design

### Backend Services
1. Authentication (Cloud Functions)
   - Server-side OAuth flow implementation
   - JWT token generation and validation
   - Deployed as HTTP-triggered function

2. Data Storage (BigQuery)
   - Track authenticated users
   - Store subscription status
   - Record payment information
   - Enable Slack user verification

3. Monitoring
   - Cloud Logging for all API calls
   - Cloud Billing reports enabled
   - Slack integration verification

### Authentication Flow
1. User clicks "Login with Google"
2. Google OAuth consent screen
3. OAuth callback handling
4. JWT token generation
5. Frontend state update

### Environment Variables
```
# GCP Configuration
GCP_PROJECT_ID=miguelai
GCP_BIGQUERY_DS=miguelai.lookerhelp
GCP_SERVICE_ACCOUNT_KEY_PATH=/path/to/service-account-key.json

# OAuth Configuration
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=

# JWT Configuration
JWT_SECRET=

# Frontend Configuration
REACT_APP_API_URL=
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_LIVE=https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL
REACT_APP_STRIPE_PAYMENT_LINK_MONTHLY_LIVE=https://buy.stripe.com/14kbKdcfTai85uo7su
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_OFFICE=https://buy.stripe.com/7sIg0tbbP1LC8GA3cd
REACT_APP_STRIPE_PAYMENT_LINK_APP=https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE

# Monitoring
GOOGLE_ANALYTICS_PROPERTY_ID=446440745
```

## Notes
- BigQuery used for tracking users, subscriptions, and payments
- Server-side Google OAuth flow for secure authentication
- Direct Stripe payment links (no Stripe API integration needed)
- Cloud Functions for OAuth handling and BigQuery operations
- Cloud Logging enabled for all API calls
- Slack integration verification through BigQuery user data
- Focus on essential MVP features with clean architecture

## Questions for Discussion
1. Confirm if any additional features are needed for MVP
2. Verify if the authentication flow meets requirements
3. Discuss any specific UI/UX preferences
4. Confirm deployment strategy and hosting requirements

## Deployment Strategy
### Frontend (Static Hosting)
Note: CRA is a static site generator - the build output is static files that should be served from static hosting, not Cloud Run or Cloud Functions.

- Deploy CRA build to Firebase Hosting
  * Run `npm run build` to generate static files
  * Deploy static files to Firebase Hosting
  * More cost-effective than Cloud Run/Functions for static content
- Configure custom domain
- Setup SSL certificate

### Backend Services
1. Cloud Functions (for OAuth endpoint only)
   - Deploy OAuth handler
   - Configure region (us-central1)
   - Setup IAM roles and permissions
   - Environment variables configuration

2. BigQuery
   - Setup dataset: miguelai.lookerhelp
   - Create tables for users and payments
   - Configure access permissions

3. Monitoring & Integration
   - Enable Cloud Logging for all APIs
   - Setup Cloud Billing reports
   - Verify Slack integration functionality

## Next Steps
1. Review and approve MVP plan
2. Set up GCP project and services:
   - Enable required APIs
   - Configure IAM roles
   - Setup BigQuery dataset
   - Enable Cloud Logging
   - Configure billing reports
3. Begin implementation following timeline
4. Regular progress reviews and adjustments as needed
