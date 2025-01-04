import React from 'react';
import { Link } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const NavigationBar = () => {
  const { isAuthenticated, hasSubscription } = useAuth();

  return (
    <nav className="navigation-bar">
      <div className="nav-brand">
        <Link to="/" className="nav-logo-button">
          <img src={logo} alt="LookerHelp Logo" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/#welcome">Home</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#guide">Guide</Link>
        <Link to="/#faq">FAQ</Link>
        <Link to="/#pricing">Pricing</Link>
        <Link to="/#booking">Booking</Link>
        <Link to="/#legal">Legal</Link>
        {isAuthenticated && (
          <>
            <Link to="/#documentation">Documentation</Link>
            <Link to="/#scripts">Scripts</Link>
          </>
        )}
      </div>
      <div className="nav-auth">
        {isAuthenticated ? (
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
          }}>
            Sign Out
          </button>
        ) : (
          <GoogleSignIn />
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
