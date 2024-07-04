import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AvailableSpaces from './AvailableSpaces';

describe('AvailableSpaces Component', () => {
  const availableSpaces = [
    { id: 1, name: 'Space 1', location: 'Location 1' },
    { id: 2, name: 'Space 2', location: 'Location 2' },
    { id: 3, name: 'Space 3', location: 'Location 3' },
  ];

  it('renders available spaces', () => {
    render(<AvailableSpaces availableSpaces={availableSpaces} />);
    const headingElement = screen.getByText('Available Spaces');
    expect(headingElement).toBeInTheDocument();

    availableSpaces.forEach((space) => {
      const nameElement = screen.getByText(space.name);
      const locationElement = screen.getByText(space.location);
      expect(nameElement).toBeInTheDocument();
      expect(locationElement).toBeInTheDocument();
    });
  });

  it('selects a space when clicked', () => {
    const handleClick = jest.fn();
    render(<AvailableSpaces availableSpaces={availableSpaces} handleClick={handleClick} select={null} />);
    
    availableSpaces.forEach((space) => {
      const spaceButton = screen.getByText(space.name).closest('button');
      expect(spaceButton).toBeInTheDocument();
      spaceButton.click();
      expect(handleClick).toHaveBeenCalledWith(space.id);
    });
  });
});
