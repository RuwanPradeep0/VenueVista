package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class WaitingResponseTest {

    @Test
    public void testBuilderAndGetters() {
        WaitingResponse waitingResponse = WaitingResponse.builder()
                .title("Guest Lecture")
                .startTime(1330)
                .endTime(1430)
                .spaceID(101)
                .reservationDate("2024-07-20")
                .date("2024-07-20")
                .waitingByID(1)
                .responsibleRole("Lecturer")
                .batch("E20")
                .fullName("John Doe")
                .waitingId(10)
                .build();

        assertEquals("Guest Lecture", waitingResponse.getTitle());
        assertEquals(1330, waitingResponse.getStartTime());
        assertEquals(1430, waitingResponse.getEndTime());
        assertEquals(101, waitingResponse.getSpaceID());
        assertEquals("2024-07-20", waitingResponse.getReservationDate());
        assertEquals("2024-07-20", waitingResponse.getDate());
        assertEquals(1, waitingResponse.getWaitingByID());
        assertEquals("Lecturer", waitingResponse.getResponsibleRole());
        assertEquals("E20", waitingResponse.getBatch());
        assertEquals("John Doe", waitingResponse.getFullName());
        assertEquals(10, waitingResponse.getWaitingId());
    }

    @Test
    public void testNoArgsConstructor() {
        WaitingResponse waitingResponse = new WaitingResponse();

        waitingResponse.setTitle("Meeting");
        waitingResponse.setStartTime(900);
        waitingResponse.setEndTime(1000);
        waitingResponse.setSpaceID(202);
        waitingResponse.setReservationDate("2024-08-15");
        waitingResponse.setDate("2024-08-15");
        waitingResponse.setWaitingByID(2);
        waitingResponse.setResponsibleRole("Supervisor");
        waitingResponse.setBatch("E21");
        waitingResponse.setFullName("Jane Smith");
        waitingResponse.setWaitingId(20);

        assertEquals("Meeting", waitingResponse.getTitle());
        assertEquals(900, waitingResponse.getStartTime());
        assertEquals(1000, waitingResponse.getEndTime());
        assertEquals(202, waitingResponse.getSpaceID());
        assertEquals("2024-08-15", waitingResponse.getReservationDate());
        assertEquals("2024-08-15", waitingResponse.getDate());
        assertEquals(2, waitingResponse.getWaitingByID());
        assertEquals("Supervisor", waitingResponse.getResponsibleRole());
        assertEquals("E21", waitingResponse.getBatch());
        assertEquals("Jane Smith", waitingResponse.getFullName());
        assertEquals(20, waitingResponse.getWaitingId());
    }

    @Test
    public void testAllArgsConstructor() {
        WaitingResponse waitingResponse = new WaitingResponse(
                "Workshop", 1000, 1200, 303, "2024-09-10", "2024-09-10", 3,
                "Coordinator", "E23", "Emily Davis", 30);

        assertEquals("Workshop", waitingResponse.getTitle());
        assertEquals(1000, waitingResponse.getStartTime());
        assertEquals(1200, waitingResponse.getEndTime());
        assertEquals(303, waitingResponse.getSpaceID());
        assertEquals("2024-09-10", waitingResponse.getReservationDate());
        assertEquals("2024-09-10", waitingResponse.getDate());
        assertEquals(3, waitingResponse.getWaitingByID());
        assertEquals("Coordinator", waitingResponse.getResponsibleRole());
        assertEquals("E23", waitingResponse.getBatch());
        assertEquals("Emily Davis", waitingResponse.getFullName());
        assertEquals(30, waitingResponse.getWaitingId());
    }

    @Test
    public void testSetters() {
        WaitingResponse waitingResponse = new WaitingResponse();

        waitingResponse.setTitle("Lecture");
        waitingResponse.setStartTime(1100);
        waitingResponse.setEndTime(1300);
        waitingResponse.setSpaceID(404);
        waitingResponse.setReservationDate("2024-10-20");
        waitingResponse.setDate("2024-10-20");
        waitingResponse.setWaitingByID(4);
        waitingResponse.setResponsibleRole("Instructor");
        waitingResponse.setBatch("E19");
        waitingResponse.setFullName("Michael Brown");
        waitingResponse.setWaitingId(40);

        assertEquals("Lecture", waitingResponse.getTitle());
        assertEquals(1100, waitingResponse.getStartTime());
        assertEquals(1300, waitingResponse.getEndTime());
        assertEquals(404, waitingResponse.getSpaceID());
        assertEquals("2024-10-20", waitingResponse.getReservationDate());
        assertEquals("2024-10-20", waitingResponse.getDate());
        assertEquals(4, waitingResponse.getWaitingByID());
        assertEquals("Instructor", waitingResponse.getResponsibleRole());
        assertEquals("E19", waitingResponse.getBatch());
        assertEquals("Michael Brown", waitingResponse.getFullName());
        assertEquals(40, waitingResponse.getWaitingId());
    }
}
