package com.VenueVista.VenueVista.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "space")
public class space {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tempID;

    private String spaceName;
    private String location;
    private Integer capacity;
    private String description;
    private String imageUrl;

    private boolean hasAC;
    private boolean hasSmartBoard;
    private boolean hasComputers;
    private boolean hasProjector;
    private boolean hasElectronicEquipment;
    private boolean hasRobotics;

}
