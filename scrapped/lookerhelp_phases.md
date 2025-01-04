# Project Phases

## 1. Phase 1: Initial Setup and Core Functionality (Current Phase)

*   **Goal:** Establish the foundation of the application with a basic React front end, authentication, and basic back end communication.
*   **Tasks:**
    *   Set up React application with navigation, routing, and basic CSS styling.
    *   Integrate Google OAuth for user login.
    *   Add Stripe payment links to the pricing page.
    *   Configure the necessary environment variables in `.env` and `config.py`.
    *   Start a basic API backend with endpoints for authentication and calendar.
*   **Deliverables:**
    *   A basic React application with core navigation and authentication.
    *    Stripe Payment Links.
    *   `.env` variables and `config.py` set up.
    *   A functional API backend.
    *    Ability to capture the google user token and email.

## 2. Phase 2: User Management and Payment Processing

*   **Goal:** Implement a robust system for user management, payment processing, and tracking user access based on the payment status.
*   **Tasks:**
    *   Implement Stripe webhook processing in the backend.
    *   Store user data, Stripe transactions, and payment status in BigQuery.
    *   Create mechanisms for the backend to verify if a user has paid.
    *   Implement logic to send user payment status to the Dialogflow integration.
     * Link the `/user_auth` endpoint to verify if a user has paid.
*   **Deliverables:**
    *   Stripe webhook functionality in the backend
    *   BigQuery database schemas and tables.
    *   Ability to send payment status to dialogflow.
    *   User login and authentication workflow based on the payment status.

## 3. Phase 3: Slack Integration

*   **Goal:** Enable communication with the Slack bot and invite users who have paid.
*   **Tasks:**
    *   Implement the slack API to invite new users to the slack workspace.
    *   Implement the slash command integration with dialogflow, using the dialogflow webhook.
    *   Integrate Slack user verification to ensure the user is allowed to use the bot.
*   **Deliverables:**
    *   Automatic Slack invitation for paid subscribers.
    *   Functioning slash command interaction between slack and dialogflow.
    *   Slack user verification based on stripe payment.

## 4. Phase 4: Google Calendar Integration

*   **Goal:** Allow users to book meetings via Google Calendar.
*   **Tasks:**
    *   Integrate with the Google Calendar API using OAuth 2.0.
    *   Implement meeting booking on the frontend.
    *   Integrate meeting creation logic on the backend to create google meet entries in your calendar.
    *   Implement logic to send meeting data to the backend and to Google Meet.
*   **Deliverables:**
    *   Google Meet booking functionality in the front end.
    *   Google Calendar API integration to create the required events.
    *   Storage of booking details in BigQuery.

## 5. Phase 5: MkDocs Integration

*   **Goal:** Render the MkDocs site for documentation and scripts.
*   **Tasks:**
    *   Integrate the static pages rendered by MkDocs into the react app, making sure that the authentication is correct.
*   **Deliverables:**
    *   Documentation view in `/documentation`.
    *   Script view in `/scripts`.

## 6. Phase 6: CI/CD and Deployment

*   **Goal:** Set up a CI/CD pipeline and deploy the application.
*   **Tasks:**
    *   Set up GitHub Actions for continuous integration and deployment.
    *   Deploy the front end application.
    *   Deploy the backend API application.
    *   Enable Cloud logging to monitor and debug.
    *   Test all features of the deployed application.
*   **Deliverables:**
        *   Fully working and deployed application
        *   Automated build, test, and deploy process.
        *   Cloud logging set up.

## 7. Phase 7: Testing and Refinement

*   **Goal:** Thorough testing of the application and refinement.
*   **Tasks:**
    *   Run manual and automated tests for all components.
    *   Address any bugs or issues found in testing.
    *   Optimize performance and user experience
*   **Deliverables:**
    *   A fully tested and functioning application with no outstanding bugs
    *   A report on performance metrics

## 8. Phase 8: Gemini API Integration
 *   **Goal:** Integrate directly with the Gemini API for enhanced functionality.
    *   **Tasks:**
           * If needed implement logic to use the `GEMINI_API_KEY`.
        *  Make any adjustments to the application based on the new functionality.
    *  **Deliverables:**
        *  Use of Gemini API where required.
