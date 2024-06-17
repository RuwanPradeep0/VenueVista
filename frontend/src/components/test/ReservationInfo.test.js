import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReservationInfo from './ReservationInfo';
import { getWaitingList } from '../../services/WaitingService';

// Mock the getWaitingList function
jest.mock('../../services/WaitingService', () => ({
  getWaitingList: jest.fn(),
}));

describe('ReservationInfo Component', () => {
  const mockReservation = {
    title: 'Test Reservation',
    spaceId: 'space123',
    date: '2024-06-18',
    startTime: '09:00',
    endTime: '11:00',
    fullName: 'Wasana Sewwandi',
    responsiblePerson: 'Jane Smith',
  };

  const mockWaitingList = ['Person 1', 'Person 2'];

  beforeEach(() => {
    getWaitingList.mockResolvedValue(mockWaitingList);
  });

  it('renders the reservation info', async () => {
    render(<ReservationInfo reservation={mockReservation} onClick={jest.fn()} />);

    expect(screen.getByText('Test Reservation')).toBeInTheDocument();
    expect(screen.getByText('Lecture Hall 01')).toBeInTheDocument();
    expect(screen.getByText('Wasana Sewwandi')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    await screen.findByText('2 Waiting');
  });

  it('calls onClick when the Add to Waiting List button is clicked', () => {
    const handleClick = jest.fn();
    render(<ReservationInfo reservation={mockReservation} onClick={handleClick} />);

    fireEvent.click(screen.getByText(/Add to Waiting List/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fetches and displays waiting list', async () => {
    render(<ReservationInfo reservation={mockReservation} onClick={jest.fn()} />);

    await screen.findByText('2 Waiting'); // Wait for the async call to complete
    expect(screen.getByText('2 Waiting')).toBeInTheDocument();
  });
});
