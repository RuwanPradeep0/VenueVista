import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddSpace from './AddSpace';

describe('AddSpace Component', () => {
  it('validates required fields and prevents form submission if any field is empty', async () => {
    render(<AddSpace />);

    fireEvent.change(screen.getByLabelText('Space Name'), { target: { value: 'Main Hall' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: '' } }); // Leaving Location empty
    fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A large hall suitable for events' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([], 'hall.jpg')] } });

    fireEvent.click(screen.getByLabelText('AC'));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check that an error message is displayed indicating a validation error
    await waitFor(() => {
      expect(screen.getByText(/fill out this field/i)).toBeInTheDocument();
    });
  });

  it('renders the form correctly', () => {
    render(<AddSpace />);
    // Add your assertions for rendering the form correctly here
  });
});
