import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--card-bg);
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-headings);
  font-size: 23px;
  color: var(--accent-purple);
  text-align: left;
`;

const AccordionContent = styled.div`
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  background-color: white;

  &.open {
    padding: 1rem;
    max-height: 1000px;
  }
`;

const Arrow = styled.span`
  transition: transform 0.3s ease;
  display: inline-block;

  &.open {
    transform: rotate(180deg);
  }
`;

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContainer>
      <AccordionHeader 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <Arrow className={isOpen ? 'open' : ''}>▼</Arrow>
      </AccordionHeader>
      <AccordionContent className={isOpen ? 'open' : ''}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
