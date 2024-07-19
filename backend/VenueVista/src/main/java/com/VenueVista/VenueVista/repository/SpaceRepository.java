package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.Space;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpaceRepository extends JpaRepository<Space , Integer> {


    Space getSpaceById(Integer spaceId);

}
