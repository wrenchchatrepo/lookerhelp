import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Main = styled.main`
  margin-top: 80px; /* Height of the fixed header */
  background-color: var(--background);
`;

const Footer = styled.footer`
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--accent-pink);
    margin-bottom: 1rem;
    font-size: 17px;
  }

  a {
    color: var(--header-text);
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    cursor: pointer;
    
    &:hover {
      color: var(--header-select);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
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
            <a onClick={() => scrollToSection('guide')}>Guide</a>
            <a onClick={() => scrollToSection('pricing')}>Pricing</a>
            <a onClick={() => scrollToSection('booking')}>Booking</a>
            <a onClick={() => scrollToSection('legal')}>Legal</a>
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
