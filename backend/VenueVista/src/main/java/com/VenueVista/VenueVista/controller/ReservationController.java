package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.controller.RequestResponse.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.ReservationResponse;
import com.VenueVista.VenueVista.exception.AllReadyReservedException;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("/api/v1/reservations")
@CrossOrigin("*")
public class ReservationController {

    private ReservationService reservationService;

    @PostMapping("/createreservations")
    public ReservationResponse handleReservation(@RequestBody ReservationRequest reservationRequest) throws InvalidDataException, AllReadyReservedException {
        return reservationService.handleReservation(reservationRequest);
    }

}
