package com.VenueVista.VenueVista.models;

import com.VenueVista.VenueVista.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="reservation")
public class Reservation {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User reservedById;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime reservationDate;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String date;

    private String responsibleRole;

    @Column(nullable = false)
    private String batch;

    private boolean isCancelled;
}
