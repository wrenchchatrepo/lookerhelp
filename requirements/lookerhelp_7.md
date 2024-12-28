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
