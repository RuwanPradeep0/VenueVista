package com.VenueVista.VenueVista.models;

import com.VenueVista.VenueVista.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    private String title;

    private LocalDateTime waitingForDate;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User waitingBy;

    private long waitingId;

    private String batch;

    private String responsiblePersonRole;

    private boolean available;


}
