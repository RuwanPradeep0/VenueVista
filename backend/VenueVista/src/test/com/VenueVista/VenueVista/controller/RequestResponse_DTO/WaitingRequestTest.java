package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class WaitingRequestTest {

    @Test
    public void testBuilderAndGetters() {
        WaitingRequest waitingRequest = WaitingRequest.builder()
                .title("Sensors")
                .startTime(1330)
                .endTime(1430)
                .spaceID(101)
                .waitingForDate("2024-07-20")
                .date("2024-07-20")
                .waitingByID(1)
                .responsibleRole("Lecturer")
                .batch("E20")
                .waitingId(10)
                .build();

        assertEquals("Sensors", waitingRequest.getTitle());
        assertEquals(1330, waitingRequest.getStartTime());
        assertEquals(1430, waitingRequest.getEndTime());
        assertEquals(101, waitingRequest.getSpaceID());
        assertEquals("2024-07-20", waitingRequest.getWaitingForDate());
        assertEquals("2024-07-20", waitingRequest.getDate());
        assertEquals(1, waitingRequest.getWaitingByID());
        assertEquals("Lecturer", waitingRequest.getResponsibleRole());
        assertEquals("E20", waitingRequest.getBatch());
        assertEquals(10, waitingRequest.getWaitingId());
    }

    @Test
    public void testNoArgsConstructor() {
        WaitingRequest waitingRequest = new WaitingRequest();

        waitingRequest.setTitle("Computer Architecture");
        waitingRequest.setStartTime(900);
        waitingRequest.setEndTime(1000);
        waitingRequest.setSpaceID(202);
        waitingRequest.setWaitingForDate("2024-08-15");
        waitingRequest.setDate("2024-08-15");
        waitingRequest.setWaitingByID(2);
        waitingRequest.setResponsibleRole("Lecturer");
        waitingRequest.setBatch("E21");
        waitingRequest.setWaitingId(20);

        assertEquals("Computer Architecture", waitingRequest.getTitle());
        assertEquals(900, waitingRequest.getStartTime());
        assertEquals(1000, waitingRequest.getEndTime());
        assertEquals(202, waitingRequest.getSpaceID());
        assertEquals("2024-08-15", waitingRequest.getWaitingForDate());
        assertEquals("2024-08-15", waitingRequest.getDate());
        assertEquals(2, waitingRequest.getWaitingByID());
        assertEquals("Lecturer", waitingRequest.getResponsibleRole());
        assertEquals("E21", waitingRequest.getBatch());
        assertEquals(20, waitingRequest.getWaitingId());
    }

    @Test
    public void testAllArgsConstructor() {
        WaitingRequest waitingRequest = new WaitingRequest(
                "Workshop", 1000, 1200, 303, "2024-09-10", "2024-09-10", 3,
                "Coordinator", "E23", 30);

        assertEquals("Workshop", waitingRequest.getTitle());
        assertEquals(1000, waitingRequest.getStartTime());
        assertEquals(1200, waitingRequest.getEndTime());
        assertEquals(303, waitingRequest.getSpaceID());
        assertEquals("2024-09-10", waitingRequest.getWaitingForDate());
        assertEquals("2024-09-10", waitingRequest.getDate());
        assertEquals(3, waitingRequest.getWaitingByID());
        assertEquals("Coordinator", waitingRequest.getResponsibleRole());
        assertEquals("E23", waitingRequest.getBatch());
        assertEquals(30, waitingRequest.getWaitingId());
    }

    @Test
    public void testSetters() {
        WaitingRequest waitingRequest = new WaitingRequest();

        waitingRequest.setTitle("Lecture");
        waitingRequest.setStartTime(1100);
        waitingRequest.setEndTime(1300);
        waitingRequest.setSpaceID(404);
        waitingRequest.setWaitingForDate("2024-10-20");
        waitingRequest.setDate("2024-10-20");
        waitingRequest.setWaitingByID(4);
        waitingRequest.setResponsibleRole("Instructor");
        waitingRequest.setBatch("E22");
        waitingRequest.setWaitingId(40);

        assertEquals("Lecture", waitingRequest.getTitle());
        assertEquals(1100, waitingRequest.getStartTime());
        assertEquals(1300, waitingRequest.getEndTime());
        assertEquals(404, waitingRequest.getSpaceID());
        assertEquals("2024-10-20", waitingRequest.getWaitingForDate());
        assertEquals("2024-10-20", waitingRequest.getDate());
        assertEquals(4, waitingRequest.getWaitingByID());
        assertEquals("Instructor", waitingRequest.getResponsibleRole());
        assertEquals("E22", waitingRequest.getBatch());
        assertEquals(40, waitingRequest.getWaitingId());
    }
}
