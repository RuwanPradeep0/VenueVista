package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.ReservationResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.UserReservationResponse;
import com.VenueVista.VenueVista.exception.AllReadyReservedException;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.models.user.User;
import com.VenueVista.VenueVista.repository.ReservationRepository;
import com.VenueVista.VenueVista.repository.SpaceRepository;
import com.VenueVista.VenueVista.repository.UserRepository;
import com.VenueVista.VenueVista.repository.WaitingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private final WaitingService waitingService;
    private final WaitingRepository waitingRepository;

    // Create Reservation
    public ReservationResponse handleReservation(ReservationRequest reservationRequest) throws InvalidDataException, AllReadyReservedException {

       if(reservationRequest.getWaitingId() >0){
           waitingService.deleteUserWaitng(reservationRequest.getWaitingId());
       }

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

    // Get user Reservations
    public List<UserReservationResponse> getUserReservations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        List<Reservation> userReservations = reservationRepository.findByReservedById(user);
        return userReservations.stream()
                .map(this::mapToUserReservationResponse)
                .collect(Collectors.toList());
    }

    // Delete User Reservation
    public void deleteReservationById(Integer reservationId) {
        if (!reservationRepository.existsById(reservationId)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + reservationId);
        }
        reservationRepository.deleteById(reservationId);
    }



    @Transactional
    public void cancelReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + reservationId));

        LocalDateTime reservationStart = reservation.getStartTime();
        LocalDateTime reservationEnd = reservation.getEndTime();
        LocalDateTime reservationDate = reservation.getReservationDate();
        Space space = reservation.getSpace();

        List<Waiting> overlappingWaitings = waitingRepository.findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
                reservationDate, reservationStart, reservationEnd, space);

        System.out.println("Overlapping waitings: " + overlappingWaitings.size());

        // Move these waiting entries to an available status
        for (Waiting waiting : overlappingWaitings) {
            waiting.setAvailable(true);
            waitingRepository.save(waiting);
        }

        // Delete the reservation from the database
        reservationRepository.delete(reservation);
    }

    // Scheduled task to delete reservations older than 3 days
    @Scheduled(cron = "0 0 0 * * ?") // Runs every day at midnight
    public void deleteOldReservations() {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
        List<Reservation> oldReservations = reservationRepository.findAll().stream()
                .filter(reservation -> reservation.getReservationDate().toLocalDate().isBefore(threeDaysAgo))
                .collect(Collectors.toList());

        oldReservations.forEach(reservation -> reservationRepository.deleteById(reservation.getId()));
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

        reservationResponse.setId(reservation.getId());
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

        userReservationResponse.setId(reservation.getId());
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
