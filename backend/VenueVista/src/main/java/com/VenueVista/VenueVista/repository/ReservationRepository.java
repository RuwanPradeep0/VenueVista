package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findBySpaceIdAndReservationDate(int spaceId, LocalDateTime date);
    Optional<Reservation> findBySpaceAndStartTimeAndEndTime(Space space, LocalDateTime startTime, LocalDateTime endTime);


    List<Reservation> findByReservedById(User user);

    void deleteById(Integer id);

}
