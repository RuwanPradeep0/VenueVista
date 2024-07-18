package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserReservationResponseTest {

    @Test
    public void testBuilderAndGetters() {
        UserReservationResponse userReservationResponse = UserReservationResponse.builder()
                .id(1)
                .title("Conference")
                .startTime(1330)
                .endTime(1430)
                .spaceID(101)
                .reservationDate("2024-07-20")
                .date("2024-07-20")
                .reservedByID(1)
                .responsibleRole("Manager")
                .batch("Batch A")
                .fullName("John Doe")
                .spaceName("Conference Room A")
                .waitingId(10)
                .build();

        assertEquals(1, userReservationResponse.getId());
        assertEquals("Conference", userReservationResponse.getTitle());
        assertEquals(1330, userReservationResponse.getStartTime());
        assertEquals(1430, userReservationResponse.getEndTime());
        assertEquals(101, userReservationResponse.getSpaceID());
        assertEquals("2024-07-20", userReservationResponse.getReservationDate());
        assertEquals("2024-07-20", userReservationResponse.getDate());
        assertEquals(1, userReservationResponse.getReservedByID());
        assertEquals("Manager", userReservationResponse.getResponsibleRole());
        assertEquals("Batch A", userReservationResponse.getBatch());
        assertEquals("John Doe", userReservationResponse.getFullName());
        assertEquals("Conference Room A", userReservationResponse.getSpaceName());
        assertEquals(10, userReservationResponse.getWaitingId());
    }

    @Test
    public void testNoArgsConstructor() {
        UserReservationResponse userReservationResponse = new UserReservationResponse();

        userReservationResponse.setId(2);
        userReservationResponse.setTitle("Meeting");
        userReservationResponse.setStartTime(900);
        userReservationResponse.setEndTime(1000);
        userReservationResponse.setSpaceID(202);
        userReservationResponse.setReservationDate("2024-08-15");
        userReservationResponse.setDate("2024-08-15");
        userReservationResponse.setReservedByID(2);
        userReservationResponse.setResponsibleRole("Supervisor");
        userReservationResponse.setBatch("Batch B");
        userReservationResponse.setFullName("Jane Smith");
        userReservationResponse.setSpaceName("Meeting Room B");
        userReservationResponse.setWaitingId(20);

        assertEquals(2, userReservationResponse.getId());
        assertEquals("Meeting", userReservationResponse.getTitle());
        assertEquals(900, userReservationResponse.getStartTime());
        assertEquals(1000, userReservationResponse.getEndTime());
        assertEquals(202, userReservationResponse.getSpaceID());
        assertEquals("2024-08-15", userReservationResponse.getReservationDate());
        assertEquals("2024-08-15", userReservationResponse.getDate());
        assertEquals(2, userReservationResponse.getReservedByID());
        assertEquals("Supervisor", userReservationResponse.getResponsibleRole());
        assertEquals("Batch B", userReservationResponse.getBatch());
        assertEquals("Jane Smith", userReservationResponse.getFullName());
        assertEquals("Meeting Room B", userReservationResponse.getSpaceName());
        assertEquals(20, userReservationResponse.getWaitingId());
    }

    @Test
    public void testAllArgsConstructor() {
        UserReservationResponse userReservationResponse = new UserReservationResponse(
                3, "Workshop", 1000, 1200, 303, "2024-09-10", "2024-09-10", 3,
                "Coordinator", "Batch C", "Emily Davis", "Workshop Room", 30);

        assertEquals(3, userReservationResponse.getId());
        assertEquals("Workshop", userReservationResponse.getTitle());
        assertEquals(1000, userReservationResponse.getStartTime());
        assertEquals(1200, userReservationResponse.getEndTime());
        assertEquals(303, userReservationResponse.getSpaceID());
        assertEquals("2024-09-10", userReservationResponse.getReservationDate());
        assertEquals("2024-09-10", userReservationResponse.getDate());
        assertEquals(3, userReservationResponse.getReservedByID());
        assertEquals("Coordinator", userReservationResponse.getResponsibleRole());
        assertEquals("Batch C", userReservationResponse.getBatch());
        assertEquals("Emily Davis", userReservationResponse.getFullName());
        assertEquals("Workshop Room", userReservationResponse.getSpaceName());
        assertEquals(30, userReservationResponse.getWaitingId());
    }

    @Test
    public void testSetters() {
        UserReservationResponse userReservationResponse = new UserReservationResponse();

        userReservationResponse.setId(4);
        userReservationResponse.setTitle("Lecture");
        userReservationResponse.setStartTime(1100);
        userReservationResponse.setEndTime(1300);
        userReservationResponse.setSpaceID(404);
        userReservationResponse.setReservationDate("2024-10-20");
        userReservationResponse.setDate("2024-10-20");
        userReservationResponse.setReservedByID(4);
        userReservationResponse.setResponsibleRole("Instructor");
        userReservationResponse.setBatch("Batch D");
        userReservationResponse.setFullName("Michael Brown");
        userReservationResponse.setSpaceName("Lecture Hall");
        userReservationResponse.setWaitingId(40);

        assertEquals(4, userReservationResponse.getId());
        assertEquals("Lecture", userReservationResponse.getTitle());
        assertEquals(1100, userReservationResponse.getStartTime());
        assertEquals(1300, userReservationResponse.getEndTime());
        assertEquals(404, userReservationResponse.getSpaceID());
        assertEquals("2024-10-20", userReservationResponse.getReservationDate());
        assertEquals("2024-10-20", userReservationResponse.getDate());
        assertEquals(4, userReservationResponse.getReservedByID());
        assertEquals("Instructor", userReservationResponse.getResponsibleRole());
        assertEquals("Batch D", userReservationResponse.getBatch());
        assertEquals("Michael Brown", userReservationResponse.getFullName());
        assertEquals("Lecture Hall", userReservationResponse.getSpaceName());
        assertEquals(40, userReservationResponse.getWaitingId());
    }
}
