import React from 'react';
import '../../styles/pricing.css';

const Pricing = () => {
  return (
    <div className="pricing-container">
      <div className="pricing-options">
        <div className="pricing-card">
          <h2>Lookernomicon</h2>
          <ul>
            <li>$29 per month recurring</li>
            <li>Vertex AI agent with Data Stores</li>
            <li>Powered by Gemini 2.0</li>
            <li>Integrated with Slack:</li>
            <li>Support and Community built in</li>
            <li>Pause or Cancel Anytime.</li>
          </ul>
          <a 
            href="https://buy.stripe.com/7sIg0tbbP1LC8GA3cd"
            className="payment-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
        </div>

        <div className="pricing-card">
          <h2>Weekly Live Looker Support</h2>
          <ul>
            <li>$999 per week recurring</li>
            <li>Live Chat with a Looker SME</li>
            <li>9AM to 5PM, M-F, CST</li>
            <li>Time to First Response:</li>
            <li>Urgent &lt; 30 min, Normal &lt; 2 hrs</li>
            <li>Comes with two Lookernomicon seats</li>
            <li>Pause or Cancel Anytime.</li>
          </ul>
          <a 
            href="https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL"
            className="payment-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
        </div>

        <div className="pricing-card">
          <h2>Monthly Live Looker Support</h2>
          <ul>
            <li>$3,999 per month recurring</li>
            <li>Live Chat with a Looker SME</li>
            <li>9AM to 5PM, M-F, CST</li>
            <li>Time to First Response:</li>
            <li>Urgent &lt; 30 min, Normal &lt; 2 hrs</li>
            <li>Monthly health report of issues, performance, best practices</li>
            <li>Comes with five Lookernomicon seats</li>
            <li>Pause or Cancel Anytime.</li>
          </ul>
          <a 
            href="https://buy.stripe.com/14kbKdcfTai85uo7su"
            className="payment-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
        </div>

        <div className="pricing-card">
          <h2>Weekly Office Hours</h2>
          <ul>
            <li>$499 per month recurring</li>
            <li>90 min, once a week on Google Meet:</li>
            <li>Any Looker or BI topic or issues you want to discuss.</li>
            <li>Comes with five Lookernomicon seats</li>
            <li>Pause or Cancel Anytime.</li>
          </ul>
          <a 
            href="https://buy.stripe.com/dR6g0t3Jn4XO4qk5km"
            className="payment-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
