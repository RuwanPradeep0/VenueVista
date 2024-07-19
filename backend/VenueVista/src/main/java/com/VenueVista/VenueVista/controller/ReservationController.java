package com.VenueVista.VenueVista.controller;


import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.UserReservationResponse;
import com.VenueVista.VenueVista.exception.AllReadyReservedException;
import com.VenueVista.VenueVista.exception.InvalidDataException;

//import com.VenueVista.VenueVista.service.EmailService;
import com.VenueVista.VenueVista.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
//    private final EmailService emailService;

    @PostMapping("/createreservations")
    public ReservationResponse handleReservation(@RequestBody ReservationRequest reservationRequest) throws InvalidDataException, AllReadyReservedException {
        ReservationResponse response = reservationService.handleReservation(reservationRequest);
//        emailService.sendReservationConfirmation(reservationRequest);
        return response;
    }

    @GetMapping("/getAllreservations")
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }


    @GetMapping("/user")
    public ResponseEntity<List<UserReservationResponse>> getUserReservations(@RequestParam(name = "email") String email) {
        try {
            List<UserReservationResponse> userReservations = reservationService.getUserReservations(email);
            return ResponseEntity.ok(userReservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deleteuserereservations")
    public ResponseEntity<String> deleteUserReservation(@RequestParam(name = "reservationId") Integer reservationId) {
        reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok("Reservation deleted successfully");
    }

}


