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
