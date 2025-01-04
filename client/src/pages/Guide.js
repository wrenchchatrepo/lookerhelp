import React, { useState } from 'react';
import '../styles/pages.css';

const Guide = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: <>
        1. Visit <a href="/">lookerhelp.com</a>
        2. You start as a <strong>Visitor</strong> with access to basic information
        3. To become a <strong>Subscriber</strong>, authenticate using Google Auth, access to Docs and Scripts (at no cost)
        4. To upgrade to <strong>Looker</strong> level, subscribe through Stripe payments, gain access to Lookernomicon in our Slack workspace
      </>
    },
    {
      id: 'account-levels',
      title: 'Account Levels',
      content: <>
        <p>Different account levels provide varying levels of access to our platform:</p>
        <ul>
          <li><strong>Visitor</strong> - Basic information access</li>
          <li><strong>Subscriber</strong> - Access to Docs and Scripts</li>
          <li><strong>Looker</strong> - Full access including Lookernomicon AI and Slack</li>
        </ul>
      </>
    },
    {
      id: 'navigating-lookerhelp',
      title: 'Navigating LookerHelp',
      content: <>
        <p>Learn how to navigate through our platform efficiently:</p>
        <ul>
          <li>Use the navigation menu to access different sections</li>
          <li>Browse documentation by category</li>
          <li>Access scripts and tools based on your subscription level</li>
        </ul>
      </>
    },
    {
      id: 'using-documentation',
      title: 'Using Documentation',
      content: <>
        <p>Our documentation is structured to cater to all skill levels:</p>
        <ul>
          <li>Beginner guides</li>
          <li>Advanced tutorials</li>
          <li>Best practices</li>
          <li>Troubleshooting guides</li>
        </ul>
        <p>Use the search function or navigate through categories to find the information you need.</p>
      </>
    },
    {
      id: 'accessing-scripts',
      title: 'Accessing and Using Scripts',
      content: <>
        <p>For Looker level subscribers:</p>
        <ol>
          <li>Navigate to the Scripts section</li>
          <li>Browse or search for relevant scripts</li>
          <li>Click on a script to view details and usage instructions</li>
          <li>Copy the script for use in your Looker instance</li>
        </ol>
        <p>Remember to always test scripts in a non-production environment first.</p>
      </>
    },
    {
      id: 'lookernomicon',
      title: 'Interacting with Lookernomicon AI',
      content: <>
        <p>Lookernomicon, our AI assistant, is available to Looker level subscribers:</p>
        <ol>
          <li>Access Lookernomicon through our Slack channel</li>
          <li>Ask questions in natural language</li>
          <li>Receive instant responses and code snippets</li>
        </ol>
      </>
    },
    {
      id: 'community',
      title: 'Community Participation',
      content: <>
        <p>Engage with fellow Looker professionals in our Slack community:</p>
        <ul>
          <li>Ask questions and share your insights</li>
          <li>Participate in discussions and help others</li>
          <li>Follow our community guidelines for respectful interaction</li>
        </ul>
      </>
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      content: <>
        <p>If you encounter any issues:</p>
        <ol>
          <li>Check our documentation for common problems and solutions</li>
          <li>Ask for help in the Slack community</li>
          <li>For Looker level subscribers, use Lookernomicon for quick answers</li>
        </ol>
        <p>For additional assistance, don't hesitate to reach out via email at <a href="mailto:dion@wrench.chat">dion@wrench.chat</a> or schedule a meeting through the provided calendar link.</p>
      </>
    }
  ];

  return (
    <div className="guide-page">
      <h2 className="section-title">LookerHelp User Guide</h2>
      <div className="accordion">
        {sections.map(section => (
          <div key={section.id} className="accordion-item">
            <button
              className={`accordion-header ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              <span className="accordion-icon">{activeSection === section.id ? '−' : '+'}</span>
            </button>
            <div className={`accordion-content ${activeSection === section.id ? 'active' : ''}`}>
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
