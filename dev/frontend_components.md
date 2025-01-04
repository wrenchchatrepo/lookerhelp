# Frontend Component Implementation

## Layout Component (Layout.js)
```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

## Header Component (Header.js)
```jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signIn, signOut } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/">
          <img src="/images/lono_logo_header.png" alt="LookerHelp" className="header-logo" />
        </NavLink>
        
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link">LookerHelp</NavLink>
          <NavLink to="/pricing" className="nav-link">Pricing</NavLink>
          <NavLink to="/booking" className="nav-link">Booking</NavLink>
          <NavLink to="/legal" className="nav-link">Legal</NavLink>
          
          {user ? (
            <button onClick={signOut} className="nav-link sign-in-button">
              Sign Out
            </button>
          ) : (
            <button onClick={signIn} className="nav-link sign-in-button">
              Sign in with Google
            </button>
          )}
        </nav>
        
        <button 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
```

## Accordion Component (Accordion.js)
```jsx
import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button 
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className={`accordion-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
```

## PricingCard Component (PricingCard.js)
```jsx
import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  features, 
  buttonText = "Subscribe",
  stripeLink,
  variant 
}) => {
  return (
    <div className={`pricing-card ${variant}`}>
      <h3>{title}</h3>
      <div className="pricing-price">${price}/month</div>
      <ul className="pricing-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <a 
        href={stripeLink}
        className="pricing-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default PricingCard;
```

## BookingButton Component (BookingButton.js)
```jsx
import React, { useEffect } from 'react';

const BookingButton = () => {
  useEffect(() => {
    // Load Google Calendar script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true',
        color: '2cff05',
        label: 'Book an appointment',
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendar-button-container">
      {/* Button will be injected here by Google Calendar script */}
    </div>
  );
};

export default BookingButton;
```

## Section Component (Section.js)
```jsx
import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`section ${className}`}>
      {title && <h2>{title}</h2>}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
```

## Auth Component (Auth.js)
```jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { signIn } = useAuth();

  return (
    <div className="auth-container">
      <button onClick={signIn} className="google-sign-in">
        <img 
          src="/images/google-icon.png" 
          alt="Google" 
          width="18" 
          height="18" 
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
```

## Home Page Component (pages/Home.js)
```jsx
import React from 'react';
import Section from '../components/Section';
import Accordion from '../components/Accordion';
import BookingButton from '../components/BookingButton';

const Home = () => {
  return (
    <>
      <Section id="welcome" className="hero fade-in">
        <h1>Welcome to LookerHelp</h1>
        <p>Your comprehensive resource for mastering Looker and enhancing your data analytics capabilities.</p>
        <BookingButton />
      </Section>

      <Section id="about">
        <h2>About</h2>
        <p>Dion Edge is a Looker expert and creator of Lookernomicon...</p>
      </Section>

      <Section id="services">
        <h2>Services</h2>
        <ul>
          <li>Lookernomicon AI Assistant</li>
          <li>Live Looker Support</li>
          <li>Weekly Office Hours</li>
          <li>Docs and Scripts</li>
        </ul>
      </Section>

      <Section id="guide">
        <h2>Guide</h2>
        <Accordion title="Getting Started">
          <ol>
            <li>Visit lookerhelp.com</li>
            <li>You start as a Visitor with access to basic information</li>
            <li>To become a Subscriber, authenticate using Google Auth</li>
            <li>To upgrade to Looker level, subscribe through Stripe payments</li>
          </ol>
        </Accordion>
        {/* Additional accordions for other guide sections */}
      </Section>
    </>
  );
};

export default Home;
```

## Context Implementation (context/AuthContext.js)
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Auth Error:', error);
    }
  };

  const signOut = () => firebaseSignOut(auth);

  const value = {
    user,
    signIn,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

This component structure implements all the styling defined in the CSS files while maintaining a clean, modular architecture. Each component is focused on a specific responsibility and uses the CSS classes defined in our styles implementation.
