import React, { useEffect } from 'react';
import '../../styles/booking.css';

const Booking = () => {
  useEffect(() => {
    // Load Google Calendar Scheduling scripts
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/AcZssZ0guI3g_XQX8oJTb5nb4lAjUxWzDdPSot2BRgU=?gv=true',
        color: '#B026FF',
        label: 'Book an appointment',
        target: document.getElementById('calendar-button-container'),
      });
    };

    // Cleanup
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="booking-container">
      <h1>Schedule a Meeting</h1>
      <p>Book an appointment on Dion's Calendar for personalized Looker support and consultation.</p>
      <div id="calendar-button-container" className="calendar-button">
        {/* Google Calendar Appointment button will be rendered here */}
      </div>
    </div>
  );
};

export default Booking;
