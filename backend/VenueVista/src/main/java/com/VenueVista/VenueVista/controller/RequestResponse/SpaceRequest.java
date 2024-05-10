package com.VenueVista.VenueVista.controller.RequestResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import  java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpaceRequest {
    private String name;
    private String location;
    private int capacity;
    private String description;
//    private MultipartFile image;
    private List<String> facilities;
}
