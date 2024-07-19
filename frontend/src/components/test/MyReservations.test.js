import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyReservations from './MyReservations';
import { getUserReservations } from '../../../services/ReservationService';

jest.mock('../../../services/ReservationService', () => ({
  getUserReservations: jest.fn(),
}));

describe('MyReservations Component', () => {
  beforeEach(() => {
    getUserReservations.mockReset();
  });

  it('should render without crashing', () => {
    render(<MyReservations />);
    expect(screen.getByText('Upcoming Reservations')).toBeInTheDocument();
  });

  it('should display a message when there are no upcoming reservations', async () => {
    getUserReservations.mockResolvedValue([]);
    render(<MyReservations />);
    await waitFor(() =>
      expect(screen.getByText('You have no upcoming reservations.')).toBeInTheDocument()
    );
  });

});
