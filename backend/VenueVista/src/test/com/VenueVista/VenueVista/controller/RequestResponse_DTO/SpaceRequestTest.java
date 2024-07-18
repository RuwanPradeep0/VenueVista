package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class SpaceRequestTest {

    @Test
    public void testBuilderAndGetters() {
        List<String> facilities = Arrays.asList("Projector", "WiFi", "Whiteboard");
        SpaceRequest spaceRequest = SpaceRequest.builder()
                .name("Conference Room A")
                .location("First Floor")
                .capacity(50)
                .description("A spacious conference room equipped with modern facilities.")
                .facilities(facilities)
                .build();

        assertEquals("Conference Room A", spaceRequest.getName());
        assertEquals("First Floor", spaceRequest.getLocation());
        assertEquals(50, spaceRequest.getCapacity());
        assertEquals("A spacious conference room equipped with modern facilities.", spaceRequest.getDescription());
        assertEquals(facilities, spaceRequest.getFacilities());
    }

    @Test
    public void testNoArgsConstructor() {
        SpaceRequest spaceRequest = new SpaceRequest();

        spaceRequest.setName("Meeting Room B");
        spaceRequest.setLocation("Second Floor");
        spaceRequest.setCapacity(20);
        spaceRequest.setDescription("A small meeting room suitable for team meetings.");
        List<String> facilities = Arrays.asList("Monitor", "Conference Phone");
        spaceRequest.setFacilities(facilities);

        assertEquals("Meeting Room B", spaceRequest.getName());
        assertEquals("Second Floor", spaceRequest.getLocation());
        assertEquals(20, spaceRequest.getCapacity());
        assertEquals("A small meeting room suitable for team meetings.", spaceRequest.getDescription());
        assertEquals(facilities, spaceRequest.getFacilities());
    }

    @Test
    public void testAllArgsConstructor() {
        List<String> facilities = Arrays.asList("AC", "Sound System", "Mic");
        SpaceRequest spaceRequest = new SpaceRequest(
                "Training Room C", "Third Floor", 30, "A training room with modern audio-visual equipment.", facilities);

        assertEquals("Training Room C", spaceRequest.getName());
        assertEquals("Third Floor", spaceRequest.getLocation());
        assertEquals(30, spaceRequest.getCapacity());
        assertEquals("A training room with modern audio-visual equipment.", spaceRequest.getDescription());
        assertEquals(facilities, spaceRequest.getFacilities());
    }

    @Test
    public void testSetters() {
        SpaceRequest spaceRequest = new SpaceRequest();

        spaceRequest.setName("Lecture Hall D");
        spaceRequest.setLocation("Ground Floor");
        spaceRequest.setCapacity(100);
        spaceRequest.setDescription("A large lecture hall with tiered seating.");
        List<String> facilities = Arrays.asList("Projector", "Speakers", "Lighting Control");
        spaceRequest.setFacilities(facilities);

        assertEquals("Lecture Hall D", spaceRequest.getName());
        assertEquals("Ground Floor", spaceRequest.getLocation());
        assertEquals(100, spaceRequest.getCapacity());
        assertEquals("A large lecture hall with tiered seating.", spaceRequest.getDescription());
        assertEquals(facilities, spaceRequest.getFacilities());
    }
}
