package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
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

//public SpaceService(SpaceRepository spaceRepository , FacilityRepository facilityRepository){
//    this.spaceRepository = spaceRepository;
//    this.facilityRepository = facilityRepository;
//}

public Space saveSpace(SpaceRequest spaceRequest){
    Space space = new Space();

    space.setName(spaceRequest.getName());
    space.setLocation(spaceRequest.getLocation());
    space.setCapacity(spaceRequest.getCapacity());
    space.setDescription(spaceRequest.getDescription());
    space.setImage(spaceRequest.getImage());

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
    space.setFacilities(facilities);

    return spaceRepository.save(space);
}

}
