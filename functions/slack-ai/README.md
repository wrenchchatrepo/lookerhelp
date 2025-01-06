# Slack AI Integration

This Cloud Function integrates Slack with Vertex AI agent through Dialogflow CX, providing AI-powered responses while verifying user subscriptions through BigQuery.

## Features

- Responds to direct messages and mentions in Slack
- Uses Vertex AI agent (Agent_Looker) through Dialogflow CX
- Verifies user subscription status before responding
- Handles threading and error cases
- Integrates with existing BigQuery subscription data

## Setup

1. Install dependencies:
```bash
cd functions
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the following values:
     * `SLACK_APP_ID` - App ID from Slack App settings
     * `SLACK_CLIENT_ID` - Client ID from Slack App settings
     * `SLACK_CLIENT_SECRET` - Client Secret from Slack App settings
     * `SLACK_SIGNING_SECRET` - Signing Secret from Slack App settings
     * `SLACK_VERIFICATION_TOKEN` - Verification Token from Slack App settings
     * `SLACK_USER_OAUTH_TOKEN` - User OAuth Token from Slack App settings
     * `SLACK_BOT_TOKEN` - Bot User OAuth Token from Slack App settings
     * `SLACK_WEBHOOK_URL` - Webhook URL for your workspace

3. Update Slack App Configuration:
   - Go to your Slack App settings
   - Under "Event Subscriptions":
     * Set Request URL to: `https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41`
     * Subscribe to bot events:
       - `app_mention`
       - `message.im`
   - Under "OAuth & Permissions":
     * Add required scopes:
       - `app_mentions:read`
       - `chat:write`
       - `users:read`
       - `users:read.email`

4. Deploy the function:
```bash
firebase deploy --only functions:slackAI
```

## Usage

The bot responds to:
1. Direct messages in Slack
2. Mentions in channels (@bot_name)

Messages are processed only for users with active subscriptions in BigQuery.

## Architecture

1. User sends message in Slack
2. Cloud Function verifies subscription status
3. If subscribed, forwards message to Vertex AI agent through Dialogflow CX
4. Dialogflow processes message using Gemini 2.0
5. Response is sent back to user in Slack

## Error Handling

- Invalid/missing subscriptions: Users receive a message to subscribe
- API errors: Generic error message with logging for debugging
- Rate limiting: Handled automatically by the Slack SDK

## Monitoring

- Use Firebase Console for function monitoring
- Check Cloud Logging for detailed logs
- Monitor BigQuery for subscription queries

## Security

- Subscription verification before processing
- Slack signing secret verification
- Environment variables for sensitive data
- BigQuery parameterized queries

## Development

1. Local testing:
```bash
npm run serve
```

2. Update dependencies:
```bash
npm update
```

3. View logs:
```bash
firebase functions:log
