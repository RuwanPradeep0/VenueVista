package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.UserReservationResponse;
import com.VenueVista.VenueVista.exception.AllReadyReservedException;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.service.ReservationService;
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

class ReservationControllerTest {

    @InjectMocks
    private ReservationController reservationController;

    @Mock
    private ReservationService reservationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testHandleReservation() throws InvalidDataException, AllReadyReservedException {
        ReservationRequest reservationRequest = new ReservationRequest();
        ReservationResponse expectedResponse = new ReservationResponse();
        when(reservationService.handleReservation(reservationRequest)).thenReturn(expectedResponse);

        ReservationResponse actualResponse = reservationController.handleReservation(reservationRequest);

        assertEquals(expectedResponse, actualResponse);
        verify(reservationService, times(1)).handleReservation(reservationRequest);
    }

    @Test
    void testGetAllReservations() {
        List<ReservationResponse> expectedReservations = new ArrayList<>();
        when(reservationService.getAllReservations()).thenReturn(expectedReservations);

        List<ReservationResponse> actualReservations = reservationController.getAllReservations();

        assertEquals(expectedReservations, actualReservations);
        verify(reservationService, times(1)).getAllReservations();
    }

    @Test
    void testGetUserReservations() {
        String email = "test@example.com";
        List<UserReservationResponse> expectedUserReservations = new ArrayList<>();
        when(reservationService.getUserReservations(email)).thenReturn(expectedUserReservations);

        ResponseEntity<List<UserReservationResponse>> response = reservationController.getUserReservations(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUserReservations, response.getBody());
        verify(reservationService, times(1)).getUserReservations(email);
    }

    @Test
    void testGetUserReservations_Exception() {
        String email = "test@example.com";
        when(reservationService.getUserReservations(email)).thenThrow(new RuntimeException());

        ResponseEntity<List<UserReservationResponse>> response = reservationController.getUserReservations(email);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        verify(reservationService, times(1)).getUserReservations(email);
    }

    @Test
    void testDeleteUserReservation() {
        Integer reservationId = 1;
        doNothing().when(reservationService).deleteReservationById(reservationId);

        ResponseEntity<String> response = reservationController.deleteUserReservation(reservationId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Reservation deleted successfully", response.getBody());
        verify(reservationService, times(1)).deleteReservationById(reservationId);
    }
}
