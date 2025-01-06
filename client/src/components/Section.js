import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 1.8rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--main-bg);
  
  /* Reduce spacing between sections */
  & + & {
    margin-top: 1.8rem;
  }

  @media (max-width: 768px) {
    padding: 1.35rem 0.9rem;
  }
`;

const SectionTitle = styled.h2`
  color: var(--accent-purple);
  margin-bottom: 1.8rem;
  font-family: var(--font-headings);
  font-size: 23px;
  font-weight: 600;
`;

const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 19px;
  color: var(--primary-text);
  line-height: 1.5;
`;

const Section = ({ id, title, children, className = '' }) => {
  return (
    <StyledSection id={id} className={`fade-in ${className}`}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <SectionContent>
        {children}
      </SectionContent>
    </StyledSection>
  );
};

export default Section;
