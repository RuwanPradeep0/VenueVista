package com.VenueVista.VenueVista.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name ="space")
public class Space {

    @Id
    @GeneratedValue
    private  Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int capacity;

    private String description;

//    private byte[] image;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "space_facility",
            joinColumns = @JoinColumn(name = "space_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private List<Facility> facilities;

//    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL)
//    private List<Reservation> reservations;
}
