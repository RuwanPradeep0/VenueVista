import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SheduleManager from './SheduleManager';

// Mock services
jest.mock('../../services/SpaceService', () => ({
  getAllSpaces: jest.fn(() => Promise.resolve({ data: [{ id: 1, name: 'Space 1', capacity: 100, facilitiesList: ['Facility 1'] }] })),
}));

jest.mock('../../services/ReservationService', () => ({
  getAllReservations: jest.fn(() => Promise.resolve({ data: [{ id: 1, spaceID: 1, facilitiesList: ['Facility 1'], batch: 'Batch 1' }] })),
}));

describe('SheduleManager Component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders without crashing', async () => {
    render(
      <SheduleManager
        selectedDays={[]}
        startTime="09:00"
        endTime="17:00"
        capacity={[50, 150]}
        selectedFacilities={[]}
        selectedBatches={[]}
      />
    );
    expect(screen.getByText(/Available Spaces/i)).toBeInTheDocument();
  });

  test('handles space selection and shows details', async () => {
    render(
      <SheduleManager
        selectedDays={[]}
        startTime="09:00"
        endTime="17:00"
        capacity={[50, 150]}
        selectedFacilities={[]}
        selectedBatches={[]}
      />
    );

    // Simulate space click
    fireEvent.click(screen.getByText('Space 1'));
    expect(screen.getByText('Capacity:')).toBeInTheDocument();
  });

  test('filters spaces based on capacity and facilities', async () => {
    render(
      <SheduleManager
        selectedDays={[]}
        startTime="09:00"
        endTime="17:00"
        capacity={[50, 150]}
        selectedFacilities={['Facility 1']}
        selectedBatches={[]}
      />
    );

    expect(screen.getByText('Space 1')).toBeInTheDocument();
  });
});
