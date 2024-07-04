package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface WaitingRepository extends JpaRepository<Waiting , Integer> {

    List<Waiting> findByWaitingBy(User user);

    void deleteById(Integer waitingId);


//    List<Waiting> findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
//            LocalDateTime waitingForDate, LocalDateTime reservationStart, LocalDateTime reservationEnd, Space space);
//

    List<Waiting> findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
            LocalDateTime waitingForDate, LocalDateTime reservationStart, LocalDateTime reservationEnd, Space space);
}

