package com.VenueVista.VenueVista.controller.RequestResponse;

import com.VenueVista.VenueVista.models.Facility;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacilityResponse {

    private String name;


    public FacilityResponse(Facility facility) {
        this.name = facility.getName();
    }
}
