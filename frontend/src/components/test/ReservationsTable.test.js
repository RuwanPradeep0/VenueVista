import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ReservationsTable from './ReservationsTable';
import { createReservation, deleteUserReservation, deleteUserWaiting } from '../../../services/ReservationService';
import { getAllSpaces } from '../../../services/SpaceService';

jest.mock('../../../services/ReservationService');
jest.mock('../../../services/SpaceService');

const reservations = [
    {
        id: 1,
        title: 'Meeting',
        reservationDate: '2024-06-16T10:00:00Z',
        batch: 'A',
        spaceName: 'Conference Room',
        startTime: '10:00',
        endTime: '11:00',
        fullName: 'Wasana Sewwandi',
        responsiblePersonId: 1,
    },
];

describe('ReservationsTable Component', () => {
    it('filters lecture hall facilities', () => {
        // TODO: Implement this test case
    });

    it('adds a new lecture hall (Admin Only)', () => {
        // TODO: Implement this test case
    });
});
