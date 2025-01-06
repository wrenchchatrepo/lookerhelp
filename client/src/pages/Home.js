import React from 'react';
import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';
import Section from '../components/Section';
import Accordion from '../components/Accordion';
import BookingButton from '../components/BookingButton';
import PricingCard from '../components/PricingCard';

const SocialIcon = styled.a`
  color: var(--accent-purple);
  font-size: 1.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-pink);
  }
`;

const Hero = styled(Section)`
  text-align: center;
  background-color: var(--main-bg);
  padding-top: 4rem;
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "-";
      position: absolute;
      left: 0;
      color: var(--accent-purple);
    }
  }
`;

const GuideList = styled.ol`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
`;

const LegalText = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: var(--accent-purple);
  }

  h4 {
    margin: 1.5rem 0 0.5rem;
    color: var(--accent-purple);
  }

  ul {
    list-style: none;
    padding-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &:before {
        content: "-";
        position: absolute;
        left: -1.5rem;
        color: var(--accent-purple);
      }
    }
  }

  p {
    margin-bottom: 1rem;
  }
`;

const pricingData = [
  {
    title: 'Lookernomicon',
    price: 29,
    period: 'month',
    features: [
      'Vertex AI agent',
      'AI powered by Gemini 2.0',
      'Integrated with Slack for user interactions',
      'Support for the App is built into Slack',
      'Lookernomicon is our AI-powered assistant that can answer Looker-related questions in real-time via Slack for subscribers.',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/3cs7tX4Nrcqg2ic9AE',
    variant: 'lookernomicon'
  },
  {
    title: 'Weekly Office Hours',
    price: 499,
    period: 'month',
    features: [
      '90 min, once a week on Google Meet on any Looker or BI topic you want to discuss.',
      'If I know the agenda 48 hrs prior I will come prepared.',
      'If there is no agenda given I will come prepared with a topic and materials I think are germane to your team.',
      'Comes with five Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/7sIg0tbbP1LC8GA3cd',
    variant: 'weekly-hours'
  },
  {
    title: 'Monthly Live Looker Support',
    price: 3999,
    period: 'month',
    features: [
      'Chat with a real human Looker SME 9AM to 5PM, M-F, CST',
      'The entire Looker ecosystem: instance, LookML, SQL, Git',
      'Time to First Response: Urgent < 30 min, Normal < 2 hrs',
      'Monthly report of issues, performance, best practices',
      'Comes with five Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/14kbKdcfTai85uo7su',
    variant: 'monthly-support'
  },
  {
    title: 'Weekly Live Looker Support',
    price: 999,
    period: 'week',
    features: [
      'Chat with a real human Looker SME 9AM to 5PM, M-F',
      'The entire Looker ecosystem: instance, LookML, SQL, Git',
      'Time to First Response: Urgent < 30 min, Normal < 2 hrs',
      'Comes with two Lookernomicon seats',
      'Pause or Cancel Anytime.'
    ],
    stripeLink: 'https://buy.stripe.com/fZe4hL6Vz8a0bSMbIL',
    variant: 'weekly-support'
  }
];

const Home = () => {
  return (
    <>
      <Hero>
        <h1>Welcome to LookerHealth</h1>
        <p>Master Looker with LookerHelp. Get expert support, powerful scripts, and an AI assistant to streamline your data workflows. Imagine instant Slack support and weekly office hours to tackle your toughest Looker challenges. Ready to see what LookerHelp can do for your team? Book a quick Google Meet with Dion.</p>
        <BookingButton />
      </Hero>

      <Section id="about" title="About">
        <p>
          Dion Edge is a Looker expert and creator of Lookernomicon, an AI-powered resource for Looker professionals, and a former Looker from Santa Cruz and the Department of Customer Love. With deep expertise in LookML, data modeling, and BI strategy, Dion brings extensive experience as a data engineer and AI/ML solution architect. A nuts-and-bolts engineer with 20 years of hands-on experience, rooted in computational methods, Dion's background spans from BI to advanced analytics, focusing on problems with non-obvious solutions. He is dedicated to empowering data teams through innovative, efficient approaches to complex challenges.
          <SocialIcon 
            href="https://linkedin.com/in/dionedge" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </SocialIcon>
        </p>
      </Section>

      <Section id="services" title="Services">
        <ServicesList>
          <li>Lookernomicon AI Assistant: Get instant answers to your Looker questions with our AI-powered chatbot.</li>
          <li>Live Looker Support: As a former team member of Looker's Department of Customer Love, Dion is dedicated to providing the highest level of support to Lookers.</li>
          <li>Weekly Office Hours: Schedule a 90 min office hours, your time and your agenda.</li>
          <li>Docs and Scripts: Articles on all things Looker and BI and Scripts for Admins, Devs, and DevOps to solve common Looker problems.</li>
        </ServicesList>
      </Section>

      <Section id="guide" title="Guide">
        <Accordion title="Getting Started">
          <GuideList>
            <li>Visit lookerhelp.com</li>
            <li>You start as a Visitor with access to basic information.</li>
            <li>To become a Subscriber, authenticate using Google Auth, access to Docs and Scripts (at no cost).</li>
            <li>To upgrade to Looker level, subscribe through Stripe payments, gain access to Lookernomicon in our Slack workspace</li>
          </GuideList>
        </Accordion>

        <Accordion title="Docs and Scripts">
          <GuideList>
            <li>Use the search function or navigate through categories to find the information you need.</li>
            <li>Review what you found.</li>
            <li>Download for fee</li>
            <li>Or suggest what would like to find.</li>
          </GuideList>
        </Accordion>

        <Accordion title="Lookernomicon AI">
          <GuideList>
            <li>Access Lookernomicon through our Slack channel.</li>
            <li>Ask questions in natural language.</li>
            <li>Receive instant responses and code snippets.</li>
          </GuideList>
        </Accordion>

        <Accordion title="Community Participation">
          <GuideList>
            <li>Ask questions and share your insights.</li>
            <li>Participate in discussions and help others.</li>
            <li>Follow our community guidelines for respectful interaction.</li>
          </GuideList>
        </Accordion>

        <Accordion title="Help">
          <GuideList>
            <li>Check our documentation for common problems and solutions.</li>
            <li>Ask for help in the Slack community.</li>
            <li>For Looker level subscribers, use Lookernomicon for quick answers.</li>
          </GuideList>
        </Accordion>
      </Section>

      <Section id="faq" title="Frequently Asked Questions">
        <Accordion title="What is LookerHelp?">
          <p>LookerHelp is a comprehensive platform designed to assist Looker users with documentation, scripts, AI-powered support, and Live Support.</p>
        </Accordion>

        <Accordion title="Who can use LookerHelp?">
          <p>LookerHelp is available to anyone interested in Looker, from beginners to advanced users.</p>
        </Accordion>

        <Accordion title="Is LookerHelp affiliated with Looker or Google?">
          <p>No, LookerHelp is an independent platform and is not officially affiliated with Looker or Google.</p>
        </Accordion>

        <Accordion title="How do I create an account?">
          <p>You start as a Visitor. To become a Subscriber, authenticate using Google Auth on our website. To upgrade to Looker level, subscribe through our payment system.</p>
        </Accordion>

        <Accordion title="What are the different access levels?">
          <p>We offer three levels: Visitor (basic access), Subscriber (free, authenticated), and Looker (paid).</p>
        </Accordion>

        <Accordion title="Can I upgrade or downgrade my subscription?">
          <p>Yes, you can upgrade to Looker level or cancel your subscription at any time from your account settings.</p>
        </Accordion>

        <Accordion title="How do I access the documentation?">
          <p>Our documentation is available at docs.lookerhelp.com.</p>
        </Accordion>

        <Accordion title="How can I use the scripts provided?">
          <p>Scripts are available to scripts.lookerhelp.com</p>
        </Accordion>

        <Accordion title="What is Lookernomicon?">
          <p>Lookernomicon is our AI-powered assistant that can answer Looker-related questions in real-time via Slack for Looker-level subscribers.</p>
        </Accordion>

        <Accordion title="What should I do if I encounter an issue with LookerHelp?">
          <p>Check our documentation for solutions. If the issue persists, ask for help in our Slack community.</p>
        </Accordion>

        <Accordion title="How can I contact support?">
          <p>You can reach out via email at dion@wrench.chat or schedule a meeting through the calendar link on our Booking page.</p>
        </Accordion>

        <Accordion title="Do you offer personalized consulting services?">
          <p>LookerHelp offers Support which can come in many flavors. Book some time and tell us what you have in mind.</p>
        </Accordion>
      </Section>

      <Section id="pricing" title="Pricing">
        <PricingGrid>
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              stripeLink={plan.stripeLink}
              variant={plan.variant}
            />
          ))}
        </PricingGrid>
      </Section>

      <Section id="legal" title="Legal and Policies">
        <Accordion title="Terms of Service">
          <LegalText>
            <h3>Last Updated: January 2, 2025</h3>
            <p>Welcome to LookerHelp. By using our services, you agree to these terms. Please read them carefully.</p>
            
            <h4>1. Use of Services</h4>
            <ul>
              <li>You must be 18 years or older to use LookerHelp.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
            </ul>

            <h4>2. User Content</h4>
            <ul>
              <li>You retain ownership of any content you submit to LookerHelp.</li>
              <li>By submitting content, you grant LookerHelp a worldwide, non-exclusive license to use, reproduce, and distribute that content.</li>
            </ul>

            <h4>3. Prohibited Activities</h4>
            <ul>
              <li>You may not use LookerHelp for any illegal purposes or to violate any laws.</li>
              <li>You may not attempt to gain unauthorized access to any portion of the LookerHelp platform.</li>
            </ul>

            <h4>4. Termination</h4>
            <ul>
              <li>We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</li>
            </ul>

            <h4>5. Changes to Terms</h4>
            <ul>
              <li>We may modify these Terms at any time. Your continued use of LookerHelp constitutes agreement to such modifications.</li>
            </ul>
          </LegalText>
        </Accordion>

        <Accordion title="Privacy Policy">
          <LegalText>
            <h3>Last Updated: January 2, 2025</h3>

            <h4>1. Information We Collect</h4>
            <ul>
              <li>Personal information you provide (e.g., name, email address)</li>
              <li>Usage data (e.g., pages visited, time spent on the site)</li>
              <li>Information from third-party services you connect to your account</li>
            </ul>

            <h4>2. How We Use Your Information</h4>
            <ul>
              <li>To provide and improve our services</li>
              <li>To communicate with you about your account or our services</li>
              <li>To personalize your experience on LookerHelp</li>
            </ul>

            <h4>3. Information Sharing</h4>
            <ul>
              <li>We do not sell your personal information to third parties.</li>
              <li>We may share information with service providers who assist us in operating our website and conducting our business.</li>
            </ul>

            <h4>4. Data Security</h4>
            <ul>
              <li>We implement a variety of security measures to maintain the safety of your personal information.</li>
            </ul>

            <h4>5. Your Rights</h4>
            <ul>
              <li>You have the right to access, correct, or delete your personal information.</li>
              <li>To exercise these rights, please contact us at dion@wrench.chat.</li>
            </ul>
          </LegalText>
        </Accordion>

        <Accordion title="Acceptable Use Policy">
          <LegalText>
            <p>By using LookerHelp, you agree to comply with this Acceptable Use Policy. Violation of this policy may result in the termination of your access to LookerHelp.</p>

            <h4>1. Prohibited Activities</h4>
            <ul>
              <li>Violating any applicable laws or regulations</li>
              <li>Harassing, threatening, or intimidating other users</li>
              <li>Impersonating any person or entity</li>
              <li>Interfering with or disrupting the LookerHelp services</li>
            </ul>

            <h4>2. Content Standards</h4>
            <ul>
              <li>All user-generated content must be accurate and comply with applicable laws.</li>
              <li>Content must not infringe on any patents, trademarks, trade secrets, copyrights, or other proprietary rights.</li>
            </ul>

            <h4>3. Security</h4>
            <ul>
              <li>Users must not attempt to gain unauthorized access to any portion of the LookerHelp platform or any other systems or networks connected to LookerHelp.</li>
            </ul>

            <h4>4. Reporting Violations</h4>
            <ul>
              <li>If you become aware of any violation of this Acceptable Use Policy, please report it to dion@wrench.chat.</li>
            </ul>
          </LegalText>
        </Accordion>

        <Accordion title="Copyright Notice">
          <LegalText>
            <p>© 2025 LookerHelp. All rights reserved.</p>
            <p>The content, organization, graphics, design, and other matters related to LookerHelp are protected under applicable copyrights and other proprietary laws, including but not limited to intellectual property laws. The copying, reproduction, use, modification or publication by you of any such matters or any part of the LookerHelp site without our express written permission is strictly prohibited.</p>
          </LegalText>
        </Accordion>
      </Section>
    </>
  );
};

export default Home;
