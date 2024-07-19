package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacilityRepository extends JpaRepository<Facility , Integer> {
    Optional <Facility> findByName(String name);
}
