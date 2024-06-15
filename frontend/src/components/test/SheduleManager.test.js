import React from 'react';
import { render, waitFor } from '@testing-library/react';
import SheduleManager from './SheduleManager';
import { getAllSpaces, getAllReservation } from '../../services/SpaceService';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/SpaceService');
jest.mock('../../services/ReservationService');

describe('SheduleManager', () => {
  beforeEach(() => {
    getAllSpaces.mockResolvedValue([]);
    getAllReservation.mockResolvedValue([]);
  });

  it('renders without crashing', () => {
    render(<SheduleManager />);
  });

  it('fetches spaces and reservations on mount', async () => {
    await act(async () => {
      render(<SheduleManager />);
      await waitFor(() => {
        expect(getAllSpaces).toHaveBeenCalledTimes(1);
        expect(getAllReservation).toHaveBeenCalledTimes(1);
      });
    });
  });
});
