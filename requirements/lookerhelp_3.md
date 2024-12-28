## 3. Set up User Management System in BigQuery

```bash
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
