import React, { useState, useEffect } from 'react';
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
  font-size: 23px;
  cursor: pointer;
  text-align: center;
  min-width: 100px;
  font-family: var(--font-primary);

  &:hover {
    opacity: 0.9;
  }

  &.active {
    color: #39FF14;
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
  const [activeSection, setActiveSection] = useState('home');
  const { user, signIn, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Check if we're at the top of the page
      if (scrollPosition < window.innerHeight / 2) {
        setActiveSection('home');
        return;
      }

      // Check pricing section
      const pricingElement = document.getElementById('pricing');
      if (pricingElement) {
        const { top, bottom } = pricingElement.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActiveSection('pricing');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    setActiveSection('home');
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
          <NavButton 
            onClick={scrollToTop}
            className={activeSection === 'home' ? 'active' : ''}
          >
            LookerHelp
          </NavButton>
          <NavButton 
            onClick={() => scrollToSection('pricing')}
            className={activeSection === 'pricing' ? 'active' : ''}
          >
            Pricing
          </NavButton>
          <NavButton 
            onClick={() => window.open('https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true', '_blank')}
          >
            Booking
          </NavButton>
          <NavButton 
            onClick={() => {
              scrollToSection('legal');
              setActiveSection('legal');
            }}
            className={activeSection === 'legal' ? 'active' : ''}
          >
            Legal
          </NavButton>
          
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
