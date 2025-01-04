import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import LoadingState from './LoadingState';

const GoogleSignIn = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    scope: 'email profile https://www.googleapis.com/auth/calendar',
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      setError(null);
      try {
        // Exchange auth code for tokens
        const result = await fetch('/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code: codeResponse.code,
          }),
        });

        if (!result.ok) {
          throw new Error('Authentication failed');
        }

        const data = await result.json();
        
        // Use the auth context to manage login state
        login(data.user, data.token);
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Failed to sign in. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      setError('Failed to sign in. Please try again.');
    }
  });

  if (isLoading) {
    return <LoadingState message="Signing in..." />;
  }

  return (
    <div className="google-sign-in-container">
      <button 
        onClick={() => handleGoogleLogin()} 
        className="google-sign-in"
        disabled={isLoading}
      >
        <span className="icon"></span>
        <span className="button-text">Sign in with Google</span>
      </button>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleSignIn;
