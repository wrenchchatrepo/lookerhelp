import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Accordion from '../components/Accordion';

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

const Legal = () => {
  return (
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
  );
};

export default Legal;
