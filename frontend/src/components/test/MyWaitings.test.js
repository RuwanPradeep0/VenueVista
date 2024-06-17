import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyWaitings from './MyWaitings';

describe('MyWaitings Component', () => {
    test('renders waiting list correctly', () => {
        render(<MyWaitings />);
      
        expect(screen.getByText('Available for Reservation')).toBeInTheDocument();
        expect(screen.getByText('You are not in a waiting list for any reservation')).toBeInTheDocument();
    });
});
