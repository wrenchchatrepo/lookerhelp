# Requirements Document

## I. Introduction

*   **Project Name:** LookerHelp
*   **Description:** A comprehensive platform for Looker professionals providing AI-powered support (Lookernomicon), live support options, and training.
*   **Target Audience:** Looker developers, analysts, and other professionals working with the Looker data platform.

## II. Goals

*   Provide a single platform for accessing AI-powered Looker support through a Slack App.
*   Offer live support options for advanced Looker questions with one-on-one mentoring.
*   Provide documentation and scripts for Looker use.
*   Offer a seamless user experience for onboarding, payment, and access.

## III. Overall System Requirements

1.  **Single-Page Application (React):**
    *   The user interface is implemented as a single-page application using React.
    *   Responsive design for various screen sizes.
2.  **Multi-Tiered Access:**
    *   **Visitor:** Access to landing pages (Index, Guide, Legal, FAQ, Pricing). No Google OAuth needed.
    *   **Subscriber:** Access to Booking, Documentation (mkdocs), and Scripts (mkdocs). Google OAuth required.
    *   **Paid Subscriber:** Full access including lookernomicon.slack.com. Google OAuth and successful Stripe payment required.
3.  **Cloud-Based:**
    *   Deployed on Google Cloud Platform.
4.  **Scalable & Reliable:**
    *   Designed to handle a growing number of users and requests.

## IV. User Stories

**A. Visitor**

1.  **As a visitor**, I want to be able to access the landing page (`/`) so I can learn what LookerHelp offers.
2.  **As a visitor**, I want to be able to navigate to the Guide page (`/guide`) so I can see a more in-depth explanation of Lookerhelp.
3.  **As a visitor**, I want to be able to navigate to the Legal page (`/legal`) so I can view the legal terms.
4.  **As a visitor**, I want to be able to navigate to the FAQ page (`/faq`) so I can find answers to common questions.
5.  **As a visitor**, I want to be able to navigate to the Pricing page (`/pricing`) so I can learn the different subscription options.

**B. Subscriber (Google OAuth)**

1.  **As a subscriber**, I want to be able to sign in with my Google Account so that I can access the subscriber resources.
2.  **As a subscriber**, I want to be redirected to the booking page (`/booking`) so that I can schedule a Google Meet.
3.  **As a subscriber**, I want to have access to the Documentation page (`/documentation`) with a viewable MkDocs documentation.
4.  **As a subscriber**, I want to have access to the Scripts page (`/scripts`) with a viewable MkDocs script documentation.

**C. Paid Subscriber (Google OAuth + Stripe Paid)**

1.  **As a paid subscriber**, I want to be redirected to a Stripe payment link to pay for the service so I can gain full access.
2.  **As a paid subscriber**, I want to have a confirmation that my payment was successful.
3.  **As a paid subscriber**, I want to be invited to the lookernomicon.slack.com workspace so I can interact with the support app.
4.  **As a paid subscriber**, I want my access to lookernomicon.slack.com to be confirmed so I can use all of the features.
5.  **As a paid subscriber**, I want access to lookernomicon so I can get AI-powered support for my looker questions.
6.  **As a paid subscriber**, I want access to the booking page so that I can schedule a Google Meet.
7.  **As a paid subscriber**, I want to have access to the Documentation page (`/documentation`) with a viewable MkDocs documentation.
8.  **As a paid subscriber**, I want to have access to the Scripts page (`/scripts`) with a viewable MkDocs script documentation.

## V. Functional Requirements

1.  **Google OAuth:**
    *   Allow users to authenticate with their Google Accounts.
    *   Store user email in BigQuery along with the Oauth code and token for user verification.
    *   Include the `https://www.googleapis.com/auth/calendar` scope to allow calendar access for booking.
2.  **Stripe Payment:**
    *   Redirect users to Stripe payment links for payment.
    *   Capture Stripe webhook events to confirm payment.
    *   Store payment data and user information in BigQuery.
3.  **Slack Integration:**
    *   Invite paid subscribers to the `lookernomicon.slack.com` workspace using the Slack API.
    *   Verify payment status before allowing full bot interaction, storing the Stripe payment id.
    *   Implement slash commands as defined in the `SLACK_APP_MANIFEST` to allow the user to interact with the bot.
    *   Utilize the dialogflow webhook for user input into the bot.
4.  **Google Calendar:**
    *   Allow paid subscribers to book Google Meet sessions on a pre-defined calendar, using the calendar API.
    *   Store meeting details in BigQuery
    *    Send meeting invites to the paid subscribers using their emails.
5.  **BigQuery Database:**
    *   Schema and tables for user information, payment data, booking data, and user payments.
6.  **Cloud Functions:**
    *   Manage user onboarding.
    *   Handle Stripe webhook events for payment capture.
    *   Integrate Slack API for invites and bot verification.
    *   Create meeting invites on Google Calendar.
    *   Provide endpoints for React App to verify user payments and schedule Google Meets.
7.  **MkDocs:**
    * Render a MkDocs site on /documentation, and /scripts
8. **CI/CD**
	*   Use Github Actions to create a CI/CD pipeline.

## VI. Non-Functional Requirements

1.  **Performance:** The application must be responsive and load quickly.
2.  **Security:** All data must be securely handled, using environment variables for API keys and secrets.
3.  **Scalability:** The system must be scalable to handle many users.
4.  **Maintainability:** Code must be clear and well documented for easy maintenance.
5.  **Error Handling:** Ensure the system gracefully handles exceptions and displays user-friendly error messages.
6.  **Logging:** Use cloud logging for capturing errors and important information.

## VII. Infrastructure Requirements

1.  **GCP Project:** Set up using the provided project ID, bucket name, and service account.
2.  **BigQuery:** Configure the required datasets and tables.
3.  **Cloud Functions:** Deploy the backend service for handling the integrations, using the runtime as stated in the `config.py` file.
4.  **GitHub:** Maintain code base with proper branching and version control.
5.  **Slack Workspace:** Create an app on `lookernomicon.slack.com`.
6.  **Environment Variables:** Manage your environment variables in `.env` and `config.py`.
