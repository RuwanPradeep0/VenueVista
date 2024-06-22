
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyWaitings from './MyWaitings';
import { getUserWaitings } from '../../../services/WaitingService';
import { checkUser } from '../../../utills';

jest.mock('../../../services/WaitingService', () => ({
  getUserWaitings: jest.fn(),
}));

jest.mock('../../../utills', () => ({
  checkUser: jest.fn(),
}));

describe('MyWaitings Component', () => {
  const mockUser = {
    username: 'Wasana',
  };

  beforeEach(() => {
    getUserWaitings.mockReset();
    checkUser.mockReset();
    checkUser.mockImplementation((setUser, setValid) => {
      setUser(mockUser);
      setValid(true);
    });
  });

  it('render without crashing', () => {
    render(<MyWaitings />);
    expect(screen.getByText('Available for Reservation')).toBeInTheDocument();
  });

  it('display a message when there are no available waiting reservations', async () => {
    getUserWaitings.mockImplementation((setWaiting, username) => {
      setWaiting([]);
    });

    render(<MyWaitings />);
    await waitFor(() =>
      expect(screen.getByText('You are not in a waiting list for any reservation')).toBeInTheDocument()
    );
  });

  it('call getUserWaitings with the correct arguments', async () => {
    getUserWaitings.mockImplementation((setWaiting, username) => {
      setWaiting([]);
    });

    render(<MyWaitings />);

    await waitFor(() => {
      expect(getUserWaitings).toHaveBeenCalledWith(expect.any(Function), mockUser.username);
    });
  });

  it('should set user and valid state when checkUser is called', async () => {
    render(<MyWaitings />);

    await waitFor(() => {
      expect(screen.getByText('Available for Reservation')).toBeInTheDocument();
    });

    expect(checkUser).toHaveBeenCalled();
  });

  it('handle empty waiting list gracefully', async () => {
    getUserWaitings.mockImplementation((setWaiting, username) => {
      setWaiting([]);
    });

    render(<MyWaitings />);

    await waitFor(() => {
      expect(screen.getByText('You are not in a waiting list for any reservation')).toBeInTheDocument();
    });
  });
});
