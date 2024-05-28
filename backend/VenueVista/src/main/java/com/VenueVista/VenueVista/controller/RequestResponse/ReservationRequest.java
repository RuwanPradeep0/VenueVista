package com.VenueVista.VenueVista.controller.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequest {
    private String title;
    private Integer startTime;
    private Integer endTime;
    private Integer spaceID;
    private String reservationDateTime;
    private String date;
    private Integer reservedBy;
    private Integer responsibleRole;
    private String batch;
    private Integer waitingId;
}
