package com.VenueVista.VenueVista.models;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class FacilityTest {

    private Facility facility;

    @Mock
    private Space space1;

    @Mock
    private Space space2;

    @Before
    public void setUp() {
        facility = Facility.builder()
                .id(1)
                .name("Conference Room")
                .build();
    }

    @Test
    public void testFacilityToString() {
        String expectedToString = "Facility{id=1, name='Conference Room'}";
        assertEquals(expectedToString, facility.toString());
    }

    @Test
    public void testFacilitySpacesAssociation() {
        // Create spaces and add them to the facility
        List<Space> spaces = new ArrayList<>();
        spaces.add(space1);
        spaces.add(space2);

        facility.setSpaces(spaces);

        // Ensure that both spaces are associated with the facility
        assertEquals(2, facility.getSpaces().size());
        assertEquals(space1, facility.getSpaces().get(0));
        assertEquals(space2, facility.getSpaces().get(1));

        // Ensure bidirectional association is set correctly
        for (Space space : spaces) {
            List<Facility> facilities = space.getFacilities();
            assertEquals(1, facilities.size());
            assertEquals(facility, facilities.get(0));
        }
    }
}
