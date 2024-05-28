package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ReservationRepository extends JpaRepository<Reservation , Integer> {
    Reservation getReservationsByDetails(Integer spaceId, LocalDateTime startDateTime, LocalDateTime endDateTime, String date);
    Reservation createReservation(Reservation reservation);

}
