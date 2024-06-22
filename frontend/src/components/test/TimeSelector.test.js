import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeSelector from './TimeSelector';

describe('TimeSelector Component', () => {
  let startTime, setStartTime, endTime, setEndTime;

  beforeEach(() => {
    startTime = 8; // Initial start time
    setStartTime = jest.fn();
    endTime = 9; // Initial end time
    setEndTime = jest.fn();
  });

  test('renders without crashing', () => {
    render(
      <TimeSelector
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    );

    expect(screen.getByLabelText(/Start Time:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Time:/i)).toBeInTheDocument();
  });

  test('handles start time change', () => {
    render(
      <TimeSelector
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    );

    const startTimeSelect = screen.getByLabelText(/Start Time:/i);
    fireEvent.change(startTimeSelect, { target: { value: '10' } });

    expect(setStartTime).toHaveBeenCalledWith(10);
    expect(setEndTime).toHaveBeenCalledWith(11); // Adjust end time if less than start time
  });

  test('handles end time change', () => {
    render(
      <TimeSelector
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    );

    const endTimeSelect = screen.getByLabelText(/End Time:/i);
    fireEvent.change(endTimeSelect, { target: { value: '11' } });

    expect(setEndTime).toHaveBeenCalledWith(11);
  });

  test('prevents setting end time less than or equal to start time', () => {
    render(
      <TimeSelector
        startTime={10}
        setStartTime={setStartTime}
        endTime={11}
        setEndTime={setEndTime}
      />
    );

    const endTimeSelect = screen.getByLabelText(/End Time:/i);
    fireEvent.change(endTimeSelect, { target: { value: '9' } });

    // The setEndTime function should not be called because 9 is less than start time (10)
    expect(setEndTime).not.toHaveBeenCalled();
  });
});
