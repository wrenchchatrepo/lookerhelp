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
