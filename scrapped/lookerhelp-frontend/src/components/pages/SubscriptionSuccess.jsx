import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingState from '../common/LoadingState';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { updateSubscriptionStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        // Check subscription status
        const response = await fetch('/auth/subscription', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to verify subscription');
        }

        const data = await response.json();
        updateSubscriptionStatus(data.status);

        // Redirect to documentation after short delay
        setTimeout(() => {
          navigate('/documentation');
        }, 3000);
      } catch (err) {
        setError(err.message);
        console.error('Subscription verification error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    verifySubscription();
  }, [navigate, updateSubscriptionStatus]);

  if (isLoading) {
    return <LoadingState message="Verifying your subscription..." />;
  }

  if (error) {
    return (
      <div className="subscription-result error">
        <h2>Subscription Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/pricing')}>
          Return to Pricing
        </button>
      </div>
    );
  }

  return (
    <div className="subscription-result success">
      <h2>Thank You for Subscribing!</h2>
      <p>Your subscription has been activated successfully.</p>
      <p>You will be redirected to the documentation in a few seconds...</p>
      <button onClick={() => navigate('/documentation')}>
        Go to Documentation Now
      </button>
    </div>
  );
};

export default SubscriptionSuccess;
