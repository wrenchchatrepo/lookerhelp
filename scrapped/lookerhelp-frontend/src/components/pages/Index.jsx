import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/accordion.css';

const Index = () => {
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
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to LookerHelp</h1>
        <p className="lead">Your comprehensive resource for mastering Looker and enhancing your data analytics capabilities. Our platform offers expert guidance, innovative scripts, and an AI-powered assistant to streamline your Looker experience.</p>
      </section>

      <section className="about card">
        <h2>About</h2>
        <p>
          Dion Edge is a Looker expert and creator of Lookernomicon, an AI-powered resource for Looker professionals, and a former Looker from Santa Cruz and the Department of Customer Love. With deep expertise in LookML, data modeling, and BI strategy, Dion brings extensive experience as a data engineer and AI/ML solution architect. A nuts-and-bolts engineer with 20 years of hands-on experience, rooted in computational methods, Dion's background spans from BI to advanced analytics, focusing on problems with non-obvious solutions. He is dedicated to empowering data teams through innovative, efficient approaches to complex challenges.
        </p>
        <a href="https://linkedin.com/in/dionedge" target="_blank" rel="noopener noreferrer" className="linkedin-link">Connect on LinkedIn</a>
      </section>

      <section className="services card">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Lookernomicon AI Assistant</h3>
            <p>Get instant answers to your Looker questions with our AI-powered chatbot.</p>
          </div>
          <div className="service-item">
            <h3>Live Looker Support</h3>
            <p>As a former team member of Looker's Department of Customer Love, Dion is dedicated to providing the highest level of support to Lookers.</p>
          </div>
          <div className="service-item">
            <h3>Weekly Office Hours</h3>
            <p>Schedule a 90 min office hours, your time and your agenda.</p>
          </div>
          <div className="service-item">
            <h3>Docs and Scripts</h3>
            <p>Articles on all things Looker and BI and Scripts for Admins, Devs, and DevOps to solve common Looker problems.</p>
          </div>
        </div>
      </section>

      <section className="user-guide card">
        <h2>LookerHelp User Guide</h2>
        <p>Welcome to the LookerHelp User Guide. This resource will help you navigate our platform and make the most of our services.</p>
        
        <div className="accordion">
          <div className="accordion-item">
            <button className={`accordion-header ${isOpen('starting') ? 'active' : ''}`} onClick={() => toggleItem('starting')}>
              Getting Started
            </button>
            <div className={`accordion-content ${isOpen('starting') ? 'active' : ''}`}>
              <ol>
                <li>Visit <Link to="/">lookerhelp.com</Link></li>
                <li>You start as a <strong>Visitor</strong> with access to basic information.</li>
                <li>To become a <strong>Subscriber</strong>, authenticate using Google Auth, access to Docs and Scripts (at no cost).</li>
                <li>To upgrade to <strong>Looker</strong> level, subscribe through Stripe payments, gain access to Lookernomicon in our Slack workspace.</li>
              </ol>
            </div>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${isOpen('docs') ? 'active' : ''}`} onClick={() => toggleItem('docs')}>
              Docs and Scripts
            </button>
            <div className={`accordion-content ${isOpen('docs') ? 'active' : ''}`}>
              <ol>
                <li>Use the search function or navigate through categories to find the information you need.</li>
                <li>Review what you found.</li>
                <li>Download for fee.</li>
                <li>Or suggest what you would like to find.</li>
              </ol>
            </div>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${isOpen('ai') ? 'active' : ''}`} onClick={() => toggleItem('ai')}>
              Lookernomicon AI
            </button>
            <div className={`accordion-content ${isOpen('ai') ? 'active' : ''}`}>
              <ol>
                <li>Access Lookernomicon through our Slack channel.</li>
                <li>Ask questions in natural language.</li>
                <li>Receive instant responses and code snippets.</li>
              </ol>
            </div>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${isOpen('community') ? 'active' : ''}`} onClick={() => toggleItem('community')}>
              Community Participation
            </button>
            <div className={`accordion-content ${isOpen('community') ? 'active' : ''}`}>
              <ol>
                <li>Ask questions and share your insights.</li>
                <li>Participate in discussions and help others.</li>
                <li>Follow our community guidelines for respectful interaction.</li>
              </ol>
            </div>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${isOpen('help') ? 'active' : ''}`} onClick={() => toggleItem('help')}>
              Help
            </button>
            <div className={`accordion-content ${isOpen('help') ? 'active' : ''}`}>
              <ol>
                <li>Check our documentation for common problems and solutions.</li>
                <li>Ask for help in the Slack community.</li>
                <li>For Looker level subscribers, use Lookernomicon for quick answers.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="contact card">
        <h2>Need Help?</h2>
        <p>For additional assistance, don't hesitate to reach out via email at <a href="mailto:dion@wrench.chat">dion@wrench.chat</a> or schedule a meeting through the provided calendar link.</p>
        <Link to="/booking" className="button">Schedule a Meeting</Link>
      </section>
    </div>
  );
};

export default Index;
