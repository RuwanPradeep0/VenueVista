package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserWaitingResponseTest {

    @Test
    public void testBuilderAndGetters() {
        UserWaitingResponse userWaitingResponse = UserWaitingResponse.builder()
                .id(1)
                .title("Conference")
                .startTime(1330)
                .endTime(1430)
                .spaceID(101)
                .reservationDate("2024-07-20")
                .date("2024-07-20")
                .waitingByID(1)
                .responsibleRole("Manager")
                .batch("Batch A")
                .fullName("John Doe")
                .spaceName("Conference Room A")
                .waitingId(10)
                .available(true)
                .build();

        assertEquals(1, userWaitingResponse.getId());
        assertEquals("Conference", userWaitingResponse.getTitle());
        assertEquals(1330, userWaitingResponse.getStartTime());
        assertEquals(1430, userWaitingResponse.getEndTime());
        assertEquals(101, userWaitingResponse.getSpaceID());
        assertEquals("2024-07-20", userWaitingResponse.getReservationDate());
        assertEquals("2024-07-20", userWaitingResponse.getDate());
        assertEquals(1, userWaitingResponse.getWaitingByID());
        assertEquals("Manager", userWaitingResponse.getResponsibleRole());
        assertEquals("Batch A", userWaitingResponse.getBatch());
        assertEquals("John Doe", userWaitingResponse.getFullName());
        assertEquals("Conference Room A", userWaitingResponse.getSpaceName());
        assertEquals(10, userWaitingResponse.getWaitingId());
        assertTrue(userWaitingResponse.isAvailable());
    }

    @Test
    public void testNoArgsConstructor() {
        UserWaitingResponse userWaitingResponse = new UserWaitingResponse();

        userWaitingResponse.setId(2);
        userWaitingResponse.setTitle("Meeting");
        userWaitingResponse.setStartTime(900);
        userWaitingResponse.setEndTime(1000);
        userWaitingResponse.setSpaceID(202);
        userWaitingResponse.setReservationDate("2024-08-15");
        userWaitingResponse.setDate("2024-08-15");
        userWaitingResponse.setWaitingByID(2);
        userWaitingResponse.setResponsibleRole("Supervisor");
        userWaitingResponse.setBatch("Batch B");
        userWaitingResponse.setFullName("Jane Smith");
        userWaitingResponse.setSpaceName("Meeting Room B");
        userWaitingResponse.setWaitingId(20);
        userWaitingResponse.setAvailable(false);

        assertEquals(2, userWaitingResponse.getId());
        assertEquals("Meeting", userWaitingResponse.getTitle());
        assertEquals(900, userWaitingResponse.getStartTime());
        assertEquals(1000, userWaitingResponse.getEndTime());
        assertEquals(202, userWaitingResponse.getSpaceID());
        assertEquals("2024-08-15", userWaitingResponse.getReservationDate());
        assertEquals("2024-08-15", userWaitingResponse.getDate());
        assertEquals(2, userWaitingResponse.getWaitingByID());
        assertEquals("Supervisor", userWaitingResponse.getResponsibleRole());
        assertEquals("Batch B", userWaitingResponse.getBatch());
        assertEquals("Jane Smith", userWaitingResponse.getFullName());
        assertEquals("Meeting Room B", userWaitingResponse.getSpaceName());
        assertEquals(20, userWaitingResponse.getWaitingId());
        assertFalse(userWaitingResponse.isAvailable());
    }

    @Test
    public void testAllArgsConstructor() {
        UserWaitingResponse userWaitingResponse = new UserWaitingResponse(
                3, "Workshop", 1000, 1200, 303, "2024-09-10", "2024-09-10", 3,
                "Coordinator", "Batch C", "Emily Davis", "Workshop Room", 30, true);

        assertEquals(3, userWaitingResponse.getId());
        assertEquals("Workshop", userWaitingResponse.getTitle());
        assertEquals(1000, userWaitingResponse.getStartTime());
        assertEquals(1200, userWaitingResponse.getEndTime());
        assertEquals(303, userWaitingResponse.getSpaceID());
        assertEquals("2024-09-10", userWaitingResponse.getReservationDate());
        assertEquals("2024-09-10", userWaitingResponse.getDate());
        assertEquals(3, userWaitingResponse.getWaitingByID());
        assertEquals("Coordinator", userWaitingResponse.getResponsibleRole());
        assertEquals("Batch C", userWaitingResponse.getBatch());
        assertEquals("Emily Davis", userWaitingResponse.getFullName());
        assertEquals("Workshop Room", userWaitingResponse.getSpaceName());
        assertEquals(30, userWaitingResponse.getWaitingId());
        assertTrue(userWaitingResponse.isAvailable());
    }

    @Test
    public void testSetters() {
        UserWaitingResponse userWaitingResponse = new UserWaitingResponse();

        userWaitingResponse.setId(4);
        userWaitingResponse.setTitle("Lecture");
        userWaitingResponse.setStartTime(1100);
        userWaitingResponse.setEndTime(1300);
        userWaitingResponse.setSpaceID(404);
        userWaitingResponse.setReservationDate("2024-10-20");
        userWaitingResponse.setDate("2024-10-20");
        userWaitingResponse.setWaitingByID(4);
        userWaitingResponse.setResponsibleRole("Instructor");
        userWaitingResponse.setBatch("Batch D");
        userWaitingResponse.setFullName("Michael Brown");
        userWaitingResponse.setSpaceName("Lecture Hall");
        userWaitingResponse.setWaitingId(40);
        userWaitingResponse.setAvailable(false);

        assertEquals(4, userWaitingResponse.getId());
        assertEquals("Lecture", userWaitingResponse.getTitle());
        assertEquals(1100, userWaitingResponse.getStartTime());
        assertEquals(1300, userWaitingResponse.getEndTime());
        assertEquals(404, userWaitingResponse.getSpaceID());
        assertEquals("2024-10-20", userWaitingResponse.getReservationDate());
        assertEquals("2024-10-20", userWaitingResponse.getDate());
        assertEquals(4, userWaitingResponse.getWaitingByID());
        assertEquals("Instructor", userWaitingResponse.getResponsibleRole());
        assertEquals("Batch D", userWaitingResponse.getBatch());
        assertEquals("Michael Brown", userWaitingResponse.getFullName());
        assertEquals("Lecture Hall", userWaitingResponse.getSpaceName());
        assertEquals(40, userWaitingResponse.getWaitingId());
        assertFalse(userWaitingResponse.isAvailable());
    }
}
