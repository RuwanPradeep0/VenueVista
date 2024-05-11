package com.VenueVista.VenueVista.controller.RequestResponse;

import com.VenueVista.VenueVista.models.Space;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor


public class SpaceResponse {

//    private byte[] image;
    private Integer id;
    private String name;
    private String location;
    private int capacity;
    private String description;
    private List<FacilityResponse> facilities;

    public SpaceResponse(Space space) {
        this.id = space.getId();// Convert Integer to Long
        this.name = space.getName();
        this.location = space.getLocation();
        this.capacity = space.getCapacity();
        this.description = space.getDescription();
        //here returning image as bytes, make sure to convert it to an image from frontend
//        this.image = space.getImage();
        this.facilities = space.getFacilities().stream()
                .map(FacilityResponse::new)
                .collect(Collectors.toList());
    }

}
