package com.VenueVista.VenueVista.models;

import com.VenueVista.VenueVista.models.user.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class WaitingTest {

    private Waiting waiting;

    @Mock
    private Space mockSpace;

    @Mock
    private User mockUser;

    @Before
    public void setUp() {
        waiting = Waiting.builder()
                .id(1)
                .space(mockSpace)
                .title("Waiting for Meeting Room")
                .waitingForDate(LocalDateTime.of(2024, 6, 18, 8, 0))
                .startTime(LocalDateTime.of(2024, 6, 18, 9, 0))
                .endTime(LocalDateTime.of(2024, 6, 18, 12, 0))
                .date("2024-06-18")
                .waitingBy(mockUser)
                .waitingId(12345L)
                .batch("Batch A")
                .responsiblePersonRole("Organizer")
                .available(true)
                .build();
    }

    @Test
    public void testWaitingObjectCreation() {
        assertNotNull(waiting);
        assertEquals(1, waiting.getId().intValue());
        assertEquals(mockSpace, waiting.getSpace());
        assertEquals("Waiting for Meeting Room", waiting.getTitle());
        assertEquals(LocalDateTime.of(2024, 6, 18, 8, 0), waiting.getWaitingForDate());
        assertEquals(LocalDateTime.of(2024, 6, 18, 9, 0), waiting.getStartTime());
        assertEquals(LocalDateTime.of(2024, 6, 18, 12, 0), waiting.getEndTime());
        assertEquals("2024-06-18", waiting.getDate());
        assertEquals(mockUser, waiting.getWaitingBy());
        assertEquals(12345L, waiting.getWaitingId());
        assertEquals("Batch A", waiting.getBatch());
        assertEquals("Organizer", waiting.getResponsiblePersonRole());
        assertEquals(true, waiting.isAvailable());
    }

    @Test
    public void testToStringMethod() {
        String expectedToString = "Waiting{id=1, space=" + mockSpace.toString() +
                ", title='Waiting for Meeting Room', waitingForDate=2024-06-18T08:00, " +
                "startTime=2024-06-18T09:00, endTime=2024-06-18T12:00, date='2024-06-18', " +
                "waitingBy=" + mockUser.toString() + ", waitingId=12345, batch='Batch A', " +
                "responsiblePersonRole='Organizer', available=true}";
        assertEquals(expectedToString, waiting.toString());
    }
}
