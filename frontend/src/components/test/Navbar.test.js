import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders navbar links correctly', () => {
    render(
      <MemoryRouter>
        <Navbar user={{}} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const manageReservationsLink = screen.queryByText('Manage Reservations');
    expect(manageReservationsLink).not.toBeInTheDocument();

    const manageSpacesLink = screen.getByText('Manage Spaces');
    expect(manageSpacesLink).toBeInTheDocument();

    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
  });

  it('renders manage reservations link when user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar user={{ username: 'testuser' }} />
      </MemoryRouter>
    );

    const manageReservationsLink = screen.getByText('Manage Reservations');
    expect(manageReservationsLink).toBeInTheDocument();

    const signInLink = screen.queryByText('Sign In');
    expect(signInLink).not.toBeInTheDocument();
  });

  it('renders username when user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar user={{ username: 'testuser' }} />
      </MemoryRouter>
    );

    const usernameText = screen.getByText('testuser');
    expect(usernameText).toBeInTheDocument();
  });

  it('renders log out link when user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar user={{ username: 'testuser' }} />
      </MemoryRouter>
    );

    const logOutLink = screen.getByText('Log Out');
    expect(logOutLink).toBeInTheDocument();
  });

  it('renders logo and university information', () => {
    render(
      <MemoryRouter>
        <Navbar user={{}} />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    const facultyName = screen.getByText('Faculty Of Engineering');
    expect(facultyName).toBeInTheDocument();

    const universityName = screen.getByText('University Of jaffna');
    expect(universityName).toBeInTheDocument();
  });
});
