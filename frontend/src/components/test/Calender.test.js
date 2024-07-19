import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calender from './Calender';


describe('Calender Component', () => {
  

  test('renders all time slots', () => {
    render(<Calender availableSlots={[]} bookedSlots={[]} />);
    const timeSlots = screen.getAllByText(/AM|PM/);
    expect(timeSlots.length).toBe(24);
  });

  test('formats time correctly', () => {
    render(<Calender availableSlots={[]} bookedSlots={[]} />);
    const timeSlots = screen.getAllByText(/AM|PM/);
    const expectedTimes = [
      '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
      '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
      '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
      '9:00 PM', '10:00 PM', '11:00 PM'
    ];
    timeSlots.forEach((slot, index) => {
      expect(slot).toHaveTextContent(expectedTimes[index]);
    });
  });

  test('displays available slots correctly', () => {
    const availableSlots = ['1:00 AM', '2:00 AM'];
    render(<Calender availableSlots={availableSlots} bookedSlots={[]} />);
    availableSlots.forEach(slot => {
      const slotElement = screen.getByText(slot);
      expect(slotElement).toBeInTheDocument();
      // Add additional checks if there are specific styles or classes for available slots
    });
  });

  test('displays booked slots correctly', () => {
    const bookedSlots = ['3:00 AM', '4:00 AM'];
    render(<Calender availableSlots={[]} bookedSlots={bookedSlots} />);
    bookedSlots.forEach(slot => {
      const slotElement = screen.getByText(slot);
      expect(slotElement).toBeInTheDocument();
      // Add additional checks if there are specific styles or classes for booked slots
    });
  });

  test('handles invalid time values gracefully', () => {
    render(<Calender availableSlots={['25:00 AM']} bookedSlots={[]} />);
    const invalidSlot = screen.queryByText('25:00 AM');
    expect(invalidSlot).not.toBeInTheDocument();
  });

  
});
