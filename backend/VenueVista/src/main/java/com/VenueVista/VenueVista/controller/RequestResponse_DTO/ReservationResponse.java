package com.VenueVista.VenueVista.controller.RequestResponse_DTO;

import lombok.Data;

@Data
public class ReservationResponse {

    private Integer id;

    private String title;

    private Integer startTime;

    private Integer endTime;

    private Integer spaceID;

    private String reservationDate;

    private String date;

    private Integer reservedByID;

    private String responsibleRole;

    private String batch;

    private String fullName;

    private Integer waitingId;

}
