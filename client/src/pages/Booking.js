import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import BookingButton from '../components/BookingButton';

const BookingSection = styled(Section)`
  text-align: center;
`;

const Booking = () => {
  return (
    <BookingSection title="Schedule a Meeting">
      <p>Ready to discuss your Looker needs? Book a Google Meet with Dion to get started.</p>
      <BookingButton />
    </BookingSection>
  );
};

export default Booking;
