import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackMessage from './FeedbackMessage';

describe('FeedbackMessage Component', () => {
  it('renders success message and icon correctly', () => {
    render(<FeedbackMessage message="Operation successful" type="success" duration={2000} />);

    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-success-icon')).toBeInTheDocument();
  });

  it('renders error message and icon correctly', () => {
    render(<FeedbackMessage message="Operation failed" type="error" duration={2000} />);

    expect(screen.getByText('Operation failed')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-error-icon')).toBeInTheDocument();
  });

  it('hides the message after the specified duration', async () => {
    render(<FeedbackMessage message="This will disappear" type="success" duration={2000} />);

    expect(screen.getByText('This will disappear')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText('This will disappear')).not.toBeInTheDocument(), { timeout: 3000 });
  });

  it('does not render anything when message is null', () => {
    const { container } = render(<FeedbackMessage message={null} type="success" duration={2000} />);

    expect(container.firstChild).toBeNull();
  });
});
