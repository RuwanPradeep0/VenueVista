package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Space;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpaceRepository extends JpaRepository<Space , Integer> {
    @Override
    Optional<Space> findById(Integer id);
}
