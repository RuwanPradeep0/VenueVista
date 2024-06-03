import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEvent from './AddEvent';
import {
  getAllResponsible,
  createReservation,
  createWaiting,
  getAuthenticate,
} from '../../services';
import {
  getDateInFormat,
  getTimeString,
  setTimeFormat,
  mapTimeStringToInteger,
  checkUser,
  getDateInYearFormat,
} from '../../utills';

jest.mock('../../services/ResponsibleService', () => ({
  getAllResponsible: jest.fn(),
}));

jest.mock('../../services/ReservationService', () => ({
  createReservation: jest.fn(),
}));

jest.mock('../../services/WaitingService', () => ({
  createWaiting: jest.fn(),
}));

jest.mock('../../services/AuthenticationService', () => ({
  getAuthenticate: jest.fn(),
}));

jest.mock('../../utills', () => ({
  getDateInFormat: jest.fn(() => '01/01/2022'),
  getTimeString: jest.fn((time) => time),
  setTimeFormat: jest.fn((time) => time),
  mapTimeStringToInteger: jest.fn((time) => Number(time.replace(':', ''))),
  checkUser: jest.fn((setUser, setValid) => {
    setUser({ id: 1, name: 'User' });
    setValid(true);
  }),
  getDateInYearFormat: jest.fn(() => '2022-01-01'),
}));

describe('AddEvent Component', () => {
  const mockProps = {
    startTimeProp: '09:00',
    endTimeProp: '10:00',
    spaceId: 1,
    date: new Date(),
    spaceReservations: [],
    spaceName: 'Room 101',
    updateReservations: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<AddEvent {...mockProps} />);
    expect(screen.getByPlaceholderText('Add Title')).toBeInTheDocument();
  });

  test('displays the correct date and room name', () => {
    render(<AddEvent {...mockProps} />);
    expect(screen.getByText('Room 101')).toBeInTheDocument();
    expect(screen.getByText('01/01/2022')).toBeInTheDocument();
  });

  test('allows user to input title', () => {
    render(<AddEvent {...mockProps} />);
    const input = screen.getByPlaceholderText('Add Title');
    fireEvent.change(input, { target: { value: 'Lecture' } });
    expect(input).toHaveValue('Lecture');
  });

  test('shows feedback when reservation is added successfully', async () => {
    const { getAuthenticate } = require('../../services/AuthenticationService');
    getAuthenticate.mockResolvedValueOnce({});
    render(<AddEvent {...mockProps} />);
    const button = screen.getByText('Confirm Reservation');
    fireEvent.click(button);
    expect(await screen.findByText('Reservation Added Successfully!')).toBeInTheDocument();
  });

  test('shows error feedback on reservation failure', async () => {
    const { getAuthenticate } = require('../../services/AuthenticationService');
    getAuthenticate.mockRejectedValueOnce(new Error('reserved'));
    render(<AddEvent {...mockProps} />);
    const button = screen.getByText('Confirm Reservation');
    fireEvent.click(button);
    expect(await screen.findByText('Error Occured Please Try Again')).toBeInTheDocument();
  });

  test('disables the submit button when form is invalid', () => {
    render(<AddEvent {...mockProps} />);
    const button = screen.getByText('Confirm Reservation');
    expect(button).toBeDisabled();
  });
});
