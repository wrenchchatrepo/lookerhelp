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
```

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
