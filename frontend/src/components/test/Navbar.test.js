import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

// Mock the logo image import
jest.mock('../../images/logo.png', () => 'logo.png');

describe('Navbar Component', () => {
  const setup = (user = null) => {
    const utils = render(
      <Router>
        <Navbar user={user} />
      </Router>
    );
    return { ...utils };
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should render without crashing', () => {
    setup();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Faculty Of Engineering')).toBeInTheDocument();
    expect(screen.getByText('University Of jaffna')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Manage Spaces')).toBeInTheDocument();
  });

  it('display Sign In link when user is not logged in', () => {
    setup();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('display Log Out link and username when user is logged in', () => {
    const user = { username: 'testuser' };
    localStorage.setItem('user', JSON.stringify(user));
    setup();

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('display Manage Reservations link when user is logged in', () => {
    const user = { username: 'testuser' };
    localStorage.setItem('user', JSON.stringify(user));
    setup();

    expect(screen.getByText('Manage Reservations')).toBeInTheDocument();
  });

  it('should not display Manage Reservations link when user is not logged in', () => {
    setup();
    expect(screen.queryByText('Manage Reservations')).not.toBeInTheDocument();
  });

  it('handle empty localStorage gracefully', () => {
    localStorage.removeItem('user');
    setup();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
    expect(screen.queryByText('testuser')).not.toBeInTheDocument();
  });
});
