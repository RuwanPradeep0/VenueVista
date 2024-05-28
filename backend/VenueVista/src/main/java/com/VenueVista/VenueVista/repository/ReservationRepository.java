package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ReservationRepository extends JpaRepository<Reservation , Integer> {
    Reservation findBySpaceIdAndStartTimeAndEndTimeAndDate(Integer spaceId, LocalDateTime startTime, LocalDateTime endTime, String date);


}
