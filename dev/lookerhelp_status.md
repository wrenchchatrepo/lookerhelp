# LookerHelp MVP Status Update

## Deliverables & Completion Status

### Infrastructure Setup (0%)
- [ ] GCP Project Configuration
- [ ] Firebase Project Setup
- [ ] BigQuery Dataset (Created)
- [ ] BigQuery Tables (Pending)
- [ ] Cloud Logging Setup
- [ ] Cloud Billing Reports

### Frontend (0%)
- [ ] CRA Project Setup
- [ ] Single Page App Implementation
- [ ] Google Sign-in Integration
- [ ] Subscription Links Integration
- [ ] Styling & Responsive Design

### Backend (0%)
- [ ] Cloud Functions Implementation
- [ ] BigQuery Integration
- [ ] OAuth Flow
- [ ] Monitoring Setup

### Deployment (0%)
- [ ] Frontend Deployment
- [ ] Backend Deployment
- [ ] Domain & SSL Setup
- [ ] Integration Testing

## Cloud Functions Analysis

### Required Functions:

1. `handleGoogleAuth` (Main OAuth Function)
   - Purpose: Handle server-side Google OAuth flow
   - Triggers: HTTP request when user initiates login
   - Operations:
     * Exchange auth code for tokens
     * Verify Google ID token
     * Generate JWT
     * Store user in BigQuery
   - Estimated invocations: Low (only during user login)

2. `verifySubscription` (Subscription Verification)
   - Purpose: Verify user's subscription status for Slack access
   - Triggers: HTTP request from Slack
   - Operations:
     * Query BigQuery subscriptions table
     * Match user email with Stripe payment email
     * Return active/inactive status
   - Estimated invocations: Medium (each Slack interaction)
   - Note: No Stripe webhook needed as payment status comes from payment links

### BigQuery Tables Needed:

Note: Since we're using Stripe payment links without webhooks, subscription data will need to be manually updated in BigQuery through either:
- Stripe Dashboard exports
- Direct SQL updates
- Admin interface (future enhancement)

1. `users`
   ```sql
   CREATE TABLE `miguelai.lookerhelp.users` (
     email STRING,
     name STRING,
     picture STRING,
     created_at TIMESTAMP,
     last_login TIMESTAMP
   )
   ```

2. `subscriptions`
   ```sql
   CREATE TABLE `miguelai.lookerhelp.subscriptions` (
     email STRING,
     plan_type STRING,  -- 'weekly_live', 'monthly_live', 'weekly_office', 'app'
     status STRING,     -- 'active', 'cancelled'
     started_at TIMESTAMP,
     payment_link STRING,  -- Store which Stripe payment link was used
     stripe_customer_email STRING,  -- Email from Stripe payment
     stripe_payment_status STRING,  -- Status from Stripe
     ended_at TIMESTAMP
   )
   ```

## Context API vs Other State Management

React's Context API is ideal for this MVP because:

1. Lightweight Solution
   - No additional dependencies needed
   - Built into React
   - Perfect for simple global state (user auth status)

2. Simple Implementation
   ```javascript
   // Create context
   const AuthContext = React.createContext();

   // Provider component
   function AuthProvider({ children }) {
     const [user, setUser] = useState(null);
     return (
       <AuthContext.Provider value={{ user, setUser }}>
         {children}
       </AuthContext.Provider>
     );
   }

   // Usage in components
   function MyComponent() {
     const { user } = useContext(AuthContext);
   }
   ```

3. Why Not Redux/Others?
   - MVP has simple state requirements
   - Only tracking auth status and user info
   - No complex state interactions
   - No need for middleware or advanced features

## Hosting Cost Analysis

### Firebase Hosting (Recommended)
- Free Tier: 
  * 10GB/month storage
  * 360MB/day bandwidth
  * Free SSL certificate
- Paid Usage:
  * $0.026/GB stored/month
  * $0.15/GB transferred
- Benefits:
  * Built-in CDN
  * Easy deployment
  * Automatic SSL
  * Perfect for static files

### Cloud Functions
- Free Tier:
  * 2M invocations/month
  * 400,000 GB-seconds
  * 200,000 CPU-seconds
- Paid Usage:
  * $0.40/million invocations
  * $0.0000025/GB-second
  * $0.0000100/CPU-second
- Used For:
  * Only OAuth and subscription verification
  * Low frequency operations
  * No static file serving

### Cost-Effective Architecture
1. Static Files (CRA Build):
   - Deploy to Firebase Hosting
   - Benefit from CDN
   - Minimal storage needs

2. Backend Operations:
   - Use Cloud Functions only for auth & verification
   - Estimated monthly cost < $1 for expected traffic
   - No need for constant running server

3. BigQuery Usage:
   - Free tier: 10GB storage, 1TB query/month
   - Minimal data storage needs
   - Infrequent queries

This architecture provides the most cost-effective solution while maintaining scalability and performance.

## Immediate Next Steps (Tonight)

1. Infrastructure Setup
   - [ ] Create Firebase project
   - [ ] Create BigQuery tables
   - [ ] Enable required GCP APIs
   - [ ] Set up Cloud Logging

2. Frontend Kickoff
   - [ ] Initialize CRA project
   - [ ] Set up Firebase Hosting
   - [ ] Configure environment variables

3. Backend Setup
   - [ ] Create Cloud Functions project
   - [ ] Implement OAuth function
   - [ ] Set up BigQuery connection

4. Development Tasks
   - [ ] Implement Auth component
   - [ ] Add subscription links
   - [ ] Test OAuth flow
   - [ ] Verify BigQuery operations

Let's get this done! 💪
