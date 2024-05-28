package com.VenueVista.VenueVista.controller.RequestResponse;

import lombok.Data;

@Data
public class ReservationResponse {
    private String title;
    private Integer startTime;
    private Integer endTime;
    private Integer spaceID;
    private String reservationDate;
    private String date;
    private Integer reservedBy;
    private Integer responsibleRole;
    private String batch;
    private Integer waitingId;
}
