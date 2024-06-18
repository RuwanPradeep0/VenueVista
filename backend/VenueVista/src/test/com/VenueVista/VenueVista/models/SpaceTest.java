package com.VenueVista.VenueVista.models;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class SpaceTest {

    private Space space;

    @Mock
    private List<Facility> mockFacilities;

    @Mock
    private List<Reservation> mockReservations;

    @Mock
    private List<Waiting> mockWaitings;

    @Before
    public void setUp() {
        space = Space.builder()
                .id(1)
                .name("Conference Room")
                .location("Building A, Floor 1")
                .capacity(20)
                .description("Large conference room with AV equipment")
                .facilities(mockFacilities)
                .reservations(mockReservations)
                .waitings(mockWaitings)
                .build();
    }

    @Test
    public void testSpaceObjectCreation() {
        assertNotNull(space);
        assertEquals(1, space.getId().intValue());
        assertEquals("Conference Room", space.getName());
        assertEquals("Building A, Floor 1", space.getLocation());
        assertEquals(20, space.getCapacity());
        assertEquals("Large conference room with AV equipment", space.getDescription());
        assertEquals(mockFacilities, space.getFacilities());
        assertEquals(mockReservations, space.getReservations());
        assertEquals(mockWaitings, space.getWaitings());
    }

    @Test
    public void testToStringMethod() {
        String expectedToString = "Space{id=1, name='Conference Room', description='Large conference room with AV equipment', location='Building A, Floor 1', capacity=20}";
        assertEquals(expectedToString, space.toString());
    }
}
