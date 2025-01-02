# config.py

# Anthropic
ANTHROPIC_ORG_ID = "f7a0c77b-be51-406a-80f5-afd9e65fcc99"
# Available in .env file
# ANTHROPIC_API_KEY

# Eraser
# Available in .env file
# ERASER_API_TOKEN

# GCP Configuration
GCP_PROJECT_ID = "miguelai"
GCP_PROJECT_NUMBER = "510916338777"
GCP_BUCKET_NAME = "agent_miguel_looker_bucket"
GCP_SERVICE_ACCOUNT_EMAIL = "lookerhelp-svc-acct@miguelai.iam.gserviceaccount.com"
GCP_SERVICE_ACCOUNT_KEY_PATH = "/Users/dionedge/dev/creds/miguelai-29ab64d034a3.json"
GOOGLE_ANALYTICS_PROPERTY_ID = "446440745"
# Available in .env file
# GEMINI_API_KEY
# GOOGLE_OAUTH_CLIENT_ID
# GOOGLE_OAUTH_CLIENT_SECRET

# GitHub
GITHUB_REPO = "https://github.com/wrenchchatrepo/lookerhelp"
# Available in .env file
# GITHUB_PAT

# LinkedIn
LINKEDIN_PERSONAL = "https://www.linkedin.com/in/dionedge"
LINKEDIN_COMPANY = "https://www.linkedin.com/company/lookernomicon/"

# MkDocs
MKDOCS_REPO = "https://github.com/mkdocs/mkdocs"
MKDOCS_CUSTOM_DOMAIN = "https://www.lookerhelp.com"
# Available in .env file
# MKDOCS_API_KEY

# OpenAI
OPENAI_PROJECT = "Dev"
OPENAI_PROJECT_ID = "proj_CnGaZ6mNjO30rFjvaLqvEpPQ"
OPENAI_SVC_ACCT = "lono-openai"
# Available in .env file
# OPENAI_API_SECRET_KEY

# Organization Details
COMPANY_NAME = "Austin Creators Local LLC"
COMPANY_EIN = "99-0499000"
COMPANY_ADDRESS = "10705 Pinehurst Drive, Austin, TX 78747"
COMPANY_OWNER = "Isabella Edge"
# Available in .env file
# COMPANY_OWNER_SSN
# BANK_ACCT

# Slack
SLACK_APP_ID = "A0860L8F87R"
SLACK_APP_CREATION_DATE = "December 24, 2024"
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"
SLACK_APP_MANIFEST = {
    "display_information": {
        "name": "Lookernomicon",
        "description": "AI-Grimoire for Looker Nerds",
        "background_color": "#19171a"
    },
    "long_description": """Lookernomicon is an AI-powered comprehensive resource for Looker professionals, combining cutting-edge technology with expert knowledge. 
    It offers in-depth LookML guides, advanced data modeling techniques, and BI strategy insights. Featuring a rich repository of scripts, tutorials, and best practices, 
    Lookernomicon caters to both novice and experienced Looker users. With its integrated platform spanning documentation, community forums, and personalized learning paths, 
    it accelerates mastery of Looker's capabilities. Lookernomicon is the go-to solution for elevating Looker implementations and driving data-driven decision-making across organizations.""",
    "features": {
        "bot_user": {
            "display_name": "Lookernomicon",
            "always_online": True
        },
        "oauth_config": {
            "scopes": ["bot", "incoming-webhook"]
        },
        "settings": {
            "org_deploy_enabled": False,
            "socket_mode_enabled": False,
            "token_rotation_enabled": False
        }
    }
}
# Available in .env file
# SLACK_CLIENT_ID
# SLACK_CLIENT_SECRET
# SLACK_SIGNING_SECRET
# SLACK_VERIFICATION_TOKEN

# Stripe
STRIPE_PUBLISHABLE_KEY = "pk_live_51QZVu6BfBN5SfCFiDfoBPNXXe1sdKGW7Ffyt7t470eC7hhkh1lRRSIMfQ7v51WXV8rDv8Ak36X4WbAGiehbf7hJq00GKgu3iFK"
STRIPE_PAYMENT_LINK = ""
# Available in .env file
# STRIPE_SECRET_KEY

# Color Palette
COLOR_PALETTE = {
    "primary": "#2D2926",
    "secondary": "#B026FF",
    "accent": "#FF13F0",
    "background": "#F0E8F3",
    "text": "#333333",
    "heading": "#19171A",
    "link": "#00FEFC",
    "success": "#39FF14",
    "warning": "#CFFF04",
    "error": "#FF3131",
    "neutral_light": "#E0E0E0",
    "neutral_medium": "#9E9E9E",
    "neutral_dark": "#616161"
}

# Add any other non-sensitive configuration parameters here
