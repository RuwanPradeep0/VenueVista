package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class WaitingListResponseTest {

    @Test
    public void testBuilderAndGetters() {
        WaitingListResponse waitingListResponse = WaitingListResponse.builder()
                .id(1)
                .title("Conference")
                .fullName("John Doe")
                .batch("Batch A")
                .responsiblePersonRole("Manager")
                .available(true)
                .build();

        assertEquals(1, waitingListResponse.getId());
        assertEquals("Conference", waitingListResponse.getTitle());
        assertEquals("John Doe", waitingListResponse.getFullName());
        assertEquals("Batch A", waitingListResponse.getBatch());
        assertEquals("Manager", waitingListResponse.getResponsiblePersonRole());
        assertTrue(waitingListResponse.isAvailable());
    }

    @Test
    public void testNoArgsConstructor() {
        WaitingListResponse waitingListResponse = new WaitingListResponse();

        waitingListResponse.setId(2);
        waitingListResponse.setTitle("Meeting");
        waitingListResponse.setFullName("Jane Smith");
        waitingListResponse.setBatch("Batch B");
        waitingListResponse.setResponsiblePersonRole("Supervisor");
        waitingListResponse.setAvailable(false);

        assertEquals(2, waitingListResponse.getId());
        assertEquals("Meeting", waitingListResponse.getTitle());
        assertEquals("Jane Smith", waitingListResponse.getFullName());
        assertEquals("Batch B", waitingListResponse.getBatch());
        assertEquals("Supervisor", waitingListResponse.getResponsiblePersonRole());
        assertFalse(waitingListResponse.isAvailable());
    }

    @Test
    public void testAllArgsConstructor() {
        WaitingListResponse waitingListResponse = new WaitingListResponse(
                3, "Workshop", "Emily Davis", "Batch C", "Coordinator", true);

        assertEquals(3, waitingListResponse.getId());
        assertEquals("Workshop", waitingListResponse.getTitle());
        assertEquals("Emily Davis", waitingListResponse.getFullName());
        assertEquals("Batch C", waitingListResponse.getBatch());
        assertEquals("Coordinator", waitingListResponse.getResponsiblePersonRole());
        assertTrue(waitingListResponse.isAvailable());
    }

    @Test
    public void testSetters() {
        WaitingListResponse waitingListResponse = new WaitingListResponse();

        waitingListResponse.setId(4);
        waitingListResponse.setTitle("Lecture");
        waitingListResponse.setFullName("Michael Brown");
        waitingListResponse.setBatch("Batch D");
        waitingListResponse.setResponsiblePersonRole("Instructor");
        waitingListResponse.setAvailable(false);

        assertEquals(4, waitingListResponse.getId());
        assertEquals("Lecture", waitingListResponse.getTitle());
        assertEquals("Michael Brown", waitingListResponse.getFullName());
        assertEquals("Batch D", waitingListResponse.getBatch());
        assertEquals("Instructor", waitingListResponse.getResponsiblePersonRole());
        assertFalse(waitingListResponse.isAvailable());
    }
}
