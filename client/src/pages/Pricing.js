import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import PricingCard from '../components/PricingCard';

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
  padding: 1.8rem 0;
`;

const pricingData = [
  {
    title: 'Lookernomicon',
    price: 29,
    period: 'month',
    features: [
      'Vertex AI agent',
      'AI powered by Gemini 2.0',
      'Integrated with Slack for user interactions',
      'Support for the App is built into Slack',
      'Lookernomicon is our AI-powered assistant that can answer Looker-related questions in real-time via Slack for subscribers.',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE',
    variant: 'lookernomicon'
  },
  {
    title: 'Weekly Office Hours',
    price: 499,
    period: 'month',
    features: [
      '90 min, once a week on Google Meet on any Looker or BI topic you want to discuss.',
      'If I know the agenda 48 hrs prior I will come prepared.',
      'If there is no agenda given I will come prepared with a topic and materials I think are germane to your team.',
      'Comes with five Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/7sIg0tbbP1LC8GA3cd',
    variant: 'weekly-hours'
  },
  {
    title: 'Monthly Live Looker Support',
    price: 3999,
    period: 'month',
    features: [
      'Chat with a real human Looker SME 9AM to 5PM, M-F, CST',
      'The entire Looker ecosystem: instance, LookML, SQL, Git',
      'Time to First Response: Urgent < 30 min, Normal < 2 hrs',
      'Monthly report of issues, performance, best practices',
      'Comes with five Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/14kbKdcfTai85uo7su',
    variant: 'monthly-support'
  },
  {
    title: 'Weekly Live Looker Support',
    price: 999,
    period: 'week',
    features: [
      'Chat with a real human Looker SME 9AM to 5PM, M-F',
      'The entire Looker ecosystem: instance, LookML, SQL, Git',
      'Time to First Response: Urgent < 30 min, Normal < 2 hrs',
      'Comes with two Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL',
    variant: 'weekly-support'
  }
];

const Pricing = () => {
  return (
    <Section title="Pricing">
      <PricingGrid>
        {pricingData.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            stripeLink={plan.stripeLink}
            variant={plan.variant}
          />
        ))}
      </PricingGrid>
    </Section>
  );
};

export default Pricing;
