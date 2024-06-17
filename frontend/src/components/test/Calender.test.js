import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calender from './Calender';

describe('Calender Component', () => {
  const availableSlots = [9, 10, 11];
  const bookedSlots = [12, 13];

  const formatTime = (hour) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(new Date(`2000-01-01T${hour.toString().padStart(2, "0")}:00`));
  };

  it('renders the calendar with time slots', () => {
    render(<Calender availableSlots={availableSlots} bookedSlots={bookedSlots} />);
    
    // Check if all 24 time slots are rendered
    for (let hour = 0; hour < 24; hour++) {
      const formattedTime = formatTime(hour);
      expect(screen.getAllByText(formattedTime).length).toBeGreaterThan(0);
    }
  });

  it('displays available slots correctly', () => {
    render(<Calender availableSlots={availableSlots} bookedSlots={bookedSlots} />);

    availableSlots.forEach(slot => {
      const formattedTime = formatTime(slot);
      const availableSlotElements = screen.getAllByText(formattedTime);
      availableSlotElements.forEach(element => {
        expect(element).toHaveClass('availableSlot');
      });
    });
  });

  it('displays booked slots correctly', () => {
    render(<Calender availableSlots={availableSlots} bookedSlots={bookedSlots} />);

    bookedSlots.forEach(slot => {
      const formattedTime = formatTime(slot);
      const bookedSlotElements = screen.getAllByText(formattedTime);
      bookedSlotElements.forEach(element => {
        expect(element).toHaveClass('bookedSlot');
      });
    });
  });

  it('handles invalid time values gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const invalidSlots = ['invalid', null, undefined, '25'];

    render(<Calender availableSlots={invalidSlots} bookedSlots={[]} />);

    expect(screen.getAllByText('Invalid time').length).toBe(invalidSlots.length);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(invalidSlots.length);
    consoleErrorSpy.mockRestore();
  });
});
