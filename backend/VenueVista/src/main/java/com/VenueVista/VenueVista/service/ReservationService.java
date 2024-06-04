package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.ReservationResponse;
import com.VenueVista.VenueVista.controller.RequestResponse.UserReservationResponse;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationAvailabilityService reservationAvailabilityService;

    // Create Reservation
    public ReservationResponse handleReservation(ReservationRequest reservationRequest) throws InvalidDataException, AllReadyReservedException {
        Reservation reservation = requestToReservation(reservationRequest);

        // Check if space is available for the new reservation
        if (!reservationAvailabilityService.isSpaceAvailableForReservation(
                reservation.getSpace().getId(),
                reservation.getReservationDate(),
                reservation.getStartTime(),
                reservation.getEndTime())) {
            throw new AllReadyReservedException("Space not available for the selected time slot.");
        }

        User user = userRepository.findById(reservationRequest.getReservedByID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + reservationRequest.getReservedByID()));

        reservation.setReservedById(user);

        Reservation savedReservation = reservationRepository.save(reservation);
        ReservationResponse reservationResponse = mapToReservationResponse(savedReservation);
        return reservationResponse;
    }

    // Get all reservations
    public List<ReservationResponse> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    //Get uer Reservations
    public List<UserReservationResponse> getUserReservations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        List<Reservation> userReservations = reservationRepository.findByReservedById(user);
        return userReservations.stream()
                .map(this::mapToUserReservationResponse)
                .collect(Collectors.toList());
    }

    private Reservation requestToReservation(ReservationRequest reservationRequest) throws InvalidDataException {
        Reservation reservation = new Reservation();

        reservation.setTitle(reservationRequest.getTitle());
        Space space = spaceRepository.findById(reservationRequest.getSpaceID())
                .orElseThrow(() -> new ResourceNotFoundException("Space not found with ID: " + reservationRequest.getSpaceID()));
        reservation.setSpace(space);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime reservationDate = LocalDateTime.parse(reservationRequest.getReservationDate() + " 00:00", formatter);

            reservation.setReservationDate(reservationDate);
            reservation.setStartTime(reservationDate.withHour(reservationRequest.getStartTime() / 100)
                    .withMinute(reservationRequest.getStartTime() % 100));
            reservation.setEndTime(reservationDate.withHour(reservationRequest.getEndTime() / 100)
                    .withMinute(reservationRequest.getEndTime() % 100));
        } catch (Exception e) {
            throw new InvalidDataException("Invalid date format. Expected format: yyyy-MM-dd");
        }

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
        reservationResponse.setReservationDate(reservation.getReservationDate().toLocalDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        reservationResponse.setReservedByID(reservation.getReservedById().getId());
        reservationResponse.setResponsibleRole(reservation.getResponsibleRole());
        reservationResponse.setFullName(reservation.getReservedById().getFullName());
        reservationResponse.setBatch(reservation.getBatch());
        reservationResponse.setWaitingId(0); // Set waitingId to 0 as it's not mentioned in the Reservation class
        return reservationResponse;
    }





    private UserReservationResponse mapToUserReservationResponse(Reservation reservation) {
        UserReservationResponse userReservationResponse = new UserReservationResponse();

        userReservationResponse.setTitle(reservation.getTitle());
        userReservationResponse.setStartTime(reservation.getStartTime().getHour() * 100 + reservation.getStartTime().getMinute());
        userReservationResponse.setEndTime(reservation.getEndTime().getHour() * 100 + reservation.getEndTime().getMinute());
        userReservationResponse.setSpaceID(reservation.getSpace().getId());
        userReservationResponse.setReservationDate(reservation.getReservationDate().toLocalDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        userReservationResponse.setReservedByID(reservation.getReservedById().getId());
        userReservationResponse.setResponsibleRole(reservation.getResponsibleRole());
        userReservationResponse.setFullName(reservation.getReservedById().getFullName());
        userReservationResponse.setBatch(reservation.getBatch());
        userReservationResponse.setSpaceName(reservation.getSpace().getName());
        userReservationResponse.setWaitingId(0); // Set waitingId to 0 as it's not mentioned in the Reservation class
        return userReservationResponse;
    }
}
