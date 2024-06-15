import React from 'react';
import { render } from '@testing-library/react';
import ReservationInfo from './ReservationInfo';

describe('ReservationInfo', () => {
  test('renders reservation info correctly', () => {
    const reservation = {
      title: 'Meeting',
      spaceId: '123',
      date: '2022-01-01',
      startTime: '09:00',
      endTime: '10:00',
      reservedBy: 'John Doe',
      responsiblePerson: 'Jane Doe',
    };

    const { getByText } = render(<ReservationInfo reservation={reservation} />);

    expect(getByText('Meeting')).toBeInTheDocument();
    expect(getByText('Lecture Hall 01')).toBeInTheDocument();
    expect(getByText('2022-01-01')).toBeInTheDocument();
    expect(getByText('09:00 - 10:00')).toBeInTheDocument();
    expect(getByText('Reserved By')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Responsible Person')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();
    expect(getByText('Add to Waiting List')).toBeInTheDocument();
  });
});
