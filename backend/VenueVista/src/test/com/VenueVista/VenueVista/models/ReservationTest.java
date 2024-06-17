package com.VenueVista.VenueVista.models;

import com.VenueVista.VenueVista.models.user.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class ReservationTest {

    private Reservation reservation;

    @Mock
    private Space space;

    @Mock
    private User user;

    @Before
    public void setUp() {
        // Create a reservation instance
        reservation = Reservation.builder()
                .id(1)
                .space(space)
                .reservedById(user)
                .title("Meeting Room Reservation")
                .reservationDate(LocalDateTime.of(2024, 6, 18, 10, 0))
                .startTime(LocalDateTime.of(2024, 6, 18, 10, 0))
                .endTime(LocalDateTime.of(2024, 6, 18, 12, 0))
                .date("2024-06-18")
                .responsibleRole("Organizer")
                .batch("Batch A")
                .build();
    }

    @Test
    public void testReservationFields() {
        // Test getter methods
        assertEquals(Integer.valueOf(1), reservation.getId());
        assertEquals(space, reservation.getSpace());
        assertEquals(user, reservation.getReservedById());
        assertEquals("Meeting Room Reservation", reservation.getTitle());
        assertEquals(LocalDateTime.of(2024, 6, 18, 10, 0), reservation.getReservationDate());
        assertEquals(LocalDateTime.of(2024, 6, 18, 10, 0), reservation.getStartTime());
        assertEquals(LocalDateTime.of(2024, 6, 18, 12, 0), reservation.getEndTime());
        assertEquals("2024-06-18", reservation.getDate());
        assertEquals("Organizer", reservation.getResponsibleRole());
        assertEquals("Batch A", reservation.getBatch());

        // Test toString method
        String expectedToString = "Reservation{id=1, space=" + space + ", reservedById=" + user + ", title='Meeting Room Reservation', " +
                "reservationDate=2024-06-18T10:00, startTime=2024-06-18T10:00, endTime=2024-06-18T12:00, date='2024-06-18', " +
                "responsibleRole='Organizer', batch='Batch A'}";
        assertEquals(expectedToString, reservation.toString());
    }

    @Test
    public void testReservationNotNull() {
        // Ensure the reservation instance is not null
        assertNotNull(reservation);
    }
}
