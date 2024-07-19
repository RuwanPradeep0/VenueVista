package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaitingListResponse {
    private Integer id;
    private String title;
    private String fullName;
    private String batch;
    private String responsiblePersonRole;
    private boolean available;
    // Add any other fields you want to include in the response
}