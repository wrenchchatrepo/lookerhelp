# config.py

# Anthropic
ANTHROPIC_ORG_ID = "f7a0c77b-be51-406a-80f5-afd9e65fcc99"
# Available in .env file
# ANTHROPIC_API_KEY

# Eraser
# Available in .env file
# ERASER_API_TOKEN

# GCP Configuration
GCP_BIGQUERY_DS = "miguelai.lookerhelp"
GCP_PROJECT_ID = "miguelai"
GCP_PROJECT_NUMBER = "510916338777"
# GCP Buckets
GCP_AGENT_BUCKET = "agent_miguel_looker_bucket"
GCP_STRIPE_BUCKET = "gs://lookerhelp-stripe"
GCP_SERVICE_ACCOUNT_EMAIL = "lookerhelp-svc-acct@miguelai.iam.gserviceaccount.com"
GCP_SERVICE_ACCOUNT_KEY_PATH = "/Users/dionedge/dev/creds/miguelai-29ab64d034a3.json"
GOOGLE_ANALYTICS_PROPERTY_ID = "446440745"
VERTEX_AI_AGENT = "Agent_Looker"
VERTEX_AI_ID = "d27f2462-5527-4091-9362-8b8455f9a753"
VERTEX_AI_SLACK_WEBHOOK = "https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41"
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
SLACK_WORKSPACE = "LOOKERNOMICON.SLACK.COM"
SLACK_APP_ID = "A0860L8F87R"
SLACK_APP_CREATION_DATE = "December 24, 2024"
SLACK_DIALOGFLOW = "https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41"
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"
SLACK_EMBED_BUTTON = """<a href="https://slack.com/oauth/v2/authorize?client_id=6578284753109.8204688518263&scope=app_mentions:read,chat:write,commands,groups:history,groups:read,groups:write,im:history,im:read,im:write,incoming-webhook,mpim:history,reactions:read,users:read,canvases:write,channels:history,assistant:write&user_scope=channels:history,channels:read,groups:history,groups:read,im:history,im:read,im:write,mpim:history,mpim:read,reactions:read,users:read,users:read.email,chat:write"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>"""
SLACK_APP_MANIFEST = {
    "display_information": {
        "name": "Lookernomicon",
        "description": "AI-Grimoire for Looker Nerds",
        "background_color": "#19171a",
        "long_description": "Lookernomicon is an AI-powered comprehensive resource for Looker professionals, combining cutting-edge technology with expert knowledge. It offers in-depth LookML guides, advanced data modeling techniques, and BI strategy insights. Featuring a rich repository of scripts, tutorials, and best practices, Lookernomicon caters to both novice and experienced Looker users. Lookernomicon is the go-to solution for elevating Looker implementations and driving data-driven decision-making across organizations."
    },
    "features": {
        "app_home": {
            "home_tab_enabled": True,
            "messages_tab_enabled": True,
            "messages_tab_read_only_enabled": False
        },
        "bot_user": {
            "display_name": "Lookernomicon",
            "always_online": True
        },
        "slash_commands": [
            {
                "command": "/lono",
                "url": "https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41",
                "description": "Launches Looker_Agent",
                "should_escape": False
            }
        ],
        "assistant_view": {
            "assistant_description": "Lookernomicon is here to help you with all things Looker and the Looker ecosystem",
            "suggested_prompts": []
        }
    },
    "oauth_config": {
        "scopes": {
            "user": [
                "channels:history",
                "channels:read",
                "groups:history",
                "groups:read",
                "im:history",
                "im:read",
                "im:write",
                "mpim:history",
                "mpim:read",
                "reactions:read",
                "users:read",
                "users:read.email",
                "chat:write"
            ],
            "bot": [
                "app_mentions:read",
                "channels:history",
                "chat:write",
                "commands",
                "groups:history",
                "groups:read",
                "groups:write",
                "im:history",
                "im:read",
                "im:write",
                "mpim:history",
                "mpim:read",
                "mpim:write",
                "team:read",
                "users.profile:read",
                "users:read",
                "users:read.email",
                "reactions:read",
                "users:read",
                "canvases:write",
                "channels:history",
                "assistant:write"
            ]
        }
    },
    "settings": {
        "event_subscriptions": {
            "request_url": "https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41",
            "bot_events": [
                "app_mention",
                "assistant_thread_started",
                "message.channels",
                "message.groups",
                "message.im",
                "message.mpim"
            ]
        },
        "org_deploy_enabled": False,
        "socket_mode_enabled": False,
        "token_rotation_enabled": False
    }
}
# Available in .env file
# SLACK_CLIENT_ID
# SLACK_CLIENT_SECRET
# SLACK_SIGNING_SECRET
# SLACK_VERIFICATION_TOKEN
# SLACK_BOT_OAUTH_TOKEN
# SLACK_LONO_APP_TOKEN

# Stripe
STRIPE_PUBLISHABLE_KEY = "pk_live_51QZVu6BfBN5SfCFiDfoBPNXXe1sdKGW7Ffyt7t470eC7hhkh1lRRSIMfQ7v51WXV8rDv8Ak36X4WbAGiehbf7hJq00GKgu3iFK"
STRIPE_PAYMENT_LINK_WEEKLY_LIVE = "https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL"
STRIPE_PAYMENT_LINK_MONTHLY_LIVE = "https://buy.stripe.com/14kbKdcfTai85uo7su"
STRIPE_PAYMENT_LINK_WEEKLY_OFFICE = "https://buy.stripe.com/7sIg0tbbP1LC8GA3cd"
STRIPE_PAYMENT_LINK_APP = "https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE"
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

# Flask Configuration
FLASK_SECRET_KEY = "0fb50f9995970d190fe3b26f8a6391fdb72f0bc39d36e3491cea1fd0b0065963"

# Add any other non-sensitive configuration parameters here
