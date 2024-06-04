package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WaitingRepository extends JpaRepository<Waiting , Integer> {

    List<Waiting> findByWaitingBy(User user);

}
