# LookerHelp Development Tasks

## 1. Frontend (CRA SPA)
```
A. Core Pages
   - Landing page with visitor access
     - On continuos scrolling page experience
   - Top Nav Menu (#19171A):
     - Buttons LtR: LookerHelp (index), Pricing, Booking, Legal, [Sign in with Google](https://www.npmjs.com/package/@react-oauth/google)  
   - Pricing page with Stripe payment links
     - we have 4 products so we need all four in on row if the user's screen fits them
   - Legal/Terms/Privacy pages
   - Booking page with Calendar integration
   - Guide page (protected)

B. Authentication
   - Google OAuth flow
   - User levels: Visitor -> Subscriber -> Looker
   - Protected routes & redirects
   - Session management

C. Components
   - Navigation/header with user state
   - Subscription status indicator
   - Calendar booking widget
   - Payment link buttons
```

## 2. Firebase Functions
```
A. OAuth Handler
   - Server-side Google auth
   - JWT session tokens
   - User storage in BigQuery

B. User Verification
   - Session validation
   - Profile data retrieval
   - Access level checks

C. Subscription Checker
   - BigQuery subscription queries
   - Stripe status verification
   - Slack access control

D. Slack Verifier
   - Workspace member validation
   - Subscription tier checks
   - Lookernomicon access control
```

## 3. Slack Integration
```
A. Slack App
   - App manifest/config
   - Member join workflow
   - Channel access control

B. Lookernomicon Access
   - Subscription verification
   - User tier management
   - Access revocation
```

## 4. Stripe Setup
```
A. Payment Links
   - Weekly Live Support ($999/week)
   - Monthly Live Support ($3999/month)
   - Weekly Office Hours ($499/month)
   - Lookernomicon Access ($29/month)

B. Cloud Storage
   - Bucket configuration
   - Stripe data exports
   - Access controls
```

## Post-Launch: Data Pipeline
```
A. BigQuery ETL
   - Transfer job setup
   - Schema management
   - Data validation

B. Subscriber Management
   - Usage analytics
   - Subscription metrics
   - Customer insights
```

Each section follows lean serverless architecture:
- Frontend: Static files on Firebase Hosting
- Backend: Minimal Cloud Functions
- Data: BigQuery + Cloud Storage
- Integrations: Stripe payment links + Slack app
