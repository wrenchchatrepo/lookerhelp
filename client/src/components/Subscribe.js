import React from 'react';
import '../styles/subscribe.css';

const Subscribe = () => {
  const subscriptionPlans = [
    {
      name: 'Weekly Live Support',
      description: 'One-on-one live support sessions every week',
      price: '$999/week',
      link: process.env.REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_LIVE
    },
    {
      name: 'Monthly Live Support',
      description: 'Chat with a real human Looker SME',
      price: '$3999/month',
      link: process.env.REACT_APP_STRIPE_PAYMENT_LINK_MONTHLY_LIVE
    },
    {
      name: 'Weekly Office Hours',
      description: '90 min weekly office hours',
      price: '$499/month',
      link: process.env.REACT_APP_STRIPE_PAYMENT_LINK_WEEKLY_OFFICE
    },
    {
      name: 'Lookernomicon',
      description: 'AI-powered Looker assistant',
      price: '$29/month',
      link: process.env.REACT_APP_STRIPE_PAYMENT_LINK_APP
    }
  ];

  return (
    <div className="subscription-container">
      <h1>Choose Your Plan</h1>
      <div className="plans-grid">
        {subscriptionPlans.map((plan) => (
          <div key={plan.name} className="plan-card">
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <p className="price">{plan.price}</p>
            <a 
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="subscribe-button"
            >
              Subscribe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
