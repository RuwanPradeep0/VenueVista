package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WaitingResponse {

    private String title;

    private Integer startTime;

    private Integer endTime;

    private Integer spaceID;

    private String reservationDate;

    private String date;

    private Integer waitingByID;

    private String responsibleRole;

    private String batch;

    private String fullName;

    private Integer waitingId;

    public WaitingResponse(String title, int startTime, int endTime, int spaceID, String string, String date, int waitingId, String s, Integer id) {
    }
}

