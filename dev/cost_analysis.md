# LookerHelp Cost Analysis

## Free Tier Services

### Firebase Cloud Functions
- 2M invocations/month free
- 400,000 GB-seconds/month free
- 200,000 CPU-seconds/month free
- Perfect for our OAuth and verification endpoints
- Low usage: only during login and Slack verification

### Firebase Hosting
- 10GB storage free
- 360MB/day bandwidth free
- Free SSL certificates
- Global CDN included
- Perfect for our static CRA files

### BigQuery
- 10GB storage free
- 1TB query processing/month free
- Perfect for our user/subscription data
- Automated loads from GCS

### Cloud Storage
- 5GB storage free
- Perfect for Stripe data pipeline
- Native BigQuery integration

## Cost Optimization

1. Static Files (Firebase Hosting)
- CRA bundle typically < 1MB
- Well under free tier limits
- CDN reduces bandwidth usage

2. Authentication (Firebase Cloud Functions)
- OAuth endpoint: ~100KB per request
- JWT verification: minimal compute
- Estimated monthly invocations:
  * OAuth: ~1000 (new users/logins)
  * Verification: ~5000 (Slack checks)
- Well under 2M free invocations

3. Data Storage (BigQuery + GCS)
- User data: minimal size
- Subscription data: small records
- Stripe export: automated cleanup
- Well under free tier limits

## Monthly Cost Estimate
1. Firebase Cloud Functions: $0 (within free tier)
2. Firebase Hosting: $0 (within free tier)
3. BigQuery: $0 (within free tier)
4. Cloud Storage: $0 (within free tier)

Total Estimated Monthly Cost: $0

## Scaling Considerations
- Free tiers support hundreds of users
- Only need to consider paid tiers at significant scale
- Auto-scaling included at no extra cost
- Pay-as-you-grow model when exceeding free tiers
