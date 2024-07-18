package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReservationRequestTest {

    @Test
    public void testBuilderAndGetters() {
        ReservationRequest reservationRequest = ReservationRequest.builder()
                .title("Conference")
                .startTime(1330)
                .endTime(1430)
                .spaceID(101)
                .reservationDate("2024-07-20")
                .date("2024-07-20")
                .reservedByID(1)
                .responsibleRole("Manager")
                .batch("Batch A")
                .waitingId(10)
                .build();

        assertEquals("Conference", reservationRequest.getTitle());
        assertEquals(1330, reservationRequest.getStartTime());
        assertEquals(1430, reservationRequest.getEndTime());
        assertEquals(101, reservationRequest.getSpaceID());
        assertEquals("2024-07-20", reservationRequest.getReservationDate());
        assertEquals("2024-07-20", reservationRequest.getDate());
        assertEquals(1, reservationRequest.getReservedByID());
        assertEquals("Manager", reservationRequest.getResponsibleRole());
        assertEquals("Batch A", reservationRequest.getBatch());
        assertEquals(10, reservationRequest.getWaitingId());
    }

    @Test
    public void testNoArgsConstructor() {
        ReservationRequest reservationRequest = new ReservationRequest();

        reservationRequest.setTitle("Meeting");
        reservationRequest.setStartTime(900);
        reservationRequest.setEndTime(1000);
        reservationRequest.setSpaceID(202);
        reservationRequest.setReservationDate("2024-08-15");
        reservationRequest.setDate("2024-08-15");
        reservationRequest.setReservedByID(2);
        reservationRequest.setResponsibleRole("Supervisor");
        reservationRequest.setBatch("Batch B");
        reservationRequest.setWaitingId(20);

        assertEquals("Meeting", reservationRequest.getTitle());
        assertEquals(900, reservationRequest.getStartTime());
        assertEquals(1000, reservationRequest.getEndTime());
        assertEquals(202, reservationRequest.getSpaceID());
        assertEquals("2024-08-15", reservationRequest.getReservationDate());
        assertEquals("2024-08-15", reservationRequest.getDate());
        assertEquals(2, reservationRequest.getReservedByID());
        assertEquals("Supervisor", reservationRequest.getResponsibleRole());
        assertEquals("Batch B", reservationRequest.getBatch());
        assertEquals(20, reservationRequest.getWaitingId());
    }

    @Test
    public void testAllArgsConstructor() {
        ReservationRequest reservationRequest = new ReservationRequest(
                "Workshop", 1000, 1200, 303, "2024-09-10", "2024-09-10", 3, "Coordinator", "Batch C", 30);

        assertEquals("Workshop", reservationRequest.getTitle());
        assertEquals(1000, reservationRequest.getStartTime());
        assertEquals(1200, reservationRequest.getEndTime());
        assertEquals(303, reservationRequest.getSpaceID());
        assertEquals("2024-09-10", reservationRequest.getReservationDate());
        assertEquals("2024-09-10", reservationRequest.getDate());
        assertEquals(3, reservationRequest.getReservedByID());
        assertEquals("Coordinator", reservationRequest.getResponsibleRole());
        assertEquals("Batch C", reservationRequest.getBatch());
        assertEquals(30, reservationRequest.getWaitingId());
    }
}
