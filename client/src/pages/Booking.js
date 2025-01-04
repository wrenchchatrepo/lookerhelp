import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import BookingButton from '../components/BookingButton';

const BookingSection = styled(Section)`
  text-align: center;
`;

const Booking = () => {
  return (
    <BookingSection id="booking" title="Schedule a Meeting">
      <p>Master Looker with LookerHelp. Get expert support, powerful scripts, and an AI assistant to streamline your data workflows. Imagine instant Slack support and weekly office hours to tackle your toughest Looker challenges. Ready to see what LookerHelp can do for your team? Book a quick Google Meet with Dion.</p>
      <BookingButton />
    </BookingSection>
  );
};

export default Booking;
