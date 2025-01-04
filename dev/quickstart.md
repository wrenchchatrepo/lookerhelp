# LookerHelp MVP Quick Start Guide

## Prerequisites
1. GCP Project Access
2. Firebase CLI installed
3. Node.js and npm installed
4. Google OAuth credentials
5. Stripe payment links

## Step 1: Initial Setup (15 mins)
```bash
# Clone and setup project
mkdir lookerhelp && cd lookerhelp
git init

# Create client directory
npx create-react-app client
cd client
npm install @react-oauth/google firebase react-router-dom
```

## Step 2: Firebase Setup (10 mins)
```bash
# Initialize Firebase
firebase login
firebase init

# Select these options:
# - Hosting
# - Functions
# - Use existing project (select your GCP project)
```

## Step 3: BigQuery Setup (5 mins)
Run these queries in BigQuery console:
```sql
-- Users table
CREATE TABLE `miguelai.lookerhelp.users` (
  email STRING,
  name STRING,
  picture STRING,
  created_at TIMESTAMP,
  last_login TIMESTAMP
);

-- Subscriptions table
CREATE TABLE `miguelai.lookerhelp.subscriptions` (
  email STRING,
  plan_type STRING,
  status STRING,
  started_at TIMESTAMP,
  payment_link STRING,
  stripe_customer_email STRING,
  stripe_payment_status STRING,
  ended_at TIMESTAMP
);
```

## Step 4: Environment Setup (10 mins)

### Frontend (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=your_cloud_function_url
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_LIVE=https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL
REACT_APP_STRIPE_PAYMENT_LINK_MONTHLY_LIVE=https://buy.stripe.com/14kbKdcfTai85uo7su
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_OFFICE=https://buy.stripe.com/7sIg0tbbP1LC8GA3cd
REACT_APP_STRIPE_PAYMENT_LINK_APP=https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE
```

### Cloud Functions (.env)
```
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
JWT_SECRET=generate_a_secure_random_string
FRONTEND_URL=your_frontend_url
```

## Step 5: Implementation (1 hour)

1. Copy frontend components from `frontend_components.md`:
   - `src/components/Auth.js`
   - `src/components/Subscribe.js`
   - `src/App.js`
   - `src/styles/auth.css`
   - `src/styles/subscribe.css`

2. Copy Cloud Functions from `implementation_steps.md`:
   - `functions/auth/index.js`

## Step 6: Testing (30 mins)

1. Test OAuth Flow:
```bash
# Start frontend
cd client
npm start

# Start functions locally
cd functions
npm run serve
```

2. Test BigQuery:
```sql
-- Test query
SELECT * FROM `miguelai.lookerhelp.users` LIMIT 1;
```

## Step 7: Deployment (15 mins)

1. Deploy Frontend:
```bash
cd client
npm run build
firebase deploy --only hosting
```

2. Deploy Functions:
```bash
cd functions
firebase deploy --only functions
```

## Step 8: Verification (15 mins)

1. Test production OAuth flow
2. Verify BigQuery logging
3. Test Stripe payment links
4. Verify Cloud Logging

## Common Issues & Solutions

1. CORS Issues
   - Verify FRONTEND_URL in Cloud Functions
   - Check security headers

2. OAuth Errors
   - Verify credentials
   - Check authorized domains

3. BigQuery Errors
   - Verify service account permissions
   - Check table schemas

## Next Steps

1. Monitor Cloud Logging
2. Set up alerts for errors
3. Plan subscription tracking process
4. Document admin procedures

Total Setup Time: ~2 hours
