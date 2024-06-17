import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyReservations from './MyReservations';
import * as ReservationService from '../../../services/ReservationService';
import * as Utils from '../../../utills';

// Mock the required services and utilities
jest.mock('../../../services/ReservationService');
jest.mock('../../../utills');

describe('MyReservations Component', () => {
  beforeEach(() => {
    // Mock the checkUser function to set a valid user
    Utils.checkUser = jest.fn((setUser, setValid) => {
      setUser({ username: 'testUser', fullName: 'Test User' });
      setValid(true);
    });

    // Mock the getUserReservations function
    ReservationService.getUserReservations = jest.fn((setReservations, username) => {
      setReservations([
        { id: 1, reservationDate: '2023-06-14', fullName: 'Test User', title: 'Reservation 1' },
        { id: 2, reservationDate: '2023-06-18', fullName: 'Test User', title: 'Reservation 2' },
      ]);
    });
  });

  it('renders upcoming and past reservations correctly', async () => {
    render(<MyReservations />);

    // Check that the upcoming reservations are displayed
    await waitFor(() => {
      expect(screen.getByText('Upcoming Reservations')).toBeInTheDocument();
    });

    // Check that the past reservations are displayed
    await waitFor(() => {
      expect(screen.getByText('Past Reservations')).toBeInTheDocument();
    });
  });
});
