Okay, here's a detailed set of instructions for integrating Google OAuth (server-side flow) with your CRA SPA, specifically tailored to your needs of authenticating users for Stripe payment links to your Vertex AI agent:

# Google OAuth Integration with CRA SPA (Server-Side Flow) for Stripe Payments

This document outlines the steps for integrating Google OAuth using a server-side flow with your Create React App (CRA) Single Page Application (SPA). The primary goal is to authenticate users so they can access Stripe payment links to purchase monthly subscriptions to your Vertex AI agent, which will then be interacted with in Slack.

## Project Parameters

**GCP Configuration**

*   `GCP_PROJECT_ID`: `miguelai`
*   `GCP_PROJECT_NUMBER`: `510916338777`
*   `GCP_BUCKET_NAME`: `agent_miguel_looker_bucket`
*   `GCP_SERVICE_ACCOUNT_EMAIL`: `lookerhelp-svc-acct@miguelai.iam.gserviceaccount.com`
*   `GCP_SERVICE_ACCOUNT_KEY_PATH`: `/Users/dionedge/dev/creds/miguelai-29ab64d034a3.json`

**Environment Variables (Available in .env file)**

*   `GOOGLE_OAUTH_CLIENT_ID` (Your Google OAuth client ID)
*   `GOOGLE_OAUTH_CLIENT_SECRET` (Your Google OAuth client secret)
*   `STRIPE_SECRET_KEY` (Your Stripe secret key)

**Stripe Configuration**

*   `STRIPE_PUBLISHABLE_KEY`: `pk_live_51QZVu6BfBN5SfCFiDfoBPNXXe1sdKGW7Ffyt7t470eC7hhkh1lRRSIMfQ7v51WXV8rDv8Ak36X4WbAGiehbf7hJq00GKgu3iFK`
*   `STRIPE_PAYMENT_LINK_WEEKLY_LIVE`: `https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL`
*   `STRIPE_PAYMENT_LINK_MONTHLY_LIVE`: `https://buy.stripe.com/14kbKdcfTai85uo7su`
*   `STRIPE_PAYMENT_LINK_WEEKLY_OFFICE`: `https://buy.stripe.com/7sIg0tbbP1LC8GA3cd`
*   `STRIPE_PAYMENT_LINK_APP`: `https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE`

## Implementation Instructions

### 1. Backend Server Setup (Node.js/Express Example)

1.  **Initialize Node.js Project:**
    ```bash
    mkdir server && cd server
    npm init -y
    npm install express dotenv googleapis axios jsonwebtoken
    ```

2.  **Create `server.js`:**

    ```javascript
    // server.js
    const express = require('express');
    const { google } = require('googleapis');
    const axios = require('axios');
    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 5000; // Or whatever port

    app.use(express.json());

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        process.env.NODE_ENV === 'production' ? '<YOUR_PRODUCTION_REDIRECT_URI>' : 'http://localhost:3000/auth/google/callback'
    );

    const generateAuthUrl = () => {
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'openid profile email', // Scope for profile and email info
      });
      return url;
    };

    // Step 1: Redirect the user to Google's OAuth consent screen
    app.get('/auth/google', (req, res) => {
      const authUrl = generateAuthUrl();
      res.redirect(authUrl);
    });

    // Step 2: Google redirects back to this route with the authorization code
    app.get('/auth/google/callback', async (req, res) => {
      const { code } = req.query;
      try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Verify the id_token to get profile info
        const ticket = await oauth2Client.verifyIdToken({
          idToken: tokens.id_token,
          audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
        });

        const { name, email, picture } = ticket.payload;

        // Generate a secure session token (using JWT)
        const sessionToken = jwt.sign({
              user:{ name, email, picture }
            },
            process.env.STRIPE_SECRET_KEY,  //replace this for a good secure key
            { expiresIn: '1h' } // Set an expiration for session token
        );

        res.redirect(`http://localhost:3000/auth/success?token=${sessionToken}`); // Redirect back to the client with session token
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).send('Authentication failed');
      }
    });

    // Protected route that can be called by the frontend once authenticated
    app.get('/user', async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) return res.sendStatus(401);

        jwt.verify(token, process.env.STRIPE_SECRET_KEY, (err, user)=>{
          if(err) return res.sendStatus(403);
          res.json({user})
        });

    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    ```
3. **`.env` setup in backend folder:**
    ```env
    GOOGLE_OAUTH_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_OAUTH_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
    ```
4.  **Run the Backend Server:**
    ```bash
    node server.js
    ```
   **Important**: Make sure you update the redirect uri in the `oauth2Client` object above for a production environment.

### 2. Client-Side (CRA SPA) Implementation

1.  **Install Axios:**

    ```bash
    cd ../
    npm install axios
    ```

2.  **Create an Authentication Component (`Auth.js` or similar) in your CRA's `src` directory:**

    ```jsx
    // src/Auth.js
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    const BACKEND_URL = process.env.NODE_ENV === 'production' ? '<YOUR_PRODUCTION_BACKEND_URL>' : 'http://localhost:5000'; // Adjust as needed
    const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/14kbKdcfTai85uo7su"


    const Auth = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null);
      const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      // Check for session token from redirect
       const urlParams = new URLSearchParams(window.location.search);
       const token = urlParams.get('token');

       if(token){
        localStorage.setItem('session_token', token);
        window.location.replace(window.location.origin + "/");
       }
       const storedToken = localStorage.getItem('session_token');

      if(storedToken) {
         const fetchUser = async () =>{
            setLoading(true)
            try {
               const response = await axios.get(`${BACKEND_URL}/user`, {headers:{'Authorization':`Bearer ${storedToken}`}});
               setUserInfo(response.data.user);
               setIsAuthenticated(true);
            } catch(e){
                localStorage.removeItem('session_token')
                setError(e.message);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
         }
         fetchUser();

      } else {
        setIsAuthenticated(false);
      }
    }, [])

      const handleGoogleLogin = () => {
        window.location.href = `${BACKEND_URL}/auth/google`;
      };


      if (loading) return <div> Loading ...</div>
      if(error) return <div>Authentication failed: {error}</div>;
      return (
        <div>
          {isAuthenticated ? (
             <div>
               <h2>Welcome, {userInfo.name}!</h2>
               <p>Your email: {userInfo.email}</p>
               <p>
                  <img src={userInfo.picture} alt="profile image" style={{borderRadius: '50%'}}/>
               </p>

               <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                Proceed to Checkout
               </a>
           </div>

          ) : (
            <button onClick={handleGoogleLogin}>Login with Google</button>
          )}
        </div>
      );
    };

    export default Auth;
    ```

3.  **Use the `Auth` component in your main `App.js` or other main component:**

    ```jsx
    // src/App.js
    import React from 'react';
    import Auth from './Auth';

    function App() {
      return (
        <div className="App">
          <Auth />
        </div>
      );
    }

    export default App;
    ```
    **Important**: Make sure you update the redirect uri in the `Auth.js` component above for a production environment.

### `.env` Setup in frontend folder:
    ```env
      REACT_APP_BACKEND_URL=YOUR_BACKEND_URL
    ```

## Explanation

1.  **Backend Authentication Flow:**
    *   The user clicks "Login with Google" in the SPA.
    *   The SPA redirects the user to your `/auth/google` backend route.
    *   The backend redirects the user to Google's authorization server.
    *   After authentication with Google, Google redirects the user back to your backend's `/auth/google/callback` route with an authorization code.
    *   The backend exchanges the code for Google access and refresh tokens.
    *   The backend generates a session token (JWT) with user info.
    *   The backend redirects the user back to the SPA with the session token in the URL.
2.  **Client-Side Authentication:**
    *   The SPA extracts the session token from the URL after redirection.
    *   The SPA stores the session token (e.g. localStorage).
    *   The SPA makes subsequent requests to your backend API using an `Authorization` header with the bearer token.
    *   The backend verifies the JWT, ensuring that the request is legitimate.
    *   Upon initial load, the `useEffect` in Auth.js detects the stored token and sends it to the backend on `/user` to verify. If successfully the SPA is authenticated, otherwise not.

## Further Improvements

*   **Error Handling:** Implement more robust error handling for both the client and server.
*   **Token Refresh:** You might consider implementing token refresh with the JWT.
*   **State Management:** For more complex applications, use a state management library like Redux or Zustand for managing authentication state.
*   **UI Enhancements:** Improve the user interface to indicate loading and error states.
*   **Security:** Always keep security practices in mind.

This set of instructions will give you a secure server-side Google OAuth flow for the use case of a user logging in to use your Stripe payment links. Remember to replace placeholders with your actual details, and test your implementation thoroughly.
content_copy
download
Use code with caution.
Markdown