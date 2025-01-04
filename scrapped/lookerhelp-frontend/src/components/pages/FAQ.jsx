import React, { useState } from 'react';
import '../../styles/accordion.css';

const FAQ = () => {
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

  const faqs = [
    {
      id: 'what-is',
      question: 'What is LookerHelp?',
      answer: 'LookerHelp is a comprehensive platform designed to assist Looker users with documentation, scripts, AI-powered support, and Live Support.'
    },
    {
      id: 'who-can-use',
      question: 'Who can use LookerHelp?',
      answer: 'LookerHelp is available to anyone interested in Looker, from beginners to advanced users.'
    },
    {
      id: 'affiliation',
      question: 'Is LookerHelp affiliated with Looker or Google?',
      answer: 'No, LookerHelp is an independent platform and is not officially affiliated with Looker or Google.'
    },
    {
      id: 'create-account',
      question: 'How do I create an account?',
      answer: 'You start as a Visitor. To become a Subscriber, authenticate using Google Auth on our website. To upgrade to Looker level, subscribe through our payment system.'
    },
    {
      id: 'access-levels',
      question: 'What are the different access levels?',
      answer: 'We offer three levels: Visitor (basic access), Subscriber (free, authenticated), and Looker (paid).'
    },
    {
      id: 'subscription',
      question: 'Can I upgrade or downgrade my subscription?',
      answer: 'Yes, you can upgrade to Looker level or cancel your subscription at any time from your account settings.'
    },
    {
      id: 'documentation',
      question: 'How do I access the documentation?',
      answer: 'Our documentation is available at docs.lookerhelp.com.'
    },
    {
      id: 'scripts',
      question: 'How can I use the scripts provided?',
      answer: 'Scripts are available to scripts.lookerhelp.com'
    },
    {
      id: 'lookernomicon',
      question: 'What is Lookernomicon?',
      answer: 'Lookernomicon is our AI-powered assistant that can answer Looker-related questions in real-time via Slack for Looker-level subscribers.'
    },
    {
      id: 'issues',
      question: 'What should I do if I encounter an issue with LookerHelp?',
      answer: 'Check our documentation for solutions. If the issue persists, ask for help in our Slack community.'
    },
    {
      id: 'contact',
      question: 'How can I contact support?',
      answer: 'You can reach out via email at dion@wrench.chat or schedule a meeting through the calendar link on our Booking page.'
    },
    {
      id: 'consulting',
      question: 'Do you offer personalized consulting services?',
      answer: 'LookerHelp offers Support which can come in many flavors. Book some time and tell us what you have in mind.'
    }
  ];

  return (
    <div>
      <h1>Frequently Asked Questions (FAQ)</h1>
      <div className="accordion">
        {faqs.map(faq => (
          <div key={faq.id} className="accordion-item">
            <h3 onClick={() => toggleItem(faq.id)} className={`accordion-header ${isOpen(faq.id) ? 'open' : ''}`}>
              {faq.question}
            </h3>
            <div className={`accordion-content ${isOpen(faq.id) ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
