package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationAvailabilityService {

    @Autowired
    private ReservationRepository reservationRepository;

    public boolean isSpaceAvailableForReservation(int spaceId, LocalDateTime reservationDate, LocalDateTime startTime, LocalDateTime endTime) {
        // Retrieve existing reservations for the selected space and reservation date
        LocalDate reservationDay = reservationDate.toLocalDate();
        List<Reservation> existingReservations = reservationRepository.findBySpaceIdAndReservationDate(spaceId, reservationDay.atStartOfDay());

        // Check for overlap with existing reservations
        for (Reservation existingReservation : existingReservations) {
            if (doPeriodsOverlap(existingReservation.getStartTime(), existingReservation.getEndTime(), startTime, endTime)) {
                // There is an overlap, so the space is not available
                return false;
            }
        }

        // No overlap found, space is available
        return true;
    }

    // Helper method to check if two time periods overlap
    private boolean doPeriodsOverlap(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }
}
