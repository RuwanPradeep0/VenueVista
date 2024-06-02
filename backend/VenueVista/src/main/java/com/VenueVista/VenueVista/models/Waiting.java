package com.VenueVista.VenueVista.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "waiting")
public class Waiting {

    @Id
    @GeneratedValue
    private Integer id;

    private int spaceID;

    private String title;

    private LocalDateTime waitingForDate;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String date;

    private long waitingId;

    private String responsiblePersonRole;

    private boolean available = false;


}
