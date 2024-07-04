import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEvent from './AddEvent';

jest.mock('../../services/ReservationService', () => ({
  createReservation: jest.fn(),
}));

jest.mock('../../services/WaitingService', () => ({
  createWaiting: jest.fn(),
}));

jest.mock('../../utills', () => ({
  getDateInFormat: jest.fn((date) => date),
  getTimeString: jest.fn((time) => time),
  setTimeFormat: jest.fn((time) => time),
  mapTimeStringToInteger: jest.fn((time) => parseInt(time.replace(':', ''), 10)),
  checkUser: jest.fn(),
  getDateInYearFormat: jest.fn((date) => date),
}));

describe('AddEvent Component', () => {
  const defaultProps = {
    startTimeProp: '10:00',
    endTimeProp: '11:00',
    spaceId: 1,
    date: new Date(),
    spaceReservations: [],
    spaceName: 'Lecture Hall 1',
    updateReservations: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<AddEvent {...defaultProps} />);
    expect(screen.getByPlaceholderText('Add Title')).toBeInTheDocument();
  });

  test('handles title input', () => {
    render(<AddEvent {...defaultProps} />);
    const titleInput = screen.getByPlaceholderText('Add Title');
    fireEvent.change(titleInput, { target: { value: 'New Event' } });
    expect(titleInput.value).toBe('New Event');
  });

  test('handles start time change', () => {
    render(<AddEvent {...defaultProps} />);
    const startTimeInput = screen.getAllByRole('textbox')[1];
    fireEvent.change(startTimeInput, { target: { value: '12:00' } });
    expect(startTimeInput.value).toBe('12:00');
  });

  test('handles end time change', () => {
    render(<AddEvent {...defaultProps} />);
    const endTimeInput = screen.getAllByRole('textbox')[2];
    fireEvent.change(endTimeInput, { target: { value: '13:00' } });
    expect(endTimeInput.value).toBe('13:00');
  });

  test('handles form submission successfully', async () => {
    const { createReservation } = require('../../services/ReservationService');
    createReservation.mockResolvedValue({});

    render(<AddEvent {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Add Title'), { target: { value: 'New Event' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '12:00' } });
    fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: '13:00' } });
    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => expect(screen.getByText('Reservation Added Successfully!')).toBeInTheDocument());
  });
});
