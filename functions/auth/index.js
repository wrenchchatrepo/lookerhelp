const {BigQuery} = require('@google-cloud/bigquery');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

// Initialize BigQuery with service account
const bigquery = new BigQuery({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY_PATH
});
const oauth2Client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

// CORS and security middleware
const setCorsAndSecurityHeaders = (req, res, next) => {
  const allowedOrigins = JSON.parse(process.env.CORS_ORIGINS || '["http://localhost:3000"]');
  const origin = req.headers.origin;
  
  // Only allow requests from whitelisted origins
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Max-Age', '3600');
  }
  
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

exports.handleGoogleAuth = async (req, res) => {
  // Apply CORS and security headers
  setCorsAndSecurityHeaders(req, res, async () => {
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
        process.env.GOOGLE_OAUTH_CLIENT_SECRET, // Using OAuth secret as JWT secret
        {expiresIn: '24h'}
      );
      
      res.json({token: sessionToken, user: {email, name, picture}});
    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).json({error: 'Authentication failed'});
    }
  });
};

exports.verifySubscription = async (req, res) => {
  // Apply CORS and security headers
  setCorsAndSecurityHeaders(req, res, async () => {
    try {
      const {email} = req.body;
      
      // Query BigQuery for subscription status
      const query = `
        WITH stripe_data AS (
          SELECT *
          FROM \`${process.env.GCP_BIGQUERY_DS}.stripe_subscriptions\`
          WHERE customer_email = @email
          AND status = 'active'
          AND current_period_end > CURRENT_TIMESTAMP()
        )
        SELECT 
          customer_email as email,
          subscription_id,
          plan_id,
          status,
          current_period_start as started_at,
          current_period_end as ends_at,
          payment_link_id
        FROM stripe_data
        ORDER BY current_period_start DESC
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
  });
};
