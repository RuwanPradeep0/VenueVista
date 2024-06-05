import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddSpace from './AddSpace';
import { createSpaces } from '../../services/SpaceService';

jest.mock('../../services/SpaceService', () => ({
  createSpaces: jest.fn(),
}));

describe('AddSpace Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<AddSpace />);
    expect(screen.getByText('Add Hall Details')).toBeInTheDocument();
  });

  test('allows user to input space name', () => {
    render(<AddSpace />);
    const input = screen.getByLabelText('Space Name');
    fireEvent.change(input, { target: { value: 'Conference Room' } });
    expect(input).toHaveValue('Conference Room');
  });

  test('allows user to input location', () => {
    render(<AddSpace />);
    const input = screen.getByLabelText('Location');
    fireEvent.change(input, { target: { value: 'Building A' } });
    expect(input).toHaveValue('Building A');
  });

  test('allows user to input capacity', () => {
    render(<AddSpace />);
    const input = screen.getByLabelText('Capacity');
    fireEvent.change(input, { target: { value: '50' } });
    expect(input).toHaveValue('50');
  });

  test('allows user to input description', () => {
    render(<AddSpace />);
    const textarea = screen.getByLabelText('Description');
    fireEvent.change(textarea, { target: { value: 'Spacious room with modern facilities.' } });
    expect(textarea).toHaveValue('Spacious room with modern facilities.');
  });

  test('allows user to select facilities', () => {
    render(<AddSpace />);
    const checkbox = screen.getByLabelText('AC');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('allows user to upload image', () => {
    render(<AddSpace />);
    const input = screen.getByLabelText('Image');
    const file = new File(['image content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toBe(file);
    expect(input.files).toHaveLength(1);
  });

  test('submits form data successfully', async () => {
    createSpaces.mockResolvedValueOnce({});
    render(<AddSpace />);
    
    fireEvent.change(screen.getByLabelText('Space Name'), { target: { value: 'Conference Room' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Building A' } });
    fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Spacious room with modern facilities.' } });
    
    const file = new File(['image content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [file] } });
    
    fireEvent.click(screen.getByLabelText('AC'));
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(createSpaces).toHaveBeenCalledWith({
        name: 'Conference Room',
        location: 'Building A',
        capacity: 50,
        description: 'Spacious room with modern facilities.',
        image: '',
        facilities: ['AC'],
      });
    });
  });

  test('displays error message on form submission failure', async () => {
    createSpaces.mockRejectedValueOnce(new Error('Submission failed'));
    render(<AddSpace />);
    
    fireEvent.change(screen.getByLabelText('Space Name'), { target: { value: 'Conference Room' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Building A' } });
    fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Spacious room with modern facilities.' } });
    
    const file = new File(['image content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [file] } });
    
    fireEvent.click(screen.getByLabelText('AC'));
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText('Error in request setup: Submission failed')).toBeInTheDocument();
    });
  });
});
