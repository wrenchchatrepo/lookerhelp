# Lookernomicon AI Agent

The Lookernomicon is an advanced AI agent specializing in Looker and LookML expertise, providing real-time assistance through Slack integration. Built on Google's Vertex AI and Dialogflow CX, it combines deep domain knowledge with natural language understanding to help teams solve complex Looker challenges.

## Framework Architecture

The Lookernomicon leverages a sophisticated multi-layer AI framework:

1. **Core AI Engine**
   - Powered by Google's Vertex AI Agent (Agent_Looker)
   - Enhanced by Gemini 2.0 for advanced language understanding
   - Integrated through Dialogflow CX for natural conversation flow

2. **Knowledge Base**
   - Comprehensive Looker documentation
   - LookML best practices and patterns
   - Common troubleshooting scenarios
   - Performance optimization strategies

3. **Integration Layer**
   - Slack-native interface
   - Real-time subscription verification
   - Secure message handling
   - Thread management

## Using Lookernomicon in Slack

### Getting Started

1. **Access**
   - Must have an active LookerHelp subscription
   - **Important**: You must accept an invitation to join the lookernomicon.slack.com workspace
   - Bot available in your Slack workspace
   - Can be used in direct messages or channels

2. **Interaction Methods**
   - Direct Message: Start a 1:1 conversation with @Lookernomicon
   - Channel Mention: Tag @Lookernomicon in any channel
   - Thread Replies: Continue conversations in threads

### Example Use Cases

1. **LookML Assistance**
   ```
   @Lookernomicon How do I create a derived table with incremental processing?
   ```

2. **Troubleshooting**
   ```
   @Lookernomicon Why is my PDT build failing with error XYZ?
   ```

3. **Best Practices**
   ```
   @Lookernomicon What's the best way to implement row-level security?
   ```

### Features

- Real-time responses to Looker questions
- Code snippets and examples
- Best practice recommendations
- Performance optimization tips
- Error troubleshooting
- Documentation references

## Technical Implementation

The Lookernomicon is implemented as a Cloud Function that:

1. Receives messages through Slack's Events API
2. Verifies user subscription status in BigQuery
3. Processes queries through Vertex AI/Dialogflow CX
4. Returns contextualized responses via Slack

### Security & Privacy

- Subscription verification for each request
- Secure token handling
- Environment variable configuration
- Audit logging
- BigQuery-based access control

## RAG Datastores

The Lookernomicon utilizes the following datastores for its Retrieval-Augmented Generation (RAG) functionality:

- **Looker**: Core documentation and technical specifications
- **BigQuery**: Performance data and historical query patterns
- **Looker Studio**: Visualization templates and reporting best practices

## Getting Help

If you encounter any issues or need support:

1. Technical Issues: Contact support@wrench.chat
2. Subscription Questions: Visit lookerhelp.com/pricing
3. Feature Requests: Submit through the feedback channel

## Contributing

The Lookernomicon is continuously learning and improving. We welcome:

- Feature suggestions
- Use case examples
- Documentation improvements
- Bug reports

Submit contributions through our GitHub repository or feedback channels.

## License

The Lookernomicon is a proprietary service of LookerHelp. Usage is subject to our terms of service and active subscription status.
