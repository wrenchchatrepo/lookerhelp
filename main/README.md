# LookerHelp.com

## End State

LookerHelp.com is a comprehensive platform for Looker professionals, offering AI-powered assistance, documentation, scripts, and a community hub. The platform integrates cutting-edge technologies to provide a seamless experience for users ranging from beginners to advanced Looker experts.

## Major Components

1. **Website (lookerhelp.com)**
   - Central hub built with GitBook
   - SEO-optimized content
   - User authentication and subscription management

2. **Documentation (docs.lookerhelp.com)**
   - Comprehensive Looker documentation
   - Tutorials and guides
   - Hosted on GitBook

3. **Scripts (scripts.lookerhelp.com)**
   - Repository of useful Looker scripts
   - Readme files and usage instructions
   - Hosted on GitBook

4. **Lookernomicon AI Agent**
   - Vertex AI-powered assistant
   - Integrated with Slack for user interactions
   - Utilizes Cloud Storage for data stores

5. **User Management System**
   - Google Auth for authentication
   - BigQuery for user data storage
   - Stripe integration for subscription handling

6. **Slack Integration**
   - Primary interface for Lookernomicon AI Agent
   - Community engagement and support channels

7. **GitHub Repository**
   - Version control for content and code
   - Collaboration and contribution management

8. **Google Cloud Platform Backend**
   - BigQuery for user data and analytics
   - Cloud Storage for AI agent data stores
   - Cloud Functions for serverless operations

9. **SEO and Analytics**
   - Google Analytics for user behavior tracking
   - SEO optimization across all content

10. **Stripe Payment Integration**
    - Subscription management
    - Secure payment processing

## Key Features

- AI-powered Looker assistance through Slack
- Tiered access: Visitor, Subscriber, and Looker (paid)
- Comprehensive Looker documentation and tutorials
- Curated collection of Looker scripts
- Community-driven content and support
- Seamless integration of GitBook, GitHub, and GCP services

## Technology Stack

- Frontend: GitBook
- Backend: Google Cloud Platform (BigQuery, Cloud Storage, Cloud Functions)
- AI: Vertex AI, Gemini 2.0
- Authentication: Google Auth
- Payments: Stripe
- Version Control: GitHub
- Communication: Slack

## Getting Started

To set up the development environment and run the project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/wrenchchatrepo/lookerhelp.git cd lookerhelp
```

2. Set up a Python virtual environment:
```
python3 -m venv venv source venv/bin/activate
```

3. Install required dependencies:
```
pip install -r requirements.txt
```

4. Set up environment variables:
- Copy the `.env.example` file to `.env`
- Fill in the required API keys and secrets in the `.env` file

5. Set up Google Cloud SDK:
- Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Authenticate with your Google Cloud account:
  ```
  gcloud auth login
  gcloud config set project miguelai
  ```

6. Set up BigQuery:
- Ensure you have the necessary permissions to access BigQuery
- Verify BigQuery access:
  ```
  bq show miguelai:lookerhelp_users
  ```

7. Set up GitBook access:
- Ensure you have access to the GitBook spaces for LookerHelp
- Verify GitBook API access:
  ```
  curl -H "Authorization: Bearer $GITBOOK_API_TOKEN" https://api.gitbook.com/v1/user
  ```

8. Run local development server (if applicable):
```
python manage.py runserver
````

For more detailed instructions on setting up specific components or contributing to the project, please refer to our [Contribution Guidelines](CONTRIBUTING.md).

## Contributing

We welcome contributions to LookerHelp! If you're interested in contributing, please contact dion@wrench.chat for more information on how to get involved.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or concerns regarding the project, please contact:

Dion Edge
Email: dion@wrench.chat

