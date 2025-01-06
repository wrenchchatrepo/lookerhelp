import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.8rem;
  text-align: center;
  font-size: 19px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h3`
  color: var(--accent-purple);
  margin-bottom: 0.9rem;
  font-family: var(--font-headings);
  font-size: 23px;
  font-weight: 600;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.9rem;
  color: var(--primary-text);
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.8rem 0;
  flex-grow: 1;

  li {
    margin-bottom: 0.45rem;
    line-height: 1.4;
    
    &:before {
      content: "+";
      margin-right: 0.5rem;
      color: var(--accent-purple);
    }
  }
`;

const SubscribeButton = styled.a`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }

  /* Product-specific styles */
  &.lookernomicon {
    background-color: var(--accent-purple);
    color: var(--header-text);
  }

  &.monthly-support {
    background-color: var(--accent-pink);
    color: var(--header-text);
  }

  &.weekly-hours {
    background-color: var(--accent-green);
    color: var(--primary-text);
  }

  &.weekly-support {
    background-color: var(--accent-cyan);
    color: var(--primary-text);
  }
`;

const PricingCard = ({ 
  title, 
  price, 
  period = "month",
  features, 
  stripeLink,
  variant 
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Price>${price}/{period}</Price>
      <FeatureList>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </FeatureList>
      <SubscribeButton 
        href={stripeLink}
        className={variant}
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe
      </SubscribeButton>
    </Card>
  );
};

export default PricingCard;
