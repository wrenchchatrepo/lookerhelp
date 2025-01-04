import React, { useState } from 'react';
import '../../styles/accordion.css';

const Guide = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isOpen = (id) => openItems.has(id);

  return (
    <div className="guide-container">
      <h2>LookerHelp User Guide</h2>
      <div className="accordion">
        <div className="accordion-item">
          <h3 onClick={() => toggleItem('starting')} className={`accordion-header ${isOpen('starting') ? 'open' : ''}`}>
            Starting
          </h3>
          <div className={`accordion-content ${isOpen('starting') ? 'open' : ''}`}>
            <ol>
              <li>Visit [lookerhelp.com](#).</li>
              <li>You start as a <strong>Visitor</strong> with access to basic information.</li>
              <li>To become a <strong>Subscriber</strong>, authenticate using Google Auth, access to Docs and Scripts (at no cost).</li>
              <li>To upgrade to <strong>Looker</strong> level, subscribe through Stripe payments, gain access to Lookernomicon in our Slack workspace</li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h3 onClick={() => toggleItem('docs')} className={`accordion-header ${isOpen('docs') ? 'open' : ''}`}>
            Docs and Scripts
          </h3>
          <div className={`accordion-content ${isOpen('docs') ? 'open' : ''}`}>
            <ol>
              <li>Use the search function or navigate through categories to find the information you need.</li>
              <li>Review what you found.</li>
              <li>Download for fee</li>
              <li>Or suggest what would like to find.</li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h3 onClick={() => toggleItem('ai')} className={`accordion-header ${isOpen('ai') ? 'open' : ''}`}>
            Lookernomicon AI
          </h3>
          <div className={`accordion-content ${isOpen('ai') ? 'open' : ''}`}>
            <ol>
              <li>Access Lookernomicon through our Slack channel.</li>
              <li>Ask questions in natural language.</li>
              <li>Receive instant responses and code snippets.</li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h3 onClick={() => toggleItem('community')} className={`accordion-header ${isOpen('community') ? 'open' : ''}`}>
            Community Participation
          </h3>
          <div className={`accordion-content ${isOpen('community') ? 'open' : ''}`}>
            <ol>
              <li>Ask questions and share your insights.</li>
              <li>Participate in discussions and help others.</li>
              <li>Follow our community guidelines for respectful interaction.</li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h3 onClick={() => toggleItem('help')} className={`accordion-header ${isOpen('help') ? 'open' : ''}`}>
            Help
          </h3>
          <div className={`accordion-content ${isOpen('help') ? 'open' : ''}`}>
            <ol>
              <li>Check our documentation for common problems and solutions.</li>
              <li>Ask for help in the Slack community.</li>
              <li>For Looker level subscribers, use Lookernomicon for quick answers.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
