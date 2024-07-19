import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AvailableSpaces from './AvailableSpaces';

describe('AvailableSpaces Component', () => {
  const mockSpaces = [
    { id: 1, name: 'Room 101', location: 'Building A' },
    { id: 2, name: 'Room 102', location: 'Building B' },
    { id: 3, name: 'Room 103', location: 'Building C' },
  ];

  const mockHandleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={null} />);
    expect(screen.getByText('Available Spaces')).toBeInTheDocument();
  });

  test('displays the correct number of spaces', () => {
    render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={null} />);
    const spaces = screen.getAllByRole('button');
    expect(spaces).toHaveLength(mockSpaces.length);
  });

  test('displays the space names and locations correctly', () => {
    render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={null} />);
    mockSpaces.forEach(space => {
      expect(screen.getByText(space.name)).toBeInTheDocument();
      expect(screen.getByText(space.location)).toBeInTheDocument();
    });
  });

  test('handles space click correctly', () => {
    render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={null} />);
    const spaceButton = screen.getByText(mockSpaces[0].name).closest('button');
    fireEvent.click(spaceButton);
    expect(mockHandleClick).toHaveBeenCalledWith(mockSpaces[0].id);
  });

  test('applies the selected class to the selected space', () => {
    const { container } = render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={1} />);
    const selectedSpace = container.querySelector('.SpaceSelected');
    expect(selectedSpace).toBeInTheDocument();
    expect(selectedSpace).toHaveTextContent(mockSpaces[0].name);
  });

  test('displays the chevron icon for the selected space', () => {
    render(<AvailableSpaces availableSpaces={mockSpaces} handleClick={mockHandleClick} select={1} />);
    const chevronIcon = screen.getByText(mockSpaces[0].name).querySelector('svg');
    expect(chevronIcon).toBeInTheDocument();
  });
});
