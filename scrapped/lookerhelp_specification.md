# Specification Document: Initial Setup

## I. Introduction

This document outlines the specifications for the initial setup of the LookerHelp application. It includes setting up the React application with three-tier user access, integrating Google OAuth, configuring Stripe subscriptions, MkDocs integration, analytics setup, and the API backend.

## II. Goals

*   Establish a basic React application with navigation, routing, and three-tier access control.
*   Implement Google OAuth for user authentication.
*   Set up Stripe subscription payments ($9.99/month).
*   Integrate MkDocs for documentation and scripts management.
*   Configure Google Analytics, Cloud Monitoring, and BigQuery.
*   Create a basic API backend with user authentication, Dialogflow integration, and access validation.
*   Set up CI/CD pipeline for automated deployment.

## III. Requirements

### A. React Application Setup

1.  **Create New React Project:**
    *   Use `create-react-app` or a similar tool to initialize a new React project.
    *   Project name should be `lookerhelp-frontend`.
    *   Ensure all packages are up to date.

2.  **Set Up Routing and Access Control:**
    *   Install `react-router-dom`.
    *   Implement routing with three-tier access control:
        *   Visitor Access:
            *   `/` (Landing page with value proposition)
            *   `/guide` (Sample documentation)
            *   `/legal`
            *   `/faq`
            *   `/pricing`
        *   Subscriber Access:
            *   `/documentation` (Full MkDocs docs)
            *   `/scripts` (Full MkDocs scripts)
        *   Paid Access:
            *   `/slack` (Slack workspace invite/access)
    *   Create protected route wrappers for subscriber and paid content.

3.  **Create Initial Page Components:**
    *   Create components with access-level awareness:
        *   Public Components:
            *   `Index.jsx` (Value proposition focus)
            *   `Guide.jsx` (Sample content)
            *   `Legal.jsx`
            *   `FAQ.jsx`
            *   `Pricing.jsx` ($9.99/month subscription)
        *   Subscriber Components:
            *   `Documentation.jsx` (MkDocs integration)
            *   `Scripts.jsx` (MkDocs integration)
        *   Paid Components:
            *   `SlackAccess.jsx` (Workspace access)

4.  **Create Navigation Component:**
    *   Create a dynamic `NavigationBar` component.
    *   Show/hide links based on user access level.
    *   Include user authentication status.
    *   Display current subscription tier.

5.  **Basic Styling and UX:**
    *   Use Material UI for clean, intuitive interface.
    *   Implement responsive design for all devices.
    *   Create clear visual hierarchy for content.
    *   Add loading states and error boundaries.

### B. Google OAuth Integration

1.  **Install Google OAuth Library:**
    *   Install `react-google-login` or similar library.
    *   Configure OAuth scopes for user profile access.

2.  **Implement Authentication Flow:**
    *   Create login button in `NavigationBar`.
    *   Use Google client ID and secret from .env.
    *   Store authentication state in React context.
    *   Implement session persistence.

3.  **Handle OAuth Callback:**
    *   Capture user email and OAuth token.
    *   Send user data to backend for storage.
    *   Initialize appropriate access level.
    *   Redirect to appropriate content.

### C. Stripe Integration

1.  **Implement Subscription System:**
    *   Set up Stripe subscription product ($9.99/month).
    *   Create subscription management interface.
    *   Handle subscription webhooks for status updates.
    *   Implement automatic access level updates.

2.  **Payment UI Components:**
    *   Create subscription checkout flow.
    *   Add subscription management dashboard.
    *   Display current subscription status.
    *   Show payment history and invoices.

### D. MkDocs Integration

1.  **Documentation Setup:**
    *   Set up MkDocs for documentation and scripts.
    *   Configure MkDocs themes and plugins.
    *   Implement documentation structure.
    *   Create access control middleware.

2.  **Content Integration:**
    *   Integrate static MkDocs pages into React.
    *   Implement documentation routing.
    *   Add search functionality.
    *   Create mobile-responsive layout.
    *   Ensure proper authentication flow.

### E. Database and Storage

1.  **BigQuery Setup:**
    *   Create database schemas and tables for:
        *   User data
        *   Stripe transactions
        *   Payment status
        *   Meeting bookings
    *   Implement data access layer
    *   Set up backup procedures

2.  **Cloud Storage:**
    *   Configure storage buckets
    *   Set up file management
    *   Implement access controls

### F. Analytics and Monitoring

1.  **Google Analytics Setup:**
    *   Install and configure Google Analytics.
    *   Set up event tracking for key actions.
    *   Create conversion funnels.
    *   Implement user journey tracking.

2.  **Cloud Monitoring:**
    *   Set up basic performance monitoring.
    *   Configure error tracking and alerts.
    *   Implement uptime monitoring.
    *   Create monitoring dashboards.

### G. API Backend Setup (Flask)

1.  **Flask Project Setup:**
    *   Create `lookerhelp-backend` project.
    *   Install required packages.
    *   Set up project structure.
    *   Configure CORS and security.

2.  **Authentication Endpoints:**
    *   Create `/auth` endpoints for:
        *   User registration
        *   OAuth validation
        *   Session management
        *   Access level control

3.  **Subscription Endpoints:**
    *   Implement endpoints for:
        *   Subscription creation
        *   Status checks
        *   Webhook handling
        *   Access updates

4.  **Integration Endpoints:**
    *   Slack Integration:
        *   Workspace access validation
        *   Daily access checks
        *   User provisioning
        *   Slash command handling
    *   Dialogflow Integration:
        *   Webhook endpoints
        *   User verification
        *   Payment status checks
    *   Gemini API Integration:
        *   API key management
        *   Request handling
        *   Response processing

### H. CI/CD and Deployment

1.  **GitHub Actions Setup:**
    *   Configure CI/CD pipelines
    *   Set up automated testing
    *   Implement deployment workflows
    *   Add security scanning

2.  **Cloud Deployment:**
    *   Configure cloud services
    *   Set up environment management
    *   Implement logging and monitoring
    *   Create backup procedures

## IV. Infrastructure Requirements

*   **Frontend Application:**
    *   `lookerhelp-frontend`: React application with:
        *   Three-tier access control
        *   MkDocs integration
        *   Analytics tracking
        *   Subscription management

*   **Backend Services:**
    *   `lookerhelp-backend`: Flask application handling:
        *   User authentication
        *   Subscription management
        *   Access control
        *   Slack integration

*   **External Services:**
    *   MkDocs for documentation
    *   Stripe API for subscriptions
    *   Google Analytics for tracking
    *   Cloud Monitoring for system health
    *   BigQuery for data storage
    *   Dialogflow for chat integration
    *   Gemini API for enhanced functionality

## V. Next Steps

1.  Set up React application with three-tier routing and access control.
2.  Implement Google OAuth with session management.
3.  Configure Stripe subscription system.
4.  Integrate MkDocs for documentation and scripts.
5.  Set up analytics, monitoring, and BigQuery.
6.  Create backend API with all integrations.
7.  Implement Slack and Dialogflow integration.
8.  Configure CI/CD and deployment.
9.  Set up Gemini API integration.
10. Deploy and test MVP.
