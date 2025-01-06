const { App } = require('@slack/bolt');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GCP_PROJECT_ID,
});

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

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

    // Get response from Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send response back to Slack
    await say({
      text: text,
      thread_ts: event.thread_ts || event.ts
    });
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

    const result = await model.generateContent(event.text);
    const response = await result.response;
    const text = response.text();

    await say({
      text: text,
      thread_ts: event.thread_ts || event.ts
    });
  } catch (error) {
    console.error('Error:', error);
    await say({
      text: "Sorry, I encountered an error processing your request.",
      thread_ts: event.thread_ts || event.ts
    });
  }
});

exports.slackAI = app.receiver.requestListener();
