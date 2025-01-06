# Slack AI Integration

This Cloud Function integrates Slack with Google's Gemini AI model, providing AI-powered responses while verifying user subscriptions through BigQuery.

## Features

- Responds to direct messages and mentions in Slack
- Uses Gemini 2 for AI responses
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
     * `SLACK_BOT_TOKEN`: Bot User OAuth Token from Slack App settings
     * `SLACK_SIGNING_SECRET`: Signing Secret from Slack App settings
     * `GOOGLE_AI_API_KEY`: API key for Gemini access

3. Update Slack App Configuration:
   - Go to your Slack App settings
   - Under "Event Subscriptions":
     * Set Request URL to: `https://us-central1-miguelai.cloudfunctions.net/slackAI`
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
npm update @google/generative-ai @slack/bolt
```

3. View logs:
```bash
firebase functions:log
