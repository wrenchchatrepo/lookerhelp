import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingState from './LoadingState';

const SUBSCRIPTION_PLANS = [
  {
    id: 'price_weekly_live',
    name: 'Weekly Live Support',
    description: 'One-on-one live support sessions every week',
    price: '$49/week',
    features: [
      'Weekly 30-minute live support session',
      'Access to documentation',
      'Access to scripts',
      'Slack workspace access'
    ]
  },
  {
    id: 'price_monthly_office',
    name: 'Monthly Office Hours',
    description: 'Regular office hours and support',
    price: '$149/month',
    features: [
      'Monthly office hours access',
      'Access to documentation',
      'Access to scripts',
      'Slack workspace access'
    ]
  },
  {
    id: 'price_app_access',
    name: 'Basic Access',
    description: 'Access to all basic features',
    price: '$29/month',
    features: [
      'Access to documentation',
      'Access to scripts',
      'Slack workspace access'
    ]
  }
];

const SubscriptionPlans = () => {
  const { user, updateSubscriptionStatus } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async (priceId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/subscription/success`,
          cancelUrl: `${window.location.origin}/subscription/cancel`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err.message);
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Preparing checkout..." />;
  }

  return (
    <div className="subscription-plans">
      <h2>Choose Your Plan</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <div className="plans-container">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <p className="description">{plan.description}</p>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              className="subscribe-button"
              onClick={() => handleSubscribe(plan.id)}
              disabled={user?.subscription_status}
            >
              {user?.subscription_status ? 'Already Subscribed' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
