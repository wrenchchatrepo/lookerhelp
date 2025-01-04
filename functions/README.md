# LookerHelp Cloud Functions

This directory contains the serverless functions for LookerHelp's authentication and subscription verification.

## Functions

1. `handleGoogleAuth`
   - Handles server-side Google OAuth flow
   - Stores user data in BigQuery
   - Generates JWT for session management

2. `verifySubscription`
   - Verifies user's subscription status
   - Used by Slack integration
   - Queries BigQuery for active subscriptions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in required values

3. Deploy functions:
```bash
firebase deploy --only functions
```

4. Set up BigQuery tables:
   - Run `bigquery_setup.sql` in BigQuery console
   - Verify table creation with test data

## Environment Variables

Required environment variables:
```
GOOGLE_OAUTH_CLIENT_ID=      # Google OAuth client ID
GOOGLE_OAUTH_CLIENT_SECRET=  # Google OAuth client secret
JWT_SECRET=                  # Random string for JWT signing
FRONTEND_URL=               # Frontend URL (e.g., http://localhost:3000)
GCP_PROJECT_ID=miguelai     # GCP project ID
BIGQUERY_DATASET=lookerhelp # BigQuery dataset name
```

## Development

1. Local testing:
```bash
npm run serve
```

2. Deploy single function:
```bash
firebase deploy --only functions:handleGoogleAuth
```

## Security

- CORS configured for frontend origin
- Security headers implemented
- JWT used for session management
- BigQuery access controlled via IAM

## Monitoring

- Cloud Logging enabled
- Error tracking in place
- Performance monitoring via Cloud Functions dashboard

## BigQuery Schema

### Users Table
```sql
email STRING,
name STRING,
picture STRING,
created_at TIMESTAMP,
last_login TIMESTAMP
```

### Subscriptions Table
```sql
email STRING,
plan_type STRING,
status STRING,
started_at TIMESTAMP,
payment_link STRING,
stripe_customer_email STRING,
stripe_payment_status STRING,
ended_at TIMESTAMP
