import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--header-bg);
  z-index: 1000;
  padding: 0 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
  margin-right: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: none;
    
    &.open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      background-color: var(--header-bg);
      padding: 1rem;
    }
  }
`;

const NavButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  background-color: #333333;
  color: var(--header-text);
  text-decoration: none;
  transition: opacity 0.2s;
  border: none;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  min-width: 100px;
  font-family: system-ui, -apple-system, sans-serif;

  &:hover {
    opacity: 0.9;
  }

  &.active {
    color: var(--header-select);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--header-text);
  font-size: 24px;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signIn, signOut } = useAuth();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };
  
  // In demo mode (no Firebase config), simulate auth
  const handleSignIn = () => {
    if (process.env.REACT_APP_FIREBASE_API_KEY === "demo-mode") {
      console.log("Demo Mode: Sign in simulation");
      return;
    }
    signIn();
  };
  
  const handleSignOut = () => {
    if (process.env.REACT_APP_FIREBASE_API_KEY === "demo-mode") {
      console.log("Demo Mode: Sign out simulation");
      return;
    }
    signOut();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo 
          src="/images/lono_logo_header.png" 
          alt="LookerHelp"
          onClick={scrollToTop}
        />
        
        <Nav className={isMenuOpen ? 'open' : ''}>
          <NavButton onClick={scrollToTop}>LookerHelp</NavButton>
          <NavButton onClick={() => scrollToSection('pricing')}>Pricing</NavButton>
          <NavButton onClick={() => scrollToSection('booking')}>Booking</NavButton>
          <NavButton onClick={() => scrollToSection('legal')}>Legal</NavButton>
          
          {user ? (
            <NavButton onClick={handleSignOut}>
              Sign Out
            </NavButton>
          ) : (
            <NavButton onClick={handleSignIn}>
              Sign in with Google
            </NavButton>
          )}
        </Nav>
        
        <HamburgerButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </HamburgerButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
