package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.SpaceResponse;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/spaces")
@RequiredArgsConstructor
public class SpaceController {

    private final SpaceService spaceService;

    @PostMapping("/createspaces")
    public ResponseEntity<SpaceResponse> createSpace(@RequestBody SpaceRequest spaceRequest){
        Space savedSpace = spaceService.saveSpace(spaceRequest);
        SpaceResponse spaceResponse = new SpaceResponse(savedSpace);
        return ResponseEntity.status(HttpStatus.CREATED).body(spaceResponse);
    }

}
