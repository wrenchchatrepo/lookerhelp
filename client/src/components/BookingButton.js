import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BookingContainer = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const CTAText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 12px;
  color: var(--accent-purple);
`;

const BookingButton = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let link;
    let script;

    try {
      // Load Google Calendar stylesheet
      link = document.createElement('link');
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Load Google Calendar script
      script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      
      script.onload = () => {
        try {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true',
            color: '2cff05',
            label: 'Book an appointment',
          });
        } catch (error) {
          console.error('Error initializing calendar button:', error);
          setHasError(true);
        }
      };

      script.onerror = () => {
        console.error('Failed to load calendar script');
        setHasError(true);
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error('Error setting up calendar scripts:', error);
      setHasError(true);
    }

    // Cleanup
    return () => {
      if (link && document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <BookingContainer>
      <CTAText>Have questions? Click here to book a Google Meet on Dion's calendar!</CTAText>
      {hasError ? (
        <a 
          href="https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#2cff05',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '10px'
          }}
        >
          Book an appointment
        </a>
      ) : (
        <div id="calendar-button">
          {/* The calendar button will be injected here by the Google Calendar script */}
        </div>
      )}
    </BookingContainer>
  );
};

export default BookingButton;
