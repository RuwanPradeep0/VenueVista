package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReservationResponseTest {

    @Test
    public void testGettersAndSetters() {
        ReservationResponse reservationResponse = new ReservationResponse();

        reservationResponse.setId(1);
        reservationResponse.setTitle("Conference");
        reservationResponse.setStartTime(1330);
        reservationResponse.setEndTime(1430);
        reservationResponse.setSpaceID(101);
        reservationResponse.setReservationDate("2024-07-20");
        reservationResponse.setDate("2024-07-20");
        reservationResponse.setReservedByID(1);
        reservationResponse.setResponsibleRole("Lecturer");
        reservationResponse.setBatch("Batch A");
        reservationResponse.setFullName("John Doe");
        reservationResponse.setWaitingId(10);

        assertEquals(1, reservationResponse.getId());
        assertEquals("Conference", reservationResponse.getTitle());
        assertEquals(1330, reservationResponse.getStartTime());
        assertEquals(1430, reservationResponse.getEndTime());
        assertEquals(101, reservationResponse.getSpaceID());
        assertEquals("2024-07-20", reservationResponse.getReservationDate());
        assertEquals("2024-07-20", reservationResponse.getDate());
        assertEquals(1, reservationResponse.getReservedByID());
        assertEquals("Lecturer", reservationResponse.getResponsibleRole());
        assertEquals("Batch A", reservationResponse.getBatch());
        assertEquals("John Doe", reservationResponse.getFullName());
        assertEquals(10, reservationResponse.getWaitingId());
    }

    @Test
    public void testNoArgsConstructor() {
        ReservationResponse reservationResponse = new ReservationResponse();

        assertNull(reservationResponse.getId());
        assertNull(reservationResponse.getTitle());
        assertNull(reservationResponse.getStartTime());
        assertNull(reservationResponse.getEndTime());
        assertNull(reservationResponse.getSpaceID());
        assertNull(reservationResponse.getReservationDate());
        assertNull(reservationResponse.getDate());
        assertNull(reservationResponse.getReservedByID());
        assertNull(reservationResponse.getResponsibleRole());
        assertNull(reservationResponse.getBatch());
        assertNull(reservationResponse.getFullName());
        assertNull(reservationResponse.getWaitingId());
    }

    @Test
    public void testSetters() {
        ReservationResponse reservationResponse = new ReservationResponse();

        reservationResponse.setId(2);
        reservationResponse.setTitle("Workshop");
        reservationResponse.setStartTime(1000);
        reservationResponse.setEndTime(1200);
        reservationResponse.setSpaceID(202);
        reservationResponse.setReservationDate("2024-09-10");
        reservationResponse.setDate("2024-09-10");
        reservationResponse.setReservedByID(3);
        reservationResponse.setResponsibleRole("Coordinator");
        reservationResponse.setBatch("Batch B");
        reservationResponse.setFullName("Jane Smith");
        reservationResponse.setWaitingId(20);

        assertEquals(2, reservationResponse.getId());
        assertEquals("Workshop", reservationResponse.getTitle());
        assertEquals(1000, reservationResponse.getStartTime());
        assertEquals(1200, reservationResponse.getEndTime());
        assertEquals(202, reservationResponse.getSpaceID());
        assertEquals("2024-09-10", reservationResponse.getReservationDate());
        assertEquals("2024-09-10", reservationResponse.getDate());
        assertEquals(3, reservationResponse.getReservedByID());
        assertEquals("Coordinator", reservationResponse.getResponsibleRole());
        assertEquals("Batch B", reservationResponse.getBatch());
        assertEquals("Jane Smith", reservationResponse.getFullName());
        assertEquals(20, reservationResponse.getWaitingId());
    }
}
