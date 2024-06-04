package com.VenueVista.VenueVista.controller.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserWaitingResponse {

    private String title;

    private Integer startTime;

    private Integer endTime;

    private Integer spaceID;

    private String waitingForDate;

    private String date;

    private Integer waitingByID;

    private String responsibleRole;

    private String batch;

    private String fullName;

    private String spaceName;

    private Integer waitingId;
}
