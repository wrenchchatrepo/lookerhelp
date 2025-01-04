import React, { useState } from 'react';
import '../../styles/accordion.css';

const Legal = () => {
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
    <div>
      <h1>Legal and Policies</h1>

      <div className="accordion">
        <div className="accordion-item">
          <h2 onClick={() => toggleItem('terms')} className={`accordion-header ${isOpen('terms') ? 'open' : ''}`}>
            Terms of Service
          </h2>
          <div className={`accordion-content ${isOpen('terms') ? 'open' : ''}`}>
            <h3>Last Updated: January 2, 2024. Welcome to LookerHelp. By using our services, you agree to these terms. Please read them carefully.</h3>
            <ol>
              <li>
                <strong>Use of Services</strong>
                <ul>
                  <li>You must be 18 years or older to use LookerHelp.</li>
                  <li>You are responsible for maintaining the confidentiality of your account.</li>
                </ul>
              </li>
              <li>
                <strong>User Content</strong>
                <ul>
                  <li>You retain ownership of any content you submit to LookerHelp.</li>
                  <li>By submitting content, you grant LookerHelp a worldwide, non-exclusive license to use, reproduce, and distribute that content.</li>
                </ul>
              </li>
              <li>
                <strong>Prohibited Activities</strong>
                <ul>
                  <li>You may not use LookerHelp for any illegal purposes or to violate any laws.</li>
                  <li>You may not attempt to gain unauthorized access to any portion of the LookerHelp platform.</li>
                </ul>
              </li>
              <li>
                <strong>Termination</strong>
                <ul>
                  <li>We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</li>
                </ul>
              </li>
              <li>
                <strong>Changes to Terms</strong>
                <ul>
                  <li>We may modify these Terms at any time. Your continued use of LookerHelp constitutes agreement to such modifications.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h2 onClick={() => toggleItem('privacy')} className={`accordion-header ${isOpen('privacy') ? 'open' : ''}`}>
            Privacy Policy
          </h2>
          <div className={`accordion-content ${isOpen('privacy') ? 'open' : ''}`}>
            <h3>Last Updated: January 2, 2024</h3>
            <ol>
              <li>
                <strong>Information We Collect</strong>
                <ul>
                  <li>Personal information you provide (e.g., name, email address)</li>
                  <li>Usage data (e.g., pages visited, time spent on the site)</li>
                  <li>Information from third-party services you connect to your account</li>
                </ul>
              </li>
              <li>
                <strong>How We Use Your Information</strong>
                <ul>
                  <li>To provide and improve our services</li>
                  <li>To communicate with you about your account or our services</li>
                  <li>To personalize your experience on LookerHelp</li>
                </ul>
              </li>
              <li>
                <strong>Information Sharing</strong>
                <ul>
                  <li>We do not sell your personal information to third parties.</li>
                  <li>We may share information with service providers who assist us in operating our website and conducting our business.</li>
                </ul>
              </li>
              <li>
                <strong>Data Security</strong>
                <ul>
                  <li>We implement a variety of security measures to maintain the safety of your personal information.</li>
                </ul>
              </li>
              <li>
                <strong>Your Rights</strong>
                <ul>
                  <li>You have the right to access, correct, or delete your personal information.</li>
                  <li>To exercise these rights, please contact us at dion@wrench.chat.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div className="accordion-item">
          <h2 onClick={() => toggleItem('acceptable-use')} className={`accordion-header ${isOpen('acceptable-use') ? 'open' : ''}`}>
            Acceptable Use Policy
          </h2>
          <div className={`accordion-content ${isOpen('acceptable-use') ? 'open' : ''}`}>
            <h3>By using LookerHelp, you agree to comply with this Acceptable Use Policy. Violation of this policy may result in the termination of your access to LookerHelp.</h3>
            <ol>
              <li>
                <strong>Prohibited Activities</strong>
                <ul>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Harassing, threatening, or intimidating other users</li>
                  <li>Impersonating any person or entity</li>
                  <li>Interfering with or disrupting the LookerHelp services</li>
                </ul>
              </li>
              <li>
                <strong>Content Standards</strong>
                <ul>
                  <li>All user-generated content must be accurate and comply with applicable laws.</li>
                  <li>Content must not infringe on any patents, trademarks, trade secrets, copyrights, or other proprietary rights.</li>
                </ul>
              </li>
              <li>
                <strong>Security</strong>
                <ul>
                  <li>Users must not attempt to gain unauthorized access to any portion of the LookerHelp platform or any other systems or networks connected to LookerHelp.</li>
                </ul>
              </li>
              <li>
                <strong>Reporting Violations</strong>
                <ul>
                  <li>If you become aware of any violation of this Acceptable Use Policy, please report it to dion@wrench.chat.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <h2>Copyright Notice</h2>
      <p>© 2024 LookerHelp. All rights reserved.</p>
      <p>The content, organization, graphics, design, and other matters related to LookerHelp are protected under applicable copyrights and other proprietary laws, including but not limited to intellectual property laws. The copying, reproduction, use, modification or publication by you of any such matters or any part of the LookerHelp site without our express written permission is strictly prohibited.</p>
    </div>
  );
};

export default Legal;
