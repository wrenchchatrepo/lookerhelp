import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for session token from OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      setError(decodeURIComponent(error));
      return;
    }

    if (token) {
      handleAuthSuccess(token);
    }
  }, [location]);

  const handleAuthSuccess = async (token) => {
    setLoading(true);
    try {
      // Fetch user info using the token
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      
      // Update auth context with user info and token
      login(data.user, token);
      
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Redirect to intended destination or subscribe page
      const destination = localStorage.getItem('auth_redirect') || '/subscribe';
      localStorage.removeItem('auth_redirect');
      navigate(destination);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Store current path for redirect after auth
    localStorage.setItem('auth_redirect', location.state?.from?.pathname || '/subscribe');
    
    // Redirect to backend OAuth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-loading">
          <div className="loading-spinner"></div>
          <p>Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <img src="/logo192.png" alt="App Logo" className="auth-logo" />
      <div className="auth-welcome">
        <h1>Welcome to LookerHelp</h1>
        <p>Your AI-powered assistant for Looker expertise. Get instant help with your Looker questions and challenges.</p>
      </div>
      <div className="auth-content">
        {error ? (
          <div className="auth-error">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="retry-button">
              Try Again
            </button>
          </div>
        ) : (
          <button onClick={handleGoogleLogin} className="google-login-button">
            Continue with Google
          </button>
        )}
      </div>
      <div className="auth-footer">
        <p>Secure sign-in powered by Google</p>
        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default Auth;
