# LookerHelp Implementation Steps

## 1. Infrastructure Setup

### Create Firebase Project
```bash
# Install Firebase CLI if not installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init
```

### Create BigQuery Tables
```sql
-- Create users table
CREATE TABLE `miguelai.lookerhelp.users` (
  email STRING,
  name STRING,
  picture STRING,
  created_at TIMESTAMP,
  last_login TIMESTAMP
);

-- Create subscriptions table
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

### Enable GCP APIs
Required APIs:
- Cloud Functions API
- BigQuery API
- Cloud Logging API
- Identity and Access Management (IAM) API

## 2. Frontend Setup

### Initialize CRA
```bash
# Create new React app
npx create-react-app client
cd client

# Install required dependencies
npm install @react-oauth/google firebase react-router-dom
```

### Configure Firebase Hosting
```bash
# In client directory
firebase init hosting
```

### Environment Variables
Create `.env` file in client directory:
```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=your_cloud_function_url
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_LIVE=https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL
REACT_APP_STRIPE_PAYMENT_LINK_MONTHLY_LIVE=https://buy.stripe.com/14kbKdcfTai85uo7su
REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_OFFICE=https://buy.stripe.com/7sIg0tbbP1LC8GA3cd
REACT_APP_STRIPE_PAYMENT_LINK_APP=https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE
```

## 3. Cloud Functions Setup

### Initialize Functions
```bash
mkdir functions && cd functions
npm init -g

# Install dependencies
npm install @google-cloud/functions-framework @google-cloud/bigquery google-auth-library jsonwebtoken
```

### OAuth Function Implementation
```javascript
// functions/auth/index.js
const {BigQuery} = require('@google-cloud/bigquery');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

const bigquery = new BigQuery();
const oauth2Client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

// CORS and security middleware
const setCorsAndSecurityHeaders = (req, res, next) => {
  // Allow from frontend origin and Slack
  res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Max-Age', '3600');
  
  // Security headers
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  next();
};

// Subscription verification function
exports.verifySubscription = async (req, res) => {
  // Apply CORS and security headers
  setCorsAndSecurityHeaders(req, res, () => {
  try {
    const {email} = req.body;
    
    // Query BigQuery for subscription status
    const query = `
      SELECT s.* 
      FROM \`miguelai.lookerhelp.subscriptions\` s
      WHERE s.email = @email
      AND s.status = 'active'
      AND s.ended_at IS NULL
      ORDER BY s.started_at DESC
      LIMIT 1
    `;
    
    const options = {
      query,
      params: {email}
    };
    
    const [rows] = await bigquery.query(options);
    
    // Return subscription status
    res.json({
      hasActiveSubscription: rows.length > 0,
      subscription: rows[0] || null
    });
  } catch (error) {
    console.error('Subscription verification error:', error);
    res.status(500).json({error: 'Verification failed'});
  }
};

exports.handleGoogleAuth = async (req, res) => {
  // Apply CORS and security headers
  setCorsAndSecurityHeaders(req, res, () => {
  try {
    const {code} = req.body;
    
    // Exchange code for tokens
    const {tokens} = await oauth2Client.getToken(code);
    
    // Verify ID token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID
    });
    
    const {email, name, picture} = ticket.getPayload();
    
    // Store user in BigQuery
    await bigquery
      .dataset('lookerhelp')
      .table('users')
      .insert([{
        email,
        name,
        picture,
        created_at: new Date(),
        last_login: new Date()
      }]);
    
    // Generate JWT
    const sessionToken = jwt.sign(
      {email, name, picture},
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
    );
    
    res.json({token: sessionToken, user: {email, name, picture}});
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({error: 'Authentication failed'});
  }
};
```

## 4. Testing Steps

1. Test BigQuery Tables
```sql
-- Test inserting user
INSERT INTO `miguelai.lookerhelp.users`
(email, name, picture, created_at, last_login)
VALUES
('test@example.com', 'Test User', 'https://example.com/pic.jpg', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

-- Verify user insertion
SELECT * FROM `miguelai.lookerhelp.users` LIMIT 1;
```

2. Test OAuth Flow
- Configure OAuth consent screen in Google Cloud Console
- Add authorized origins and redirect URIs
- Test login flow in development

3. Test Subscription Links
- Verify each Stripe payment link
- Test subscription status updates in BigQuery

## Deployment Commands

```bash
# Deploy frontend
cd client
npm run build
firebase deploy --only hosting

# Deploy functions
cd functions
firebase deploy --only functions

# Verify deployments
firebase open hosting:site
firebase functions:log
