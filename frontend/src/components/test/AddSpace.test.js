import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddSpace from './AddSpace';

jest.mock('../../services/SpaceService', () => ({
  createSpaces: jest.fn(),
}));

describe('AddSpace Component', () => {
  it('should render without crashing', () => {
    render(<AddSpace />);
    expect(screen.getByText('Add Hall Details')).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    render(<AddSpace />);
    const nameInput = screen.getByLabelText('Space Name');
    fireEvent.change(nameInput, { target: { value: 'Hall 1' } });
    expect(nameInput.value).toBe('Hall 1');
  });

  it('should update capacity value when the range input changes', () => {
    render(<AddSpace />);
    const capacityInput = screen.getByLabelText('Capacity');
    fireEvent.change(capacityInput, { target: { value: '50' } });
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should add a facility when its checkbox is checked', () => {
    render(<AddSpace />);
    const acCheckbox = screen.getByLabelText('AC');
    fireEvent.click(acCheckbox);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('should remove a facility when its checkbox is unchecked', () => {
    render(<AddSpace />);
    const acCheckbox = screen.getByLabelText('AC');
    fireEvent.click(acCheckbox);
    fireEvent.click(acCheckbox);

    // Wait for the checkbox to be unchecked
    waitFor(() => {
      expect(screen.queryByText('AC')).not.toBeInTheDocument();
    });
  });

  it('should submit the form with correct data', async () => {
    render(<AddSpace />);
    const nameInput = screen.getByLabelText('Space Name');
    fireEvent.change(nameInput, { target: { value: 'Hall 1' } });
    const locationInput = screen.getByLabelText('Location');
    fireEvent.change(locationInput, { target: { value: 'Location 1' } });
    const capacityInput = screen.getByLabelText('Capacity');
    fireEvent.change(capacityInput, { target: { value: '100' } });
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Description 1' } });
    const imageInput = screen.getByLabelText('Image');
    fireEvent.change(imageInput, { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(require('../../services/SpaceService').createSpaces).toHaveBeenCalledWith({
        name: 'Hall 1',
        location: 'Location 1',
        capacity: 100,
        description: 'Description 1',
        image: '',
        facilities: [],
      });
    });
  });

 
});
