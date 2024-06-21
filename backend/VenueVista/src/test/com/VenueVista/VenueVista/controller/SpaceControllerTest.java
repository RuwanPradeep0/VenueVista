package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.controller.RequestResponse_DTO.SpaceRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.SpaceResponse;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.service.SpaceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class SpaceControllerTest {

    @InjectMocks
    private SpaceController spaceController;

    @Mock
    private SpaceService spaceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateSpace() {
        SpaceRequest spaceRequest = new SpaceRequest();
        Space savedSpace = new Space();
        when(spaceService.saveSpace(spaceRequest)).thenReturn(savedSpace);

        ResponseEntity<SpaceResponse> response = spaceController.createSpace(spaceRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(new SpaceResponse(savedSpace), response.getBody());
        verify(spaceService, times(1)).saveSpace(spaceRequest);
    }

    @Test
    void testGetAllSpaces() {
        List<Space> spaces = new ArrayList<>();
        spaces.add(new Space());
        spaces.add(new Space());
        when(spaceService.getAllSpaces()).thenReturn(spaces);

        ResponseEntity<List<SpaceResponse>> response = spaceController.getAllSpaces();

        List<SpaceResponse> expectedResponses = new ArrayList<>();
        for (Space space : spaces) {
            expectedResponses.add(new SpaceResponse(space));
        }

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponses, response.getBody());
        verify(spaceService, times(1)).getAllSpaces();
    }
}
