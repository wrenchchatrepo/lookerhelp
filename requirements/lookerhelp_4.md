## 4. Set up Stripe Integration for Subscriptions

```bash
# Ensure config.py exists and contains the necessary Stripe API keys
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read Stripe API keys from config.py
STRIPE_PUBLISHABLE_KEY=$(python -c "import config; print(config.STRIPE_PUBLISHABLE_KEY)")
STRIPE_SECRET_KEY=$(python -c "import config; print(config.STRIPE_SECRET_KEY)")

# Create a Cloud Function for Stripe webhook handling
echo "Creating Cloud Function for Stripe webhook handling..."

mkdir -p cloud_functions/stripe_webhook
cd cloud_functions/stripe_webhook

# Create requirements.txt
cat << EOF > requirements.txt
stripe==2.60.0
google-cloud-bigquery==2.34.4
Flask==2.0.2
EOF

# Create main.py
cat << EOF > main.py
import os
import stripe
from google.cloud import bigquery
from flask import Flask, request, jsonify

app = Flask(__name__)

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
bigquery_client = bigquery.Client()

@app.route('/stripe-webhook', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.environ.get('STRIPE_WEBHOOK_SECRET')
        )
    except ValueError as e:
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        return 'Invalid signature', 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        handle_checkout_session(session)
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        handle_subscription_updated(subscription)
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        handle_subscription_deleted(subscription)

    return jsonify(success=True)

def handle_checkout_session(session):
    customer_id = session['customer']
    subscription_id = session['subscription']
    user_id = session['client_reference_id']  # Assuming you set this when creating the checkout session

    # Fetch subscription details
    subscription = stripe.Subscription.retrieve(subscription_id)
    status = subscription['status']

    # Update user in BigQuery
    query = f"""
    UPDATE `miguelai.lookerhelp_users.users`
    SET subscription_status = @status
    WHERE user_id = @user_id
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("status", "STRING", status),
            bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
        ]
    )
    bigquery_client.query(query, job_config=job_config).result()

def handle_subscription_updated(subscription):
    customer_id = subscription['customer']
    status = subscription['status']

    # Fetch user_id from BigQuery using customer_id
    query = f"""
    SELECT user_id FROM `miguelai.lookerhelp_users.users`
    WHERE stripe_customer_id = @customer_id
    LIMIT 1
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("customer_id", "STRING", customer_id),
        ]
    )
    results = bigquery_client.query(query, job_config=job_config).result()
    user_id = next(results).user_id if results.total_rows > 0 else None

    if user_id:
        # Update user subscription status
        update_query = f"""
        UPDATE `miguelai.lookerhelp_users.users`
        SET subscription_status = @status
        WHERE user_id = @user_id
        """
        update_job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("status", "STRING", status),
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
            ]
        )
        bigquery_client.query(update_query, job_config=update_job_config).result()

def handle_subscription_deleted(subscription):
    customer_id = subscription['customer']

    # Fetch user_id from BigQuery using customer_id
    query = f"""
    SELECT user_id FROM `miguelai.lookerhelp_users.users`
    WHERE stripe_customer_id = @customer_id
    LIMIT 1
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("customer_id", "STRING", customer_id),
        ]
    )
    results = bigquery_client.query(query, job_config=job_config).result()
    user_id = next(results).user_id if results.total_rows > 0 else None

    if user_id:
        # Update user subscription status to 'canceled'
        update_query = f"""
        UPDATE `miguelai.lookerhelp_users.users`
        SET subscription_status = 'subscriber'
        WHERE user_id = @user_id
        """
        update_job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
            ]
        )
        bigquery_client.query(update_query, job_config=update_job_config).result()

if __name__ == "__main__":
    app.run(port=8000)
EOF

# Deploy the Cloud Function
echo "Deploying Stripe webhook Cloud Function..."
gcloud functions deploy stripe_webhook \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
  --entry-point stripe_webhook

cd ../..

# Create a Cloud Function for creating Stripe Checkout sessions
echo "Creating Cloud Function for Stripe Checkout sessions..."

mkdir -p cloud_functions/create_checkout_session
cd cloud_functions/create_checkout_session

# Create requirements.txt
cat << EOF > requirements.txt
stripe==2.60.0
Flask==2.0.2
EOF

# Create main.py
cat << EOF > main.py
import os
import stripe
from flask import Flask, request, jsonify

app = Flask(__name__)

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price': 'price_1234567890',  # Replace with your actual price ID for $9.99/month
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url='https://lookerhelp.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='https://lookerhelp.com/cancel',
            client_reference_id=request.json['user_id'],  # Pass the user_id from your application
        )
        return jsonify({'id': checkout_session.id})
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == "__main__":
    app.run(port=8000)
EOF

# Deploy the Cloud Function
echo "Deploying Create Checkout Session Cloud Function..."
gcloud functions deploy create_checkout_session \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
  --entry-point create_checkout_session

cd ../..
```

### This script sets up Stripe integration for handling subscriptions. After running this script:

**1. A Cloud Function for handling Stripe webhooks will be deployed.**

**2. A Cloud Function for creating Stripe Checkout sessions will be deployed.**

**3. The webhook function will update user subscription status in BigQuery based on Stripe events.**

**4. The checkout session function will create a Stripe Checkout session for the $9.99/month subscription.**

### Next steps:

**1. Replace 'price_1234567890' in the create_checkout_session function with your actual Stripe Price ID for the $9.99/month subscription.**

**2. Set up a webhook in your Stripe account dashboard to point to the stripe_webhook Cloud Function URL.**

**3. Update the success_url and cancel_url in the create_checkout_session function to match your actual URLs.**

**4. Implement the frontend code to call the create_checkout_session function when a user wants to subscribe.**

**5. Test the entire subscription flow to ensure it's working correctly.**

**6. Implement proper error handling and logging in both Cloud Functions.**

**7. Secure the Cloud Functions appropriately for production use.**
