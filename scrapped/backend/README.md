# LookerHelp Backend

Flask backend for LookerHelp providing authentication, payment processing, and user management.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required credentials:
     - Google OAuth credentials from Google Cloud Console
     - Stripe API keys from Stripe Dashboard
     - Generate a Flask secret key
     - Verify GCP service account credentials

3. Initialize BigQuery:
   - Ensure you have the GCP service account key file
   - The User model will automatically create the required table

4. Run the development server:
```bash
python src/app.py
```

## API Endpoints

### Authentication
- `POST /auth/google`: Google OAuth authentication
- `GET /auth/verify`: Verify JWT token
- `GET /auth/subscription`: Get user subscription status

### Stripe Integration
- `POST /stripe/webhook`: Handle Stripe webhook events
- `POST /stripe/create-checkout-session`: Create a Stripe checkout session

## Development

1. Set up Stripe webhook:
   - Use Stripe CLI for local testing:
     ```bash
     stripe listen --forward-to localhost:5000/stripe/webhook
     ```
   - Add the webhook secret to `.env`

2. Testing Google OAuth:
   - Set up OAuth consent screen in Google Cloud Console
   - Add authorized JavaScript origins
   - Add authorized redirect URIs

3. BigQuery Setup:
   - The users table will be created automatically
   - Verify the dataset exists in your GCP project
   - Ensure service account has necessary permissions
