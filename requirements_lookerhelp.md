## MVP Definition

The Minimum Viable Product (MVP) for LookerHelp consists of:

1. Fully functioning AI agent (Lookernomicon) using available data stores through Slack (already implemented)
2. Quality content valuable to Looker power users and developers
3. Clean, simple, intuitive UX
4. Streamlined payment process for users

### Core Features:
1. User Authentication and Access Control:
   - Visitor: Access to main site with value proposition and sample docs/scripts
   - Subscriber: Full access to docs.lookerhelp.com and scripts.lookerhelp.com
   - Looker (paid): Access to Lookernomicon Slack workspace and AI agent

2. Content Management:
   - GitBook integration for documentation and scripts
   - Basic SEO implementation

3. Payment Integration:
   - Stripe integration for $9.99/month subscription
   - Rate Limits Apply

4. Slack Integration:
   - Lookernomicon AI agent accessible through Slack for paid users
   - Daily user validation to ensure only paid users have access

5. Basic Analytics and Monitoring:
   - Google Analytics setup
   - Essential Cloud Monitoring

### Out of Scope for MVP:
- Advanced analytics features
- Complex customizations of the AI agent
- Extensive marketing automation
- Advanced user management features beyond the three-tier system

This MVP focuses on delivering the core value proposition of LookerHelp: providing high-quality Looker documentation, scripts, and AI-assisted support to users, with a clear path from free to paid tiers.

## 1. Set up GitBook Spaces

```bash
# Ensure config.py exists and contains the necessary GitBook API token
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read GitBook API token from config.py
GITBOOK_API_TOKEN=$(python -c "import config; print(config.GITBOOK_API_TOKEN)")

# Function to create a GitBook space
create_gitbook_space() {
    local name=$1
    local visibility=$2
    
    response=$(curl -X POST "https://api.gitbook.com/v1/spaces" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "'"$name"'",
        "visibility": "'"$visibility"'"
      }')
    
    echo $response | jq -r '.id'
}

# Create main LookerHelp space
MAIN_SPACE_ID=$(create_gitbook_space "LookerHelp" "public")
echo "Main Space ID: $MAIN_SPACE_ID"

# Create docs subdomain space
DOCS_SPACE_ID=$(create_gitbook_space "LookerHelp Docs" "public")
echo "Docs Space ID: $DOCS_SPACE_ID"

# Create scripts subdomain space
SCRIPTS_SPACE_ID=$(create_gitbook_space "LookerHelp Scripts" "public")
echo "Scripts Space ID: $SCRIPTS_SPACE_ID"

# Note: Custom domain setup must be done manually in the GitBook UI
echo "Remember to set up custom domains for each space in the GitBook UI"
```
### This script uses the GitBook API to create the necessary spaces for LookerHelp. After running this script:
**1. You'll have three GitBook spaces created: main site, docs, and scripts.**
**2. The space IDs will be printed, which you should save for future use.**
**3. Custom domain setup still needs to be done manually in the GitBook UI.**

### Next steps:
**1. Replace your_gitbook_api_token with your actual GitBook API token.**
**2. Run this script to create the spaces.**
**3. Save the returned space IDs for use in future API calls.**
**4. Manually set up custom domains in the GitBook UI for each space.**


## 2. Set up Initial Content Structure in GitBook

```bash
# Function to create a page in a GitBook space
create_page() {
    local space_id=$1
    local title=$2
    local content=$3
    
    curl -X POST "https://api.gitbook.com/v1/spaces/$space_id/content" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"$title\",
        \"type\": \"page\",
        \"content\": \"$content\"
      }"
}

# Set up main LookerHelp space content
echo "Setting up main LookerHelp space content..."

create_page $MAIN_SPACE_ID "Welcome to LookerHelp" "# Welcome to LookerHelp\n\nYour comprehensive resource for Looker expertise."
create_page $MAIN_SPACE_ID "About" "# About LookerHelp\n\nLearn about our mission and team."
create_page $MAIN_SPACE_ID "Pricing" "# Pricing\n\nExplore our subscription options."
create_page $MAIN_SPACE_ID "Contact" "# Contact Us\n\nGet in touch with our team."

# Set up Docs space content
echo "Setting up Docs space content..."

create_page $DOCS_SPACE_ID "Looker Documentation" "# Looker Documentation\n\nComprehensive guides and tutorials for Looker."
create_page $DOCS_SPACE_ID "Getting Started" "# Getting Started with Looker\n\nYour first steps in the Looker ecosystem."
create_page $DOCS_SPACE_ID "Advanced Topics" "# Advanced Looker Topics\n\nDeep dives into complex Looker concepts."

# Set up Scripts space content
echo "Setting up Scripts space content..."

create_page $SCRIPTS_SPACE_ID "Looker Scripts" "# Looker Scripts\n\nA collection of useful scripts for Looker professionals."
create_page $SCRIPTS_SPACE_ID "LookML Scripts" "# LookML Scripts\n\nScripts for working with LookML."
create_page $SCRIPTS_SPACE_ID "Data Analysis Scripts" "# Data Analysis Scripts\n\nScripts for advanced data analysis in Looker."

# Update space metadata
update_space_metadata() {
    local space_id=$1
    local description=$2
    
    curl -X PATCH "https://api.gitbook.com/v1/spaces/$space_id" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"description\": \"$description\"
      }"
}

update_space_metadata $MAIN_SPACE_ID "Your comprehensive resource for Looker expertise"
update_space_metadata $DOCS_SPACE_ID "In-depth Looker documentation and tutorials"
update_space_metadata $SCRIPTS_SPACE_ID "A curated collection of useful Looker scripts"
```
### This script sets up the basic content structure for your GitBook spaces. After running this script:
**1. The main LookerHelp space will have Welcome, About, Pricing, and Contact pages.**
**2. The Docs space will have a main documentation page, Getting Started, and Advanced Topics pages.**
**3. The Scripts space will have a main scripts page, LookML Scripts, and Data Analysis Scripts pages.**
**4. Each space will have an updated description.**

### Next steps:
**1. Review the created content in the GitBook web interface.**
**2. Customize and expand the content for each page as needed.**
**3. Set up the navigation structure for each space in the GitBook web interface.**
**4. Consider adding more pages and structure as your content grows.**

## 3. Set up User Management System in BigQuery

# Ensure config.py exists and contains the necessary GCP project ID
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read GCP project ID from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")

# Create BigQuery dataset
echo "Creating BigQuery dataset..."
bq mk --dataset \
  --description "LookerHelp user management dataset" \
  --label=project:lookerhelp \
  $PROJECT_ID:lookerhelp_users

# Create users table
echo "Creating users table..."
bq query --use_legacy_sql=false \
"CREATE TABLE IF NOT EXISTS $PROJECT_ID.lookerhelp_users.users
(
  user_id STRING,
  email STRING,
  created_at TIMESTAMP,
  subscription_status STRING,
  last_login TIMESTAMP
)
PARTITION BY DATE(created_at)
CLUSTER BY subscription_status"

# Create a Cloud Function for user operations
echo "Creating Cloud Function for user operations..."

# Create a new directory for the Cloud Function
mkdir -p cloud_functions/user_management
cd cloud_functions/user_management

# Create requirements.txt
cat << EOF > requirements.txt
google-cloud-bigquery==2.34.4
Flask==2.0.2
EOF

# Create main.py
cat << EOF > main.py
from google.cloud import bigquery
from flask import jsonify

client = bigquery.Client()
dataset_id = "lookerhelp_users"
table_id = "users"

def upsert_user(request):
    request_json = request.get_json(silent=True)
    user_id = request_json['user_id']
    email = request_json['email']
    subscription_status = request_json.get('subscription_status', 'visitor')

    query = f"""
    MERGE {dataset_id}.{table_id} AS T
    USING (SELECT @user_id AS user_id, @email AS email, @subscription_status AS subscription_status) AS S
    ON T.user_id = S.user_id
    WHEN MATCHED THEN
      UPDATE SET email = S.email, subscription_status = S.subscription_status, last_login = CURRENT_TIMESTAMP()
    WHEN NOT MATCHED THEN
      INSERT (user_id, email, created_at, subscription_status, last_login)
      VALUES(S.user_id, S.email, CURRENT_TIMESTAMP(), S.subscription_status, CURRENT_TIMESTAMP())
    """

    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
            bigquery.ScalarQueryParameter("email", "STRING", email),
            bigquery.ScalarQueryParameter("subscription_status", "STRING", subscription_status),
        ]
    )

    query_job = client.query(query, job_config=job_config)
    query_job.result()

    return jsonify({"message": "User upserted successfully"}), 200

def get_user(request):
    request_json = request.get_json(silent=True)
    user_id = request_json['user_id']

    query = f"SELECT * FROM {dataset_id}.{table_id} WHERE user_id = @user_id"
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
        ]
    )

    query_job = client.query(query, job_config=job_config)
    results = query_job.result()

    for row in results:
        return jsonify({
            "user_id": row.user_id,
            "email": row.email,
            "created_at": row.created_at.isoformat(),
            "subscription_status": row.subscription_status,
            "last_login": row.last_login.isoformat() if row.last_login else None
        }), 200

    return jsonify({"message": "User not found"}), 404
EOF

# Deploy the Cloud Function
echo "Deploying Cloud Function..."
gcloud functions deploy user_management \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point upsert_user

gcloud functions deploy get_user \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point get_user

cd ../..
```
### This script sets up a user management system in BigQuery and deploys Cloud Functions for user operations. After running this script:
**1. A BigQuery dataset named 'lookerhelp_users' will be created.**
**2. A 'users' table will be created in the dataset with fields for user_id, email, created_at, subscription_status, and last_login.**
**3. Two Cloud Functions will be deployed: 'user_management' for creating/updating users, and 'get_user' for retrieving user information.**

### Next steps:
**1. Test the Cloud Functions to ensure they're working correctly.**
**2. Integrate these functions with your authentication flow (e.g., after Google Sign-In).**
**3. Implement proper error handling and logging in the Cloud Functions.**
**4. Secure the Cloud Functions appropriately for production use.**
**5. Consider adding more user management functions as needed (e.g., delete user, update subscription).**

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

## 5. Set up Slack Integration for Lookernomicon AI Agent

```bash
# Ensure the .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please create it with the necessary credentials."
    exit 1
fi

# Ensure the config.py file exists
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Create a Cloud Function for Slack event handling
echo "Creating Cloud Function for Slack event handling..."

mkdir -p cloud_functions/slack_bot
cd cloud_functions/slack_bot

# Create requirements.txt
cat << EOF > requirements.txt
slack-bolt==1.14.3
google-cloud-bigquery==2.34.4
python-dotenv==0.19.0
EOF

# Create main.py
cat << EOF > main.py
import os
from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.flask import SlackRequestHandler
from google.cloud import bigquery
from flask import Flask, request
import config

# Load environment variables
load_dotenv()

# Initialize Slack app
app = App(
    token=config.SLACK_BOT_TOKEN,
    signing_secret=config.SLACK_SIGNING_SECRET
)

# Initialize Flask app
flask_app = Flask(__name__)
handler = SlackRequestHandler(app)

# Initialize BigQuery client
bigquery_client = bigquery.Client()

@app.event("app_mention")
def handle_mention(event, say):
    user_id = event['user']
    
    # Check user subscription status
    query = f"""
    SELECT subscription_status FROM `{config.PROJECT_ID}.lookerhelp_users.users`
    WHERE user_id = @user_id
    LIMIT 1
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
        ]
    )
    results = bigquery_client.query(query, job_config=job_config).result()
    user = next(results) if results.total_rows > 0 else None

    if not user or user.subscription_status != 'looker':
        say("I'm sorry, but you need to have an active paid subscription to use this feature. Please visit https://lookerhelp.com/pricing for more information.")
        return

    # Process the message (in this case, we're just echoing it back)
    message = event['text']
    say(f"You said: {message}")

@flask_app.route("/slack/events", methods=["POST"])
def slack_events():
    return handler.handle(request)

if __name__ == "__main__":
    flask_app.run(port=8000)
EOF

# Deploy the Cloud Function
echo "Deploying Slack bot Cloud Function..."
gcloud functions deploy slack_bot \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars SLACK_BOT_TOKEN=$(python -c "import config; print(config.SLACK_BOT_TOKEN)"),SLACK_SIGNING_SECRET=$(python -c "import config; print(config.SLACK_SIGNING_SECRET)") \
  --entry-point slack_events

cd ../..

# Create a Cloud Function for daily Slack user validation
echo "Creating Cloud Function for daily Slack user validation..."

mkdir -p cloud_functions/slack_user_validation
cd cloud_functions/slack_user_validation

# Create requirements.txt
cat << EOF > requirements.txt
google-cloud-bigquery==2.34.4
slack_sdk==3.11.2
python-dotenv==0.19.0
EOF

# Create main.py
cat << EOF > main.py
import os
from dotenv import load_dotenv
from google.cloud import bigquery
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
import config

# Load environment variables
load_dotenv()

def validate_slack_users(event, context):
    # Initialize BigQuery Client
    bq_client = bigquery.Client()

    # Initialize Slack Client
    slack_client = WebClient(token=config.SLACK_BOT_TOKEN)

    # Query to get all paid users
    query = f"""
    SELECT user_id
    FROM `{config.PROJECT_ID}.lookerhelp_users.users`
    WHERE subscription_status = 'looker'
    """
    
    query_job = bq_client.query(query)
    valid_users = set([row['user_id'] for row in query_job])

    # Get all users in the Slack workspace
    try:
        result = slack_client.users_list()
        slack_users = result["members"]
    except SlackApiError as e:
        print(f"Error fetching Slack users: {e}")
        return

    for user in slack_users:
        if not user['is_bot'] and user['id'] not in valid_users:
            try:
                # Remove user from workspace
                slack_client.conversations_kick(
                    channel=config.SLACK_CHANNEL_ID,
                    user=user['id']
                )
                print(f"Removed user {user['id']} from Slack channel")
            except SlackApiError as e:
                print(f"Error removing user {user['id']}: {e}")

    print("Slack user validation complete")

EOF

# Deploy the Cloud Function
echo "Deploying Slack user validation Cloud Function..."
gcloud functions deploy slack_user_validation \
  --runtime python39 \
  --trigger-topic daily-slack-validation \
  --set-env-vars SLACK_BOT_TOKEN=$(python -c "import config; print(config.SLACK_BOT_TOKEN)"),SLACK_CHANNEL_ID=$(python -c "import config; print(config.SLACK_CHANNEL_ID)")

# Set up Cloud Scheduler job to run the validation daily
echo "Setting up Cloud Scheduler job for daily Slack user validation..."
gcloud scheduler jobs create pubsub daily-slack-validation \
    --schedule "0 0 * * *" \
    --topic daily-slack-validation \
    --message-body "Run daily Slack user validation"

cd ../..


### This script sets up the Slack integration for the Lookernomicon AI Agent and a daily user validation process. After running this script:
**1. The script will check for the existence of both .env and config.py files.**
**2. Cloud Functions will be deployed using configuration from config.py.**
**3. The Slack bot will check user subscription status before responding.**
**4. A daily Slack user validation process will be set up.**

### Next steps:
**1. Ensure your config.py file contains the following variables:**
   **- SLACK_BOT_TOKEN = "xoxb-your-bot-token"**
   **- SLACK_SIGNING_SECRET = "your-signing-secret"**
   **- SLACK_CHANNEL_ID = "your-channel-id"**
   **- PROJECT_ID = "miguelai"**
**2. Replace the placeholder values in config.py with your actual credentials and IDs.**
**3. Set up your Slack app in the Slack API website as described in previous steps.**
**4. Install the Slack app to your workspace.**
**5. Test the Slack bot by mentioning it in the Lookernomicon channel.**
**6. Monitor the daily user validation process to ensure it's working correctly.**
**7. Implement proper error handling and logging in both Cloud Functions.**
**8. Secure the Cloud Functions appropriately for production use.**
**9. Consider implementing rate limiting to prevent abuse of the Lookernomicon AI Agent.**

## 6. Set up Cloud Logging for All Active APIs

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read project ID from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")

# 6.1. Enable Cloud Logging API
echo "Enabling Cloud Logging API..."
gcloud services enable logging.googleapis.com

# 6.2. Create a custom log bucket (optional, but recommended for better organization)
echo "Creating custom log bucket..."
gcloud logging buckets create lookerhelp-logs \
    --location=global \
    --retention-days=30 \
    --description="Logs for LookerHelp APIs and services"

# 6.3. Update existing Cloud Functions to use structured logging

# Function to update Cloud Function with structured logging
update_function_logging() {
    local function_name=$1
    local function_dir=$2

    echo "Updating $function_name with structured logging..."
    
    # Backup existing main.py
    cp $function_dir/main.py $function_dir/main.py.bak
    
    # Add logging import and setup to main.py
    sed -i '1i import logging\nimport google.cloud.logging\nfrom google.cloud.logging.handlers import CloudLoggingHandler\n' $function_dir/main.py
    
    # Add logging setup after imports
    sed -i '/^import/a \
# Setup Cloud Logging\
client = google.cloud.logging.Client()\
handler = CloudLoggingHandler(client)\
cloud_logger = logging.getLogger('"$function_name"')\
cloud_logger.setLevel(logging.INFO)\
cloud_logger.addHandler(handler)\
    ' $function_dir/main.py
    
    # Add logging to requirements.txt if not already present
    if ! grep -q "google-cloud-logging" $function_dir/requirements.txt; then
        echo "google-cloud-logging==2.6.0" >> $function_dir/requirements.txt
    fi
    
    # Redeploy the updated function
    gcloud functions deploy $function_name \
        --source $function_dir \
        --runtime python39 \
        --trigger-http \
        --allow-unauthenticated
}

# Update existing Cloud Functions
update_function_logging "user_management" "cloud_functions/user_management"
update_function_logging "stripe_webhook" "cloud_functions/stripe_webhook"
update_function_logging "create_checkout_session" "cloud_functions/create_checkout_session"
update_function_logging "slack_bot" "cloud_functions/slack_bot"

echo "Cloud Logging setup complete for all active APIs."
```
### This script sets up Cloud Logging for all active APIs and updates existing Cloud Functions to use structured logging. After running this script:
**1. Cloud Logging API will be enabled for your project.**
**2. A custom log bucket will be created for better log organization.**
**3. All existing Cloud Functions will be updated to use structured logging.**
**4. Cloud Functions will be redeployed with the logging changes.**

### Next steps:
**1. Verify that logs are being correctly sent to Cloud Logging for each function.**
**2. Set up log-based metrics and alerts in Google Cloud Console to monitor your application's health and performance.**
**3. Consider setting up log exports to BigQuery for long-term storage and analysis if needed.**
**4. Implement more detailed logging in your application code to capture important events and errors.**

## 7. Set up GitBook to LinkedIn Content Sharing

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read necessary values from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")
LINKEDIN_ACCESS_TOKEN=$(python -c "import config; print(config.LINKEDIN_ACCESS_TOKEN)")
LINKEDIN_COMPANY_ID=$(python -c "import config; print(config.LINKEDIN_COMPANY_ID)")
GITBOOK_WEBHOOK_SECRET=$(python -c "import config; print(config.GITBOOK_WEBHOOK_SECRET)")

# Create a Cloud Function for GitBook webhook handling and LinkedIn posting
echo "Creating Cloud Function for GitBook to LinkedIn content sharing..."

mkdir -p cloud_functions/gitbook_to_linkedin
cd cloud_functions/gitbook_to_linkedin

# Create requirements.txt
cat << EOF > requirements.txt
Flask==2.0.2
requests==2.26.0
google-cloud-secret-manager==2.8.0
EOF

# Create main.py
cat << EOF > main.py
import os
import json
import requests
from flask import Flask, request
import hmac
import hashlib
import config

app = Flask(__name__)

def verify_gitbook_signature(payload, signature):
    computed_signature = hmac.new(
        config.GITBOOK_WEBHOOK_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(computed_signature, signature)

@app.route('/gitbook-webhook', methods=['POST'])
def gitbook_webhook():
    signature = request.headers.get("X-GitBook-Signature")
    if not signature or not verify_gitbook_signature(request.data, signature):
        return "Invalid signature", 403
    
    data = request.json
    
    if data['event'] == 'content.updated':
        page_title = data['data']['title']
        page_url = data['data']['urls']['web']
        
        post_content = f"New content update on LookerHelp: {page_title}. Check it out at {page_url}"
        
        linkedin_url = f"https://api.linkedin.com/v2/ugcPosts"
        headers = {
            "Authorization": f"Bearer {config.LINKEDIN_ACCESS_TOKEN}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        }
        post_data = {
            "author": f"urn:li:organization:{config.LINKEDIN_COMPANY_ID}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": post_content
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        
        response = requests.post(linkedin_url, headers=headers, json=post_data)
        
        if response.status_code == 201:
            return "Posted to LinkedIn successfully", 200
        else:
            return f"Failed to post to LinkedIn: {response.text}", 500
    
    return "Event processed", 200

if __name__ == "__main__":
    app.run(port=8080)
EOF

# Deploy the Cloud Function
echo "Deploying GitBook to LinkedIn Cloud Function..."
gcloud functions deploy gitbook_to_linkedin \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars PROJECT_ID=$PROJECT_ID,LINKEDIN_ACCESS_TOKEN=$LINKEDIN_ACCESS_TOKEN,LINKEDIN_COMPANY_ID=$LINKEDIN_COMPANY_ID,GITBOOK_WEBHOOK_SECRET=$GITBOOK_WEBHOOK_SECRET \
  --entry-point gitbook_webhook

cd ../..

echo "GitBook to LinkedIn content sharing setup complete."
```
### This script sets up a Cloud Function to handle GitBook webhooks and post content updates to LinkedIn. After running this script:
**1. A Cloud Function will be deployed to handle GitBook webhooks.**
**2. The function will verify the GitBook webhook signature for security.**
**3. When content is updated in GitBook, a post will be created on the LinkedIn company page.**

### Next steps:
**1. Set up a webhook in GitBook pointing to the URL of the deployed Cloud Function.**
**2. Test the integration by updating content in GitBook and verifying that it appears on LinkedIn.**
**3. Monitor the Cloud Function logs to ensure it's working correctly and to troubleshoot any issues.**
**4. Consider implementing rate limiting to avoid overwhelming the LinkedIn API.**
**5. Implement more sophisticated content filtering or formatting if needed.**

## 8. Implement SEO Optimization for LookerHelp.com

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read necessary values from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")
GITBOOK_API_TOKEN=$(python -c "import config; print(config.GITBOOK_API_TOKEN)")
MAIN_SPACE_ID=$(python -c "import config; print(config.MAIN_SPACE_ID)")
DOCS_SPACE_ID=$(python -c "import config; print(config.DOCS_SPACE_ID)")
SCRIPTS_SPACE_ID=$(python -c "import config; print(config.SCRIPTS_SPACE_ID)")

# 8.1. Create a sitemap.xml file
echo "Creating sitemap.xml..."
cat << EOF > sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lookerhelp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lookerhelp.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lookerhelp.com/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://docs.lookerhelp.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://scripts.lookerhelp.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
EOF

# 8.2. Create a robots.txt file
echo "Creating robots.txt..."
cat << EOF > robots.txt
User-agent: *
Allow: /
Sitemap: https://lookerhelp.com/sitemap.xml
EOF

# 8.3. Create a Cloud Function to dynamically update sitemap
echo "Creating Cloud Function for dynamic sitemap updates..."

mkdir -p cloud_functions/update_sitemap
cd cloud_functions/update_sitemap

cat << EOF > requirements.txt
google-cloud-storage==1.42.0
requests==2.26.0
EOF

cat << EOF > main.py
import os
from google.cloud import storage
import requests

def update_sitemap(event, context):
    gitbook_token = os.environ.get('GITBOOK_API_TOKEN')
    project_id = os.environ.get('PROJECT_ID')
    main_space_id = os.environ.get('MAIN_SPACE_ID')
    docs_space_id = os.environ.get('DOCS_SPACE_ID')
    scripts_space_id = os.environ.get('SCRIPTS_SPACE_ID')
    
    # Function to get pages from a GitBook space
    def get_pages(space_id):
        url = f"https://api.gitbook.com/v1/spaces/{space_id}/content"
        headers = {"Authorization": f"Bearer {gitbook_token}"}
        response = requests.get(url, headers=headers)
        return response.json().get('items', [])
    
    # Get pages from all spaces
    main_pages = get_pages(main_space_id)
    docs_pages = get_pages(docs_space_id)
    scripts_pages = get_pages(scripts_space_id)
    
    # Generate sitemap XML
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Add main pages
    for page in main_pages:
        sitemap_content += f'  <url>\n    <loc>https://lookerhelp.com/{page["slug"]}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n'
    
    # Add docs pages
    for page in docs_pages:
        sitemap_content += f'  <url>\n    <loc>https://docs.lookerhelp.com/{page["slug"]}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n'
    
    # Add scripts pages
    for page in scripts_pages:
        sitemap_content += f'  <url>\n    <loc>https://scripts.lookerhelp.com/{page["slug"]}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n'
    
    sitemap_content += '</urlset>'
    
    # Upload sitemap to Cloud Storage
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(f"{project_id}.appspot.com")
    blob = bucket.blob('sitemap.xml')
    blob.upload_from_string(sitemap_content, content_type='application/xml')
    
    print("Sitemap updated successfully")

EOF

gcloud functions deploy update_sitemap \
    --runtime python39 \
    --trigger-topic update-sitemap \
    --set-env-vars GITBOOK_API_TOKEN=$GITBOOK_API_TOKEN,PROJECT_ID=$PROJECT_ID,MAIN_SPACE_ID=$MAIN_SPACE_ID,DOCS_SPACE_ID=$DOCS_SPACE_ID,SCRIPTS_SPACE_ID=$SCRIPTS_SPACE_ID

# 8.4. Set up a Cloud Scheduler job to update sitemap daily
gcloud scheduler jobs create pubsub update-sitemap-daily \
    --schedule "0 0 * * *" \
    --topic update-sitemap \
    --message-body "Update sitemap"

cd ../..

# 8.5. Implement structured data
cat << EOF > structured_data.json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LookerHelp",
  "url": "https://lookerhelp.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lookerhelp.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
EOF

echo "Add the following script to your main website's <head> tag:"
echo "<script type=\"application/ld+json\">"
cat structured_data.json
echo "</script>"

echo "SEO optimization setup complete."
```
### This script implements several SEO optimizations for LookerHelp.com. After running this script:
**1. A basic sitemap.xml and robots.txt file will be created.**
**2. A Cloud Function for dynamically updating the sitemap based on GitBook content will be deployed.**
**3. A daily Cloud Scheduler job will be set up to trigger sitemap updates.**
**4. Structured data for the website will be generated.**

### Next steps:
**1. Upload the sitemap.xml and robots.txt files to your website's root directory.**
**2. Add the structured data script to your website's <head> tag.**
**3. Set up Google Search Console and submit your sitemap.**
**4. Implement canonical URLs for all pages to avoid duplicate content issues.**
**5. Optimize page load speed by minimizing CSS and JavaScript, and optimizing images.**
**6. Implement an internal linking strategy to improve site structure and SEO.**
**7. Regularly create high-quality, keyword-optimized content to improve search engine rankings.**

## 9. Implement Analytics and Monitoring for LookerHelp.com

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read necessary values from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")
GA_MEASUREMENT_ID=$(python -c "import config; print(config.GA_MEASUREMENT_ID)")

# 9.1. Set up Google Analytics
echo "Setting up Google Analytics..."
cat << EOF > analytics_script.html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');
</script>
EOF

echo "Add the following script to the <head> of all your pages:"
cat analytics_script.html

# 9.2. Set up Cloud Monitoring
echo "Setting up Cloud Monitoring..."
gcloud services enable monitoring.googleapis.com

# Create an uptime check for the main website
gcloud monitoring uptime-check create http \
    --display-name="LookerHelp Main Website" \
    --uri="https://lookerhelp.com" \
    --check-interval=5m \
    --timeout=10s

# Create uptime checks for subdomains
gcloud monitoring uptime-check create http \
    --display-name="LookerHelp Docs" \
    --uri="https://docs.lookerhelp.com" \
    --check-interval=5m \
    --timeout=10s

gcloud monitoring uptime-check create http \
    --display-name="LookerHelp Scripts" \
    --uri="https://scripts.lookerhelp.com" \
    --check-interval=5m \
    --timeout=10s

# 9.3. Set up custom Cloud Monitoring dashboard
gcloud monitoring dashboards create --config-from-file=- << EOF
{
  "displayName": "LookerHelp Overview",
  "gridLayout": {
    "columns": "2",
    "widgets": [
      {
        "title": "Uptime Checks",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "metric.type=\"monitoring.googleapis.com/uptime_check/check_passed\" resource.type=\"uptime_url\"",
                  "aggregation": {
                    "alignmentPeriod": "60s",
                    "perSeriesAligner": "ALIGN_FRACTION_TRUE"
                  }
                }
              }
            }
          ]
        }
      },
      {
        "title": "Cloud Function Executions",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "metric.type=\"cloudfunctions.googleapis.com/function/execution_count\" resource.type=\"cloud_function\"",
                  "aggregation": {
                    "alignmentPeriod": "60s",
                    "perSeriesAligner": "ALIGN_RATE"
                  }
                }
              }
            }
          ]
        }
      }
    ]
  }
}
EOF

# 9.4. Set up Error Reporting
gcloud services enable clouderrorreporting.googleapis.com

# 9.5. Set up Cloud Logging export to BigQuery
echo "Setting up Cloud Logging export to BigQuery..."
gcloud services enable bigquery.googleapis.com

# Create a BigQuery dataset for logs
bq mk --dataset lookerhelp_logs

# Create a log sink to export logs to BigQuery
gcloud logging sinks create lookerhelp-logs-sink \
    bigquery.googleapis.com/projects/${PROJECT_ID}/datasets/lookerhelp_logs \
    --log-filter="resource.type=(\"cloud_function\" OR \"cloud_run_revision\")"

# 9.6. Set up alerts
echo "Setting up alerts..."

# Create an alert for high error rates
gcloud alpha monitoring alerts create \
    --display-name="High Error Rate Alert" \
    --combiner=OR \
    --conditions="metric.type=\"cloudfunctions.googleapis.com/function/execution_count\" resource.type=\"cloud_function\" metric.label.status=\"error\" > 10" \
    --notification-channels="projects/${PROJECT_ID}/notificationChannels/channel-id-placeholder"

# Create an alert for uptime check failures
gcloud alpha monitoring alerts create \
    --display-name="Uptime Check Failure Alert" \
    --combiner=OR \
    --conditions="metric.type=\"monitoring.googleapis.com/uptime_check/check_passed\" resource.type=\"uptime_url\" < 1" \
    --notification-channels="projects/${PROJECT_ID}/notificationChannels/channel-id-placeholder"

# 9.7. Set up custom logging for GitBook API calls
cat << EOF > gitbook_logging.py
import logging
from google.cloud import logging as cloud_logging

# Setup Cloud Logging client
client = cloud_logging.Client()
client.setup_logging()

def log_gitbook_api_call(method, endpoint, response_status):
    logger = logging.getLogger('gitbook_api')
    logger.setLevel(logging.INFO)
    logger.info(f"GitBook API Call - Method: {method}, Endpoint: {endpoint}, Status: {response_status}")

# Example usage:
# log_gitbook_api_call('GET', '/v1/spaces', 200)
EOF

echo "Add the gitbook_logging.py to your project and use the log_gitbook_api_call function to log GitBook API calls."

echo "Analytics and Monitoring setup complete."
``` 
### This script sets up comprehensive analytics and monitoring for LookerHelp.com. After running this script:
**1. Google Analytics will be set up with a tracking code ready to be added to your pages.**
**2. Cloud Monitoring will be enabled with uptime checks for your main website and subdomains.**
**3. A custom Cloud Monitoring dashboard will be created to visualize key metrics.**
**4. Error Reporting will be enabled to track and analyze errors.**
**5. Cloud Logging export to BigQuery will be set up for advanced log analysis.**
**6. Alerts will be created for high error rates and uptime check failures.**
**7. A custom logging function for GitBook API calls will be provided.**

### Next steps:
**1. Add the Google Analytics tracking code to all pages of your website.**
**2. Replace 'channel-id-placeholder' in the alert setup commands with your actual notification channel ID.**
**3. Integrate the custom GitBook API logging function into your application code.**
**4. Set up additional custom metrics and alerts based on your specific needs.**
**5. Regularly review the Cloud Monitoring dashboard and Error Reporting to identify and address issues.**
**6. Use BigQuery to analyze exported logs and gain insights into your application's performance.**
**7. Consider setting up additional uptime checks for critical API endpoints.**
**8. Implement application-level logging throughout your codebase for more detailed insights.**

## 10. User Authentication and Access Control

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read necessary values from config.py
PROJECT_ID=$(python -c "import config; print(config.PROJECT_ID)")
GOOGLE_CLIENT_ID=$(python -c "import config; print(config.GOOGLE_CLIENT_ID)")
GOOGLE_CLIENT_SECRET=$(python -c "import config; print(config.GOOGLE_CLIENT_SECRET)")

# 10.1. Set up Google Auth integration
echo "Setting up Google Auth integration..."

# Create a new directory for the auth Cloud Function
mkdir -p cloud_functions/auth
cd cloud_functions/auth

# Create requirements.txt
cat << EOF > requirements.txt
google-auth==2.3.3
google-auth-oauthlib==0.4.6
google-auth-httplib2==0.1.0
google-cloud-bigquery==2.34.4
Flask==2.0.2
requests==2.26.0
EOF

# Create main.py
cat << EOF > main.py
import os
from flask import Flask, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests
from google.cloud import bigquery

app = Flask(__name__)

client = bigquery.Client()
dataset_id = "lookerhelp_users"
table_id = "users"

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')

def verify_google_token(token):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        return idinfo
    except ValueError:
        return None

@app.route('/auth', methods=['POST'])
def authenticate():
    token = request.json.get('token')
    user_info = verify_google_token(token)
    
    if user_info:
        user_id = user_info['sub']
        email = user_info['email']
        
        # Check if user exists in BigQuery
        query = f"""
        SELECT subscription_status FROM `{dataset_id}.{table_id}`
        WHERE user_id = @user_id
        """
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
            ]
        )
        query_job = client.query(query, job_config=job_config)
        results = list(query_job)
        
        if not results:
            # New user, insert into BigQuery
            insert_query = f"""
            INSERT INTO `{dataset_id}.{table_id}` (user_id, email, created_at, subscription_status)
            VALUES (@user_id, @email, CURRENT_TIMESTAMP(), 'visitor')
            """
            job_config = bigquery.QueryJobConfig(
                query_parameters=[
                    bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
                    bigquery.ScalarQueryParameter("email", "STRING", email),
                ]
            )
            insert_job = client.query(insert_query, job_config=job_config)
            insert_job.result()
            subscription_status = 'visitor'
        else:
            subscription_status = results[0]['subscription_status']
        
        return jsonify({
            'user_id': user_id,
            'email': email,
            'subscription_status': subscription_status
        }), 200
    else:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(port=8080)
EOF

# Deploy the Cloud Function
echo "Deploying Auth Cloud Function..."
gcloud functions deploy auth \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  --entry-point authenticate

cd ../..

# 10.2. Set up user roles and permissions in BigQuery
echo "Setting up user roles and permissions in BigQuery..."

bq query --use_legacy_sql=false \
"CREATE TABLE IF NOT EXISTS $PROJECT_ID.lookerhelp_users.user_roles
(
  user_id STRING,
  role STRING
)"

# Insert sample data for different user roles
bq query --use_legacy_sql=false \
"INSERT INTO $PROJECT_ID.lookerhelp_users.user_roles (user_id, role)
VALUES
('visitor_1', 'visitor'),
('subscriber_1', 'subscriber'),
('looker_1', 'looker')"

# 10.3. Create a Cloud Function to check user access
echo "Creating Cloud Function to check user access..."

mkdir -p cloud_functions/check_user_access
cd cloud_functions/check_user_access

cat << EOF > main.py
from google.cloud import bigquery

def check_user_access(request):
    client = bigquery.Client()
    
    user_id = request.args.get('user_id')
    content_type = request.args.get('content_type')

    query = f"""
    SELECT role FROM `{client.project}.lookerhelp_users.user_roles`
    WHERE user_id = @user_id
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("user_id", "STRING", user_id)
        ]
    )
    results = client.query(query, job_config=job_config).result()

    user_role = next(results).role if results.total_rows > 0 else 'visitor'

    access_rules = {
        'visitor': ['free'],
        'subscriber': ['free', 'basic'],
        'looker': ['free', 'basic', 'premium']
    }

    has_access = content_type in access_rules.get(user_role, [])

    return {'has_access': has_access, 'user_role': user_role}

EOF

# Deploy the Cloud Function
echo "Deploying Check User Access Cloud Function..."
gcloud functions deploy check_user_access \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated

cd ../..

echo "User Authentication and Access Control setup complete."
```
### This script sets up user authentication using Google Auth and implements access control based on user roles. After running this script:
**1. A Cloud Function for handling Google Auth will be deployed.**
**2. User data will be stored and managed in BigQuery.**
**3. A system for managing user roles and permissions will be set up in BigQuery.**
**4. A Cloud Function for checking user access based on their role will be deployed.**

### Next steps:
**1. Integrate the authentication Cloud Function with your frontend application.**
**2. Implement the user access check in your application logic to control access to different content types.**
**3. Set up a process to upgrade users from 'visitor' to 'subscriber' or 'looker' based on their actions (e.g., payment).**
**4. Implement proper error handling and logging in both Cloud Functions.**
**5. Secure the Cloud Functions appropriately for production use.**
**6. Consider implementing rate limiting to prevent abuse of the authentication system.**
**7. Regularly audit user roles and permissions to ensure they are up to date.**

## 11. User Documentation

```bash
# Ensure config.py exists and contains the necessary configuration
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read necessary values from config.py
GITBOOK_API_TOKEN=$(python -c "import config; print(config.GITBOOK_API_TOKEN)")
DOCS_SPACE_ID=$(python -c "import config; print(config.DOCS_SPACE_ID)")

# 11.1. Create user documentation structure
echo "Creating user documentation structure..."

# Function to create a page in GitBook
create_gitbook_page() {
    local space_id=$1
    local title=$2
    local content=$3
    
    response=$(curl -X POST "https://api.gitbook.com/v1/spaces/$space_id/content" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"$title\",
        \"type\": \"page\",
        \"content\": \"$content\"
      }")
    
    echo $response
}

# 11.2. Create main user guide sections
echo "Creating main user guide sections..."

# Getting Started page
getting_started_content="# Getting Started with LookerHelp

Welcome to LookerHelp! This guide will help you get started with our platform.

## Creating an Account
1. Visit [LookerHelp.com](https://lookerhelp.com)
2. Click on \"Sign Up\" in the top right corner
3. Choose to sign up with your Google account
4. Follow the prompts to complete your registration

## Navigating the Platform
- The main dashboard: [Description of main features]
- Accessing documentation: [How to find and use the docs]
- Using the script library: [How to access and use scripts]

## Subscription Levels
- Visitor: [Describe what's available to visitors]
- Subscriber: [Describe subscriber benefits]
- Looker: [Describe full access benefits]

## Getting Help
- Using the Slack community: [How to join and use the Slack channel]
- Contacting support: [How to reach out for additional help]"

create_gitbook_page $DOCS_SPACE_ID "Getting Started" "$getting_started_content"

# Using Lookernomicon AI Agent page
lookernomicon_content="# Using Lookernomicon AI Agent

Lookernomicon is our AI-powered assistant designed to help you with all things Looker.

## Accessing Lookernomicon
1. Join our Slack workspace (instructions in Getting Started guide)
2. Navigate to the #lookernomicon channel
3. Type @lookernomicon followed by your question or request

## What Lookernomicon Can Do
- Answer questions about Looker functionality
- Provide code snippets and examples
- Offer troubleshooting assistance
- Suggest best practices and optimizations

## Tips for Best Results
- Be specific in your questions
- Provide context when necessary
- If Lookernomicon doesn't understand, try rephrasing your question"

create_gitbook_page $DOCS_SPACE_ID "Using Lookernomicon AI Agent" "$lookernomicon_content"

# Subscription Management page
subscription_content="# Managing Your Subscription

Learn how to manage your LookerHelp subscription.

## Upgrading Your Account
1. Log in to your account
2. Navigate to the \"Subscription\" page
3. Choose the plan you want to upgrade to
4. Follow the prompts to complete payment through Stripe

## Changing or Cancelling Your Subscription
1. Log in to your account
2. Navigate to the \"Subscription\" page
3. Select \"Change Plan\" or \"Cancel Subscription\"
4. Follow the prompts to confirm your changes

## Billing and Invoices
- Accessing your billing history
- Understanding your invoice
- Updating payment information"

create_gitbook_page $DOCS_SPACE_ID "Subscription Management" "$subscription_content"

echo "User documentation structure created. Expand on these files and create additional documentation as needed."
```
## 11.3 Build Ticketing App (Non-MVP)

### Overview
Develop a ticketing system using Gmail labels, integrated with Slack functions, workflows, and triggers. This system will use dion@lookerhelp.com as an alias for dion@wrench.chat on the Slack workspace lookernomicon.slack.com.

### Requirements
1. Gmail Integration:
   - Set up labels in Gmail for ticket status (New, In Progress, Resolved)
   - Create labels for priority levels (High, Medium, Low)
   - Implement labels for issue categories (Technical, Billing, Feature Request)
2. Slack Integration:
   - Use Slack's Gmail integration for notifications
   - Set up Slack workflow to create emails from Slack messages
   - [Slack API](https://api.slack.com/#)
3. Automation:
   - Implement Google Apps Script to:
     - Assign ticket numbers to new emails
     - Set up time-based triggers for ticket escalation
     - Generate reports of ticket status and resolution times
4. Workflow:
   - Incoming email or Slack message creates a new ticket
   - Automatic labeling based on content analysis
   - Slack notification sent to support channel
   - Team members claim tickets with "Assigned to [Name]" label
   - Update labels as ticket progresses
5. Response Management:
   - Use Gmail's canned responses for common issues
   - Implement personalized response suggestions
6. Reporting:
   - Generate Daily Slack Report
   - Generate Priority Alerts

### Implementation Steps

1. Set up Gmail account and configure labels
2. Integrate Gmail with Slack workspace
3. Develop Google Apps Script for automation
4. Create Slack workflows for ticket creation and updates
5. Implement content analysis for automatic labeling (optional: use AI for enhanced analysis)
6. Set up reporting system using Google Sheets
7. Test the system thoroughly with sample tickets
8. Train team on using the new ticketing system

### Considerations

- Ensure GDPR compliance for handling user data
- Implement proper error handling and logging
- Consider scalability for future growth
- Regularly review and optimize the ticketing process based on team feedback

Note: This ticketing system is considered a non-MVP feature and should be implemented after core functionalities are in place.

### This script sets up the basic structure for user documentation in GitBook. After running this script:
**1. A "Getting Started" page will be created with basic information about using LookerHelp.**
**2. A "Using Lookernomicon AI Agent" page will be created with instructions on how to use the AI assistant.**
**3. A "Subscription Management" page will be created with information on managing subscriptions.**

### Next steps:
**1. Review the created content in the GitBook web interface.**
**2. Expand on the content for each page, adding more detailed information and examples.**
**3. Create additional documentation pages as needed (e.g., FAQs, troubleshooting guides, advanced features).**
**4. Add images, diagrams, or videos to enhance the documentation.**
**5. Set up a process for regularly reviewing and updating the documentation.**
**6. Consider creating a feedback mechanism for users to suggest improvements or report issues with the documentation.**
**7. Implement a versioning strategy for your documentation to keep it in sync with your product updates.**

## 12. Testing Checklist

```bash
# Create a markdown file for the testing checklist
cat << EOF > testing_checklist.md
# LookerHelp Testing Checklist

## User Authentication
- [ ] Test Google Auth sign-up process
- [ ] Verify correct role assignment for new users
- [ ] Test sign-in for existing users
- [ ] Verify password reset functionality (if applicable)

## Content Access
- [ ] Verify visitors can access free content only
- [ ] Confirm subscribers can access free and basic content
- [ ] Ensure Lookers can access all content types
- [ ] Test admin access to all areas of the site

## Stripe Integration
- [ ] Test subscription purchase process
- [ ] Verify successful payment updates user role
- [ ] Test subscription cancellation process
- [ ] Confirm renewal process works correctly

## Slack Integration
- [ ] Verify Lookernomicon bot responds in Slack
- [ ] Test various query types with Lookernomicon
- [ ] Ensure only paid users can access Lookernomicon
- [ ] Check Slack notification system for new content

## GitBook Integration
- [ ] Verify all GitBook spaces are accessible
- [ ] Test search functionality across all spaces
- [ ] Ensure content updates are reflected promptly
- [ ] Check mobile responsiveness of GitBook content

## SEO
- [ ] Verify sitemap.xml is up-to-date and accessible
- [ ] Check robots.txt for correct configuration
- [ ] Ensure all pages have appropriate meta tags
- [ ] Test structured data implementation

## Analytics and Monitoring
- [ ] Confirm Google Analytics is tracking correctly
- [ ] Verify Cloud Monitoring dashboards are populated
- [ ] Test alert systems for various scenarios
- [ ] Ensure Error Reporting is capturing issues

## Performance
- [ ] Run performance tests on all main pages
- [ ] Check load times for heavy content (e.g., scripts)
- [ ] Verify CDN is working correctly (if applicable)
- [ ] Test performance on various devices and connection speeds

## Security
- [ ] Ensure all connections are using HTTPS
- [ ] Verify user data is properly encrypted
- [ ] Test for common vulnerabilities (e.g., XSS, CSRF)
- [ ] Confirm proper implementation of CSP headers

## Backup and Recovery
- [ ] Verify automated backups are running
- [ ] Test restore process from a backup
- [ ] Ensure all critical data is included in backups

## User Experience
- [ ] Test navigation flow for all user types
- [ ] Verify responsive design on various devices
- [ ] Check accessibility compliance
- [ ] Test all forms for proper validation and submission

## Content
- [ ] Review all documentation for accuracy
- [ ] Verify all links are working correctly
- [ ] Check formatting consistency across all pages
- [ ] Ensure all images and media are loading properly

EOF

echo "Testing checklist created. Use this for manual testing before launch and for regular maintenance checks."
```
### This script creates a comprehensive testing checklist for LookerHelp. After running this script:
**1. A markdown file named 'testing_checklist.md' will be created in your current directory.**
**2. The checklist covers various aspects of the LookerHelp platform, including authentication, integrations, performance, and security.**

### Next steps:
**1. Review the checklist and customize it based on your specific implementation details.**
**2. Assign team members to different sections of the checklist.**
**3. Set up a regular testing schedule to go through this checklist.**
**4. Consider automating some of these tests where possible.**
**5. Use the results of these tests to prioritize bug fixes and improvements.**
**6. Update the checklist as new features are added to the platform.**
**7. Implement a system to track the results of each test run.**
**8. Consider creating separate, more detailed checklists for critical components.**

## 13. Launch Preparation

```bash
# Create a markdown file for the launch checklist
cat << EOF > launch_checklist.md
# LookerHelp Launch Checklist

## Pre-Launch Tasks

### Content
- [ ] Finalize all content in GitBook spaces
- [ ] Proofread all documentation for accuracy and clarity
- [ ] Ensure all images and media are optimized and loading correctly
- [ ] Verify all internal and external links are working

### Technical
- [ ] Complete and test all integrations (Stripe, Slack, Google Auth)
- [ ] Run through entire Testing Checklist (see testing_checklist.md)
- [ ] Verify all Cloud Functions are deployed and working correctly
- [ ] Ensure all API endpoints are secure and functioning as expected
- [ ] Check that all environment variables and configuration settings are correctly set

### Monitoring and Analytics
- [ ] Set up monitoring and alerting systems
- [ ] Verify Google Analytics is tracking correctly on all pages
- [ ] Set up custom event tracking for key user actions
- [ ] Ensure Error Reporting is configured and capturing issues

### Security
- [ ] Perform a final security audit
- [ ] Verify SSL certificates are properly installed and up-to-date
- [ ] Ensure all sensitive data is properly encrypted
- [ ] Check that user authentication and authorization are working correctly

### Legal and Compliance
- [ ] Review and update Terms of Service if necessary
- [ ] Verify Privacy Policy is up-to-date and compliant with relevant laws
- [ ] Ensure GDPR compliance (if applicable)
- [ ] Check for any necessary legal disclaimers on the site

### Marketing and Communication
- [ ] Prepare launch announcement for existing channels (email, social media)
- [ ] Create a press release (if applicable)
- [ ] Brief support team on potential user questions
- [ ] Prepare FAQ document for common launch queries

## Launch Day Tasks
- [ ] Verify all systems are operational
- [ ] Switch DNS to point to production servers
- [ ] Monitor site performance and user signups closely
- [ ] Be ready to scale resources if needed
- [ ] Send out launch announcements
- [ ] Monitor social media and support channels for user feedback
- [ ] Have team on standby for quick issue resolution

## Post-Launch Tasks
- [ ] Gather and analyze initial user feedback
- [ ] Monitor key performance indicators (signups, engagement, etc.)
- [ ] Address any issues or bugs promptly
- [ ] Begin planning for future feature releases
- [ ] Conduct a post-launch team review to discuss lessons learned

## Gradual Rollout Plan
1. Soft Launch (Week 1):
   - [ ] Invite a small group of beta testers
   - [ ] Collect and act on initial feedback
   - [ ] Verify all systems under real-world usage

2. Limited Public Launch (Week 2):
   - [ ] Open registration to a larger group
   - [ ] Monitor system performance and user behavior
   - [ ] Continue collecting and acting on feedback

3. Full Public Launch (Week 3):
   - [ ] Remove any registration restrictions
   - [ ] Ramp up marketing efforts
   - [ ] Closely monitor all systems for potential issues

4. Post-Launch Optimization (Weeks 4-8):
   - [ ] Analyze user behavior and feedback
   - [ ] Implement quick wins and bug fixes
   - [ ] Plan for longer-term improvements and features

EOF

echo "Launch checklist created. Use this to ensure a smooth launch process."

# Create a timeline file
cat << EOF > launch_timeline.md
# LookerHelp Launch Timeline

## Week -2: Final Preparations
- Complete all development tasks
- Finalize content
- Conduct thorough testing

## Week -1: Pre-Launch
- Address any last-minute issues
- Prepare marketing materials
- Brief team on launch process

## Launch Week
- Day 1: Soft launch to beta testers
- Day 3: Address initial feedback
- Day 5: Expand to limited public launch

## Week +1: Public Launch
- Day 1: Full public launch
- Day 2-7: Close monitoring and quick fixes

## Week +2-4: Stabilization
- Gather and analyze user feedback
- Implement high-priority improvements
- Plan for future feature releases

## Month +2: Review and Plan
- Conduct comprehensive launch review
- Set goals for next quarter
- Begin work on next major feature set

EOF

echo "Launch timeline created. Adjust dates as necessary for your specific launch plan."
```
### This script creates two important documents for your launch preparation:
**1. A comprehensive launch checklist (launch_checklist.md) covering pre-launch, launch day, and post-launch tasks.**
**2. A basic launch timeline (launch_timeline.md) outlining key milestones from final preparations to post-launch review.**

### Next steps:
**1. Review both the launch checklist and timeline, adjusting them to fit your specific needs and schedule.**
**2. Assign team members to different sections of the launch checklist.**
**3. Set up regular meetings to go through the checklist and update the timeline as you progress.**
**4. Create a communication plan for keeping all stakeholders informed during the launch process.**
**5. Prepare contingency plans for potential issues that might arise during launch.**
**6. Consider creating a separate, more detailed technical checklist for your development team.**
**7. Set up a system for tracking and prioritizing user feedback received during and after launch.**
**8. Plan for a post-launch retrospective to gather lessons learned and improve future processes.**

## 14. Partnership with Looker Consultancy

### Objective
Establish a partnership with a consultancy that has an active Looker instance to enhance LookerHelp's capabilities and offer more comprehensive services to users.

### Requirements
1. Identify potential consultancy partners with:
   - Active Looker instance
   - Willingness to collaborate on LookerHelp project
   - Alignment with LookerHelp's mission and values

2. Negotiate partnership terms, including:
   - Access to Looker instance for testing and development
   - Collaborative content creation
   - Potential revenue sharing model
   - Data privacy and security agreements

3. Technical integration:
   - Secure API access to partner's Looker instance
   - Implement authentication and authorization mechanisms
   - Develop sandboxing or isolation features to protect partner's data

4. Service enhancements:
   - Offer live LookML testing environment for LookerHelp users
   - Provide real-world performance testing for user-created LookML
   - Enable more accurate and comprehensive LookML validation

5. Knowledge sharing:
   - Collaborate on advanced Looker tutorials and case studies
   - Share best practices based on real-world implementations
   - Offer joint webinars or training sessions

6. Legal considerations:
   - Draft and sign necessary legal agreements (NDA, MOU, etc.)
   - Ensure compliance with Looker's terms of service
   - Address any licensing concerns

### Success Criteria
- Successful integration with partner's Looker instance
- Enhanced LookML testing and validation capabilities for LookerHelp users
- Increased value proposition for LookerHelp subscribers
- Positive feedback from users on new features enabled by the partnership

### Timeline
- To be initiated after core LookerHelp features are stable and user base is established
- Aim to have partnership in place within 6-12 months of LookerHelp launch

### Considerations
- Ensure the partnership doesn't create conflicts of interest or compromise LookerHelp's independence
- Regularly review and adjust the partnership to maintain mutual benefit
- Be prepared to explore multiple potential partners if necessary

