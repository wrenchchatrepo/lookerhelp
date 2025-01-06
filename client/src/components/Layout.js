import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Main = styled.main`
  margin-top: 72px; /* Reduced from header height */
  background-color: var(--background);
`;

const Footer = styled.footer`
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 1.8rem 0;
  margin-top: 3.6rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--accent-pink);
    margin-bottom: 0.9rem;
    font-size: 17px;
  }

  a {
    color: var(--header-text);
    text-decoration: none;
    display: block;
    margin-bottom: 0.45rem;
    cursor: pointer;
    
    &:hover {
      color: var(--header-select);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 1.8rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Layout = ({ children }) => {
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
  };

  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>About LookerHelp</h3>
            <p>Your comprehensive resource for mastering Looker and enhancing your data analytics capabilities.</p>
          </FooterSection>
          <FooterSection>
            <h3>Quick Links</h3>
            <a href="#guide" onClick={(e) => { e.preventDefault(); scrollToSection('guide'); }}>Guide</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }}>Booking</a>
            <a href="#legal" onClick={(e) => { e.preventDefault(); scrollToSection('legal'); }}>Legal</a>
          </FooterSection>
          <FooterSection>
            <h3>Contact</h3>
            <p>Email: dion@wrench.chat</p>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} LookerHelp. All rights reserved.</p>
        </FooterBottom>
      </Footer>
    </>
  );
};

export default Layout;
