package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse_DTO.SpaceRequest;
import com.VenueVista.VenueVista.models.Facility;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.repository.FacilityRepository;
import com.VenueVista.VenueVista.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final FacilityRepository facilityRepository;


public Space saveSpace(SpaceRequest spaceRequest){


    List<Facility> facilities = new ArrayList<>();
    for (String facilityName : spaceRequest.getFacilities()) {
        Facility facility = facilityRepository.findByName(facilityName)
                .orElseGet(() -> {
                    Facility newFacility = new Facility();
                    newFacility.setName(facilityName);
                    return facilityRepository.save(newFacility);
                });
        facilities.add(facility);
    }

    Space space = Space.builder()
            .name(spaceRequest.getName())
            .location(spaceRequest.getLocation())
            .capacity(spaceRequest.getCapacity())
            .description(spaceRequest.getDescription())
            .facilities(facilities)
            .build();

    // Save and return the Space object
    return spaceRepository.save(space);
}

public List<Space> getAllSpaces(){
    return spaceRepository.findAll();
}

}


