import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calender from './Calender';

describe('Calender Component', () => {
  const mockSpaceReservations = [
    { id: 1, startTime: 900, endTime: 1100, date: '2022-06-01', title: 'Meeting' },
    { id: 2, startTime: 1400, endTime: 1600, date: '2022-06-01', title: 'Presentation' },
    // Add more mock reservations as needed
  ];

  const mockSelectedDays = [1, 2, 3, 4, 5]; // Mock weekdays selection
  const mockSelectSpace = 1;
  const mockSelectSpaceName = 'Meeting Room';
  const mockStartTime = 800;
  const mockEndTime = 1800;
  const mockIsUserLoggedIn = true;

  test('renders without crashing', () => {
    render(
      <Calender
        selectSpace={mockSelectSpace}
        spaceReservations={mockSpaceReservations}
        selectedDays={mockSelectedDays}
        selectSpaceName={mockSelectSpaceName}
        startTime={mockStartTime}
        endTime={mockEndTime}
        updateReservations={() => {}}
        isUserLoggedIn={mockIsUserLoggedIn}
      />
    );
    expect(screen.getByText('Available Spaces')).toBeInTheDocument();
  });

  // Add more test cases to cover different aspects of the component's functionality
});
