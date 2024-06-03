import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FeedbackMessage from './FeedbackMessage';

describe('FeedbackMessage', () => {
  it('should render a success message', async () => {
    const { getByText, queryByText } = render(
      <FeedbackMessage message="Success message" type="success" />
    );

    expect(getByText('Success message')).toBeInTheDocument();

    // Message should disappear after a delay
    await waitFor(() => expect(queryByText('Success message')).not.toBeInTheDocument());
  });

  it('should render an error message', async () => {
    const { getByText, queryByText } = render(
      <FeedbackMessage message="Error message" type="error" />
    );

    expect(getByText('Error message')).toBeInTheDocument();

    // Message should disappear after a delay
    await waitFor(() => expect(queryByText('Error message')).not.toBeInTheDocument());
  });

  it('should not render a message when message prop is empty', () => {
    const { queryByText } = render(<FeedbackMessage message="" type="success" />);
    expect(queryByText('')).not.toBeInTheDocument();
  });
});
