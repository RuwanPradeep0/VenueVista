package com.VenueVista.VenueVista.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class spaceDTO {
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
