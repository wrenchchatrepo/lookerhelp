import React from 'react';
import { useAuth } from '../../context/AuthContext';
import GoogleSignIn from '../common/GoogleSignIn';
import Accordion from '../common/Accordion';
import '../../styles/single-page.css';

const SinglePage = () => {
  const { isAuthenticated } = useAuth();

  const aboutItems = [
    {
      title: "About Dion Edge",
      content: (
        <div>
          <p>
            Dion Edge is a Looker expert and creator of Lookernomicon, an AI-powered resource for Looker professionals, and a former Looker from Santa Cruz and the Department of Customer Love. With deep expertise in LookML, data modeling, and BI strategy, Dion brings extensive experience as a data engineer and AI/ML solution architect. A nuts-and-bolts engineer with 20 years of hands-on experience, rooted in computational methods, Dion's background spans from BI to advanced analytics, focusing on problems with non-obvious solutions. He is dedicated to empowering data teams through innovative, efficient approaches to complex challenges.
          </p>
          <a href="https://linkedin.com/in/dionedge" target="_blank" rel="noopener noreferrer" className="linkedin-link">
            Connect with me on LinkedIn
          </a>
        </div>
      )
    }
  ];

  const servicesItems = [
    {
      title: "Our Services",
      content: (
        <ul className="services-list">
          <li><strong>Lookernomicon AI Assistant</strong>: Get instant answers to your Looker questions with our AI-powered chatbot.</li>
          <li><strong>Live Looker Support</strong>: As a former team member of Looker's Department of Customer Love, Dion is dedicated to providing the highest level of support to Lookers.</li>
          <li><strong>Weekly Office Hours</strong>: Schedule a 90 min office hours, your time and your agenda.</li>
          <li><strong>Documentation & Scripts</strong>: Articles on all things Looker and BI and Scripts for Admins, Devs, and DevOps to solve common Looker problems.</li>
        </ul>
      )
    }
  ];

  const userGuideItems = [
    {
      title: "Starting",
      content: (
        <ol>
          <li>Visit lookerhelp.com.</li>
          <li>You start as a <strong>Visitor</strong> with access to basic information.</li>
          <li>To become a <strong>Subscriber</strong>, authenticate using Google Auth, access to Docs and Scripts (at no cost).</li>
          <li>To upgrade to <strong>Looker</strong> level, subscribe through Stripe payments, gain access to Lookernomicon in our Slack workspace</li>
        </ol>
      )
    },
    {
      title: "Docs and Scripts",
      content: (
        <ol>
          <li>Use the search function or navigate through categories to find the information you need.</li>
          <li>Review what you found.</li>
          <li>Download for fee</li>
          <li>Or suggest what would like to find.</li>
        </ol>
      )
    },
    {
      title: "Lookernomicon AI",
      content: (
        <ol>
          <li>Access Lookernomicon through our Slack channel.</li>
          <li>Ask questions in natural language.</li>
          <li>Receive instant responses and code snippets.</li>
        </ol>
      )
    },
    {
      title: "Community Participation",
      content: (
        <ol>
          <li>Ask questions and share your insights.</li>
          <li>Participate in discussions and help others.</li>
          <li>Follow our community guidelines for respectful interaction.</li>
        </ol>
      )
    },
    {
      title: "Help",
      content: (
        <ol>
          <li>Check our documentation for common problems and solutions.</li>
          <li>Ask for help in the Slack community.</li>
          <li>For Looker level subscribers, use Lookernomicon for quick answers.</li>
        </ol>
      )
    }
  ];

  const faqItems = [
    {
      title: "What is LookerHelp?",
      content: "LookerHelp is a comprehensive platform designed to assist Looker users with documentation, scripts, AI-powered support, and Live Support."
    },
    {
      title: "Who can use LookerHelp?",
      content: "LookerHelp is available to anyone interested in Looker, from beginners to advanced users."
    },
    {
      title: "Is LookerHelp affiliated with Looker or Google?",
      content: "No, LookerHelp is an independent platform and is not officially affiliated with Looker or Google."
    },
    {
      title: "How do I create an account?",
      content: "You start as a Visitor. To become a Subscriber, authenticate using Google Auth on our website. To upgrade to Looker level, subscribe through our payment system."
    },
    {
      title: "What are the different access levels?",
      content: "We offer three levels: Visitor (basic access), Subscriber (free, authenticated), and Looker (paid)."
    },
    {
      title: "Can I upgrade or downgrade my subscription?",
      content: "Yes, you can upgrade to Looker level or cancel your subscription at any time from your account settings."
    },
    {
      title: "How do I access the documentation?",
      content: "Our documentation is available at docs.lookerhelp.com."
    },
    {
      title: "How can I use the scripts provided?",
      content: "Scripts are available to scripts.lookerhelp.com"
    },
    {
      title: "What is Lookernomicon?",
      content: "Lookernomicon is our AI-powered assistant that can answer Looker-related questions in real-time via Slack for Looker-level subscribers."
    },
    {
      title: "What should I do if I encounter an issue with LookerHelp?",
      content: "Check our documentation for solutions. If the issue persists, ask for help in our Slack community."
    },
    {
      title: "How can I contact support?",
      content: "You can reach out via email at dion@wrench.chat or schedule a meeting through the calendar link on our Booking page."
    },
    {
      title: "Do you offer personalized consulting services?",
      content: "LookerHelp offers Support which can come in many flavors. Book some time and tell us what you have in mind."
    }
  ];

  const legalItems = [
    {
      title: "Use of Services",
      content: (
        <ul>
          <li>You must be 18 years or older to use LookerHelp.</li>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
        </ul>
      )
    },
    {
      title: "User Content",
      content: (
        <ul>
          <li>You retain ownership of any content you submit to LookerHelp.</li>
          <li>By submitting content, you grant LookerHelp a worldwide, non-exclusive license to use, reproduce, and distribute that content.</li>
        </ul>
      )
    },
    {
      title: "Prohibited Activities",
      content: (
        <ul>
          <li>You may not use LookerHelp for any illegal purposes or to violate any laws.</li>
          <li>You may not attempt to gain unauthorized access to any portion of the LookerHelp platform.</li>
        </ul>
      )
    },
    {
      title: "Termination",
      content: "We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason."
    },
    {
      title: "Changes to Terms",
      content: "We may modify these Terms at any time. Your continued use of LookerHelp constitutes agreement to such modifications."
    }
  ];

  return (
    <div className="single-page">
      <section id="welcome" className="section hero">
        <h1>Welcome to LookerHelp</h1>
        <p className="lead">LookerHelp is your comprehensive resource for mastering Looker and enhancing your data analytics capabilities. Our platform offers expert guidance, innovative scripts, and an AI-powered assistant to streamline your Looker experience.</p>
      </section>

      <section id="about" className="section">
        <div className="card">
          <h2>About</h2>
          <p>
            Dion Edge is a Looker expert and creator of Lookernomicon, an AI-powered resource for Looker professionals, and a former Looker from Santa Cruz and the Department of Customer Love. With deep expertise in LookML, data modeling, and BI strategy, Dion brings extensive experience as a data engineer and AI/ML solution architect. A nuts-and-bolts engineer with 20 years of hands-on experience, rooted in computational methods, Dion's background spans from BI to advanced analytics, focusing on problems with non-obvious solutions. He is dedicated to empowering data teams through innovative, efficient approaches to complex challenges.
          </p>
          <a href="https://linkedin.com/in/dionedge" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
        </div>
      </section>

      <section id="services" className="section">
        <div className="card">
          <h2>Services</h2>
          <Accordion items={servicesItems} />
        </div>
      </section>

      <section id="guide" className="section">
        <div className="card">
          <h2>LookerHelp User Guide</h2>
          <p>Welcome to the LookerHelp User Guide. This resource will help you navigate our platform and make the most of our services.</p>
          <Accordion items={userGuideItems} />
        </div>
      </section>

      <section id="faq" className="section">
        <div className="card">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="card">
          <h2>Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-item lookernomicon">
              <h3>Lookernomicon</h3>
              <p className="price">$29/month</p>
              <ul>
                <li>Vertex AI agent, AI powered by Gemini 2.0</li>
                <li>Integrated with Slack for user interactions</li>
                <li>Support for the App is built into Slack</li>
                <li>Real-time Looker-related questions via Slack</li>
                <li>Pause or Cancel Anytime</li>
              </ul>
              <a href="https://buy.stripe.com/7sIg0tbbP1LC8GA3cd" className="button">Subscribe Now</a>
            </div>
            <div className="pricing-item weekly-support">
              <h3>Weekly Support</h3>
              <p className="price">$999/week</p>
              <ul>
                <li>Chat with a real human Looker SME 9AM to 5PM, M-F, CST</li>
                <li>The entire Looker ecosystem: instance, LookML, SQL, Git</li>
                <li>Time to First Response: Urgent &lt; 30 min, Normal &lt; 2 hrs</li>
                <li>Comes with two Lookernomicon seats</li>
                <li>Pause or Cancel Anytime</li>
              </ul>
              <a href="https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL" className="button">Subscribe Now</a>
            </div>
            <div className="pricing-item monthly-support">
              <h3>Monthly Support</h3>
              <p className="price">$3,999/month</p>
              <ul>
                <li>Chat with a real human Looker SME 9AM to 5PM, M-F, CST</li>
                <li>The entire Looker ecosystem: instance, LookML, SQL, Git</li>
                <li>Time to First Response: Urgent &lt; 30 min, Normal &lt; 2 hrs</li>
                <li>Monthly report of issues, performance, best practices</li>
                <li>Comes with five Lookernomicon seats</li>
                <li>Pause or Cancel Anytime</li>
              </ul>
              <a href="https://buy.stripe.com/14kbKdcfTai85uo7su" className="button">Subscribe Now</a>
            </div>
            <div className="pricing-item office-hours">
              <h3>Office Hours</h3>
              <p className="price">$499/month</p>
              <ul>
                <li>90 min weekly Google Meet sessions</li>
                <li>Any Looker or BI topic you want to discuss</li>
                <li>Prepared content with 48hr notice</li>
                <li>Comes with five Lookernomicon seats</li>
                <li>Pause or Cancel Anytime</li>
              </ul>
              <a href="https://buy.stripe.com/dR6g0t3Jn4XO4qk5km" className="button">Subscribe Now</a>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="section">
        <div className="card">
          <h2>Booking</h2>
          <p>Schedule a meeting on Dion's Calendar</p>
          <div className="calendar-widget">
            <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
            <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    window.addEventListener('load', function() {
                      calendar.schedulingButton.load({
                        url: 'https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true',
                        color: '#2cff05',
                        label: 'Book an appointment',
                      });
                    });
                  })();
                `,
              }}
            />
          </div>
        </div>
      </section>

      <section id="legal" className="section">
        <div className="card">
          <h2>Legal and Policies</h2>
          
          <h3>Terms of Service</h3>
          <p>Last Updated: January 2, 2024. Welcome to LookerHelp. By using our services, you agree to these terms. Please read them carefully.</p>
          <Accordion items={legalItems} />

          <h3>Privacy Policy</h3>
          <p>Last Updated: January 2, 2024</p>
          <Accordion items={[
            {
              title: "Information We Collect",
              content: (
                <ul>
                  <li>Personal information you provide (e.g., name, email address)</li>
                  <li>Usage data (e.g., pages visited, time spent on the site)</li>
                  <li>Information from third-party services you connect to your account</li>
                </ul>
              )
            },
            {
              title: "How We Use Your Information",
              content: (
                <ul>
                  <li>To provide and improve our services</li>
                  <li>To communicate with you about your account or our services</li>
                  <li>To personalize your experience on LookerHelp</li>
                </ul>
              )
            },
            {
              title: "Information Sharing",
              content: (
                <ul>
                  <li>We do not sell your personal information to third parties.</li>
                  <li>We may share information with service providers who assist us in operating our website and conducting our business.</li>
                </ul>
              )
            },
            {
              title: "Data Security",
              content: "We implement a variety of security measures to maintain the safety of your personal information."
            },
            {
              title: "Your Rights",
              content: (
                <ul>
                  <li>You have the right to access, correct, or delete your personal information.</li>
                  <li>To exercise these rights, please contact us at dion@wrench.chat.</li>
                </ul>
              )
            }
          ]} />

          <h3>Copyright Notice</h3>
          <p>© 2024 LookerHelp. All rights reserved.</p>
          <p>The content, organization, graphics, design, and other matters related to LookerHelp are protected under applicable copyrights and other proprietary laws, including but not limited to intellectual property laws. The copying, reproduction, use, modification or publication by you of any such matters or any part of the LookerHelp site without our express written permission is strictly prohibited.</p>
        </div>
      </section>

      {!isAuthenticated && (
        <section id="auth" className="section">
          <div className="card">
            <h2>Sign In</h2>
            <p>Sign in to access documentation and scripts:</p>
            <GoogleSignIn />
          </div>
        </section>
      )}
    </div>
  );
};

export default SinglePage;
