const { App } = require('@slack/bolt');
const { BigQuery } = require('@google-cloud/bigquery');
const axios = require('axios');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GCP_PROJECT_ID,
});

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Vertex AI Agent webhook URL
const VERTEX_WEBHOOK_URL = 'https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41';

// Verify subscription status
async function verifySubscription(email) {
  const query = `
    SELECT status 
    FROM \`${process.env.GCP_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.subscriptions\`
    WHERE email = @email
    AND status = 'active'
    LIMIT 1
  `;

  const options = {
    query: query,
    params: { email: email }
  };

  const [rows] = await bigquery.query(options);
  return rows.length > 0;
}

// Forward message to Vertex AI Agent
async function forwardToVertexAgent(message, userId, threadTs) {
  try {
    const response = await axios.post(VERTEX_WEBHOOK_URL, {
      message: {
        text: message,
        user: userId,
        thread_ts: threadTs
      }
    });
    return response.data;
  } catch (error) {
    console.error('Vertex AI Agent Error:', error);
    throw error;
  }
}

// Handle direct messages and mentions
app.event('app_mention', async ({ event, say }) => {
  try {
    // Get user email for subscription check
    const userInfo = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: event.user
    });
    
    const userEmail = userInfo.user.profile.email;
    const hasSubscription = await verifySubscription(userEmail);
    
    if (!hasSubscription) {
      await say({
        text: "Sorry, you need an active subscription to use this feature. Visit https://miguelai.web.app to subscribe.",
        thread_ts: event.thread_ts || event.ts
      });
      return;
    }

    // Remove the bot mention from the prompt
    const prompt = event.text.replace(/<@[A-Z0-9]+>/, '').trim();

    // Forward to Vertex AI Agent
    await forwardToVertexAgent(prompt, event.user, event.thread_ts || event.ts);
  } catch (error) {
    console.error('Error:', error);
    await say({
      text: "Sorry, I encountered an error processing your request.",
      thread_ts: event.thread_ts || event.ts
    });
  }
});

// Handle direct messages
app.event('message', async ({ event, say }) => {
  // Only handle direct messages, not channel messages
  if (event.channel_type !== 'im') return;
  
  try {
    const userInfo = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: event.user
    });
    
    const userEmail = userInfo.user.profile.email;
    const hasSubscription = await verifySubscription(userEmail);
    
    if (!hasSubscription) {
      await say({
        text: "Sorry, you need an active subscription to use this feature. Visit https://miguelai.web.app to subscribe.",
        thread_ts: event.thread_ts || event.ts
      });
      return;
    }

    // Forward to Vertex AI Agent
    await forwardToVertexAgent(event.text, event.user, event.thread_ts || event.ts);
  } catch (error) {
    console.error('Error:', error);
    await say({
      text: "Sorry, I encountered an error processing your request.",
      thread_ts: event.thread_ts || event.ts
    });
  }
});

exports.slackAI = app.receiver.requestListener();
