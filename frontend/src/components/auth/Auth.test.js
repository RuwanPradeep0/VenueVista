import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth from './Auth';
import {
  registerLecturer,
  login
} from '../../services/AuthenticationService';
import { setUser } from '../../utills';

jest.mock('../../services/AuthenticationService', () => ({
  registerLecturer: jest.fn(),
  login: jest.fn(),
}));

jest.mock('../../utills', () => ({
  setUser: jest.fn(),
}));

describe('Auth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders register form by default', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders login form when toggled', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('allows user to fill out the registration form', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('User Type:'), { target: { value: 'lecturer' } });

    expect(screen.getByLabelText('First Name:')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name:')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email:')).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText('Password:')).toHaveValue('password');
    expect(screen.getByLabelText('User Type:')).toHaveValue('lecturer');
  });

  test('handles successful registration', async () => {
    registerLecturer.mockResolvedValueOnce({});

    render(<Auth />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('User Type:'), { target: { value: 'lecturer' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  test('handles registration error', async () => {
    registerLecturer.mockRejectedValueOnce(new Error('Registration failed'));

    render(<Auth />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('User Type:'), { target: { value: 'lecturer' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });

  test('handles successful login', async () => {
    login.mockResolvedValueOnce({ id: 1, name: 'John Doe' });

    render(<Auth />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Login'));
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
      expect(setUser).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });
  });

  test('handles login error', async () => {
    login.mockRejectedValueOnce(new Error('Login failed'));

    render(<Auth />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Login'));
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });
});
