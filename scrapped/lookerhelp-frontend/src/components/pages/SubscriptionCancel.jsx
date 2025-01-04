import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="subscription-result cancel">
      <h2>Subscription Cancelled</h2>
      <p>Your subscription process was cancelled.</p>
      <p>If you experienced any issues or have questions, please don't hesitate to contact us.</p>
      <div className="action-buttons">
        <button 
          onClick={() => navigate('/pricing')}
          className="primary-button"
        >
          Return to Pricing
        </button>
        <button 
          onClick={() => navigate('/faq')}
          className="secondary-button"
        >
          View FAQ
        </button>
      </div>
      <div className="help-text">
        <p>Common reasons for cancellation:</p>
        <ul>
          <li>Need more information about the plans</li>
          <li>Technical issues during checkout</li>
          <li>Payment method concerns</li>
        </ul>
        <p>Feel free to try again when you're ready or contact support for assistance.</p>
      </div>
    </div>
  );
};

export default SubscriptionCancel;
