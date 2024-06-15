import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TimeSelector from './TimeSelector';

describe('TimeSelector', () => {
  it('renders without crashing', () => {
    render(
      <TimeSelector
        startTime={8}
        setStartTime={() => {}}
        endTime={10}
        setEndTime={() => {}}
      />
    );
  });

  it('updates start time when changed', () => {
    const setStartTime = jest.fn();
    const { getByLabelText } = render(
      <TimeSelector
        startTime={8}
        setStartTime={setStartTime}
        endTime={10}
        setEndTime={() => {}}
      />
    );

    fireEvent.change(getByLabelText('Start Time:'), { target: { value: 9 } });

    expect(setStartTime).toHaveBeenCalledWith(9);
  });

  it('updates end time when changed', () => {
    const setEndTime = jest.fn();
    const { getByLabelText } = render(
      <TimeSelector
        startTime={8}
        setStartTime={() => {}}
        endTime={10}
        setEndTime={setEndTime}
      />
    );

    fireEvent.change(getByLabelText('End Time:'), { target: { value: 11 } });

    expect(setEndTime).toHaveBeenCalledWith(11);
  });

  it('does not allow end time to be less than start time', () => {
    const setEndTime = jest.fn();
    const { getByLabelText } = render(
      <TimeSelector
        startTime={8}
        setStartTime={() => {}}
        endTime={10}
        setEndTime={setEndTime}
      />
    );

    fireEvent.change(getByLabelText('End Time:'), { target: { value: 7 } });

    expect(setEndTime).not.toHaveBeenCalled();
  });

  it('automatically adjusts end time if less than start time', () => {
    const setEndTime = jest.fn();
    const { getByLabelText } = render(
      <TimeSelector
        startTime={8}
        setStartTime={() => {}}
        endTime={10}
        setEndTime={setEndTime}
      />
    );

    fireEvent.change(getByLabelText('End Time:'), { target: { value: 8 } });

    expect(setEndTime).toHaveBeenCalledWith(9);
  });
});
