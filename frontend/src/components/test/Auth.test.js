import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Auth from './Auth';
import { registerLecturer, login } from '../../services/AuthenticationService';
import { setUser } from '../../utills';

// Mock the registerLecturer and login services
jest.mock('../../services/AuthenticationService', () => ({
  registerLecturer: jest.fn(),
  login: jest.fn(),
}));

jest.mock('../../utills', () => ({
  setUser: jest.fn(),
}));

describe('Auth Component', () => {
  it('renders register form by default', () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('User Type:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('switches to login form when toggle link is clicked', () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByLabelText('First Name:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Last Name:')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.queryByLabelText('User Type:')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('registers a lecturer and redirects to the login page', async () => {
    const mockLecturer = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', userRole: 'lecturer' };
    registerLecturer.mockResolvedValue(mockLecturer);

    render(
      <Router>
        <Auth />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'Wasana' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Sewwandi' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'wasanasewwandi@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('User Type:'), { target: { value: 'lecturer' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(registerLecturer).toHaveBeenCalledWith({
        firstName: 'Wasana',
        lastName: 'Sewwandi',
        email: 'wasanasewwandi@gmail.com',
        password: 'password',
        userRole: 'lecturer',
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });
  });

  it('logs in a user and redirects to the dashboard', async () => {
    const mockResponse = { token: 'fake-token', user: { id: 1, email: 'wasanasewwandi@gmail.com' } };
    login.mockResolvedValue(mockResponse);

    render(
      <Router>
        <Auth />
      </Router>
    );

    fireEvent.click(screen.getByText('Login'));

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'wasanasewwandi@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('wasanasewwandi@gmail.com', 'password');
    });

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(mockResponse);
    });

    // Check for redirection (this depends on your implementation, adjust as necessary)
    await waitFor(() => {
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });
});
