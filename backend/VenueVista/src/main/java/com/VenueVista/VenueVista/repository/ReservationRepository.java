package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findBySpaceIdAndReservationDate(int spaceId, LocalDateTime date);

    List<Reservation> findByReservedById(User user);

}
