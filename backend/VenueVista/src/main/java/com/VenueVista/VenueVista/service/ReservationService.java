package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.ReservationResponse;
import com.VenueVista.VenueVista.exception.AllReadyReservedException;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.models.user.User;
import com.VenueVista.VenueVista.repository.ReservationRepository;
import com.VenueVista.VenueVista.repository.SpaceRepository;
import com.VenueVista.VenueVista.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public ReservationResponse handleReservation(ReservationRequest reservationRequest) throws InvalidDataException, AllReadyReservedException {

        Reservation reservation = requestToReservation(reservationRequest);

        //TODO : Handle waiting id > 0 case

        User user = (User) userRepository.getUserById(reservation.getReservedById().getId()).orElseThrow(() -> new InvalidDataException("invalid user"));


        if (reservationRepository.findBySpaceIdAndStartTimeAndEndTimeAndDate(reservation.getSpace().getId(), reservation.getStartTime(),
                reservation.getEndTime() , reservation.getDate()) != null) {
            throw new AllReadyReservedException("Reserved");
        }


        Reservation savedReservation = reservationRepository.save(reservation);
        ReservationResponse reservationResponse = mapToReservationResponse(savedReservation);
        return reservationResponse;
    }

    private Reservation requestToReservation(ReservationRequest reservationRequest) throws InvalidDataException {
        Reservation reservation = new Reservation();

        reservation.setTitle(reservationRequest.getTitle());
        Space space = spaceRepository.findById(reservationRequest.getSpaceID())
                .orElseThrow(() -> new ResourceNotFoundException("Space not found with ID: " + reservationRequest.getSpaceID()));
        reservation.setSpace(space);

        User reservedBy = userRepository.findById(reservationRequest.getReservedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + reservationRequest.getReservedBy()));
        reservation.setReservedById(reservedBy);

        reservation.setDate(reservationRequest.getDate());

        try {
            LocalDateTime dateTime = LocalDate.parse(reservationRequest.getReservationDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay();
            reservation.setReservationDate(dateTime);
            reservation.setStartTime(dateTime.withHour(reservationRequest.getStartTime() / 100)
                    .withMinute(reservationRequest.getStartTime() % 100));
            reservation.setEndTime(dateTime.withHour(reservationRequest.getEndTime() / 100)
                    .withMinute(reservationRequest.getEndTime() % 100));
        } catch (Exception e) {
            throw new InvalidDataException("Invalid date format. Expected format: yyyy-MM-dd");
        }


        System.out.println("Responsible Role: " + reservationRequest.getResponsibleRole());
        reservation.setResponsibleRole(reservationRequest.getResponsibleRole());

        reservation.setBatch(reservationRequest.getBatch());
        return reservation;
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {

        ReservationResponse reservationResponse = new ReservationResponse();

        reservationResponse.setTitle(reservation.getTitle());
        reservationResponse.setStartTime(reservation.getStartTime().getHour() * 100 + reservation.getStartTime().getMinute());
        reservationResponse.setEndTime(reservation.getEndTime().getHour() * 100 + reservation.getEndTime().getMinute());
        reservationResponse.setSpaceID(reservation.getSpace().getId());
        reservationResponse.setReservationDate(reservation.getReservationDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        reservationResponse.setDate(reservation.getDate());
        reservationResponse.setReservedBy(reservation.getReservedById().getId());
        reservationResponse.setResponsibleRole(reservation.getResponsibleRole()); // Assuming responsiblePerson is the same as reservedBy
        reservationResponse.setBatch(reservation.getBatch());
        reservationResponse.setWaitingId(0); // Set waitingId to 0 as it's not mentioned in the Reservation class
        return reservationResponse;
    }
}