package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WaitingRequest {

    private String title;

    private Integer startTime; // Represents the time in the format HHMM (e.g., 1330 for 1:30 PM)

    private Integer endTime; // Represents the time in the format HHMM

    private Integer spaceID;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private String waitingForDate; // Represents the date in the format "yyyy-MM-dd"

    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date; // Represents the date in the format "yyyy-MM-dd"

    private Integer waitingByID;

    private String responsibleRole;

    private String batch;

    private Integer waitingId;

    public void setEmail(String s) {
    }
}
