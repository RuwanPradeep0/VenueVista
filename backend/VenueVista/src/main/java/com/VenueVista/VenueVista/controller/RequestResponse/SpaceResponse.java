package com.VenueVista.VenueVista.controller.RequestResponse;

import com.VenueVista.VenueVista.models.Space;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class SpaceResponse {

    private Long id;
    private String name;
    private String location;
    private int capacity;
    private String description;
    private List<FacilityResponse> facilities;

    public SpaceResponse(Space space){
        this.facilities = space.getFacilities().stream()
                .map(FacilityResponse::new)
                .collect(Collectors.toList());
    }

}
