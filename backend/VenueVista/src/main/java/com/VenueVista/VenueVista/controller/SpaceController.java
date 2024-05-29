package com.VenueVista.VenueVista.controller;

import ch.qos.logback.classic.Logger;
import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.SpaceResponse;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.service.EmailService;
import com.VenueVista.VenueVista.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api/v1/spaces")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SpaceController {


    private final SpaceService spaceService;
    private final EmailService emailService;

    @PostMapping("/createspaces")
    public ResponseEntity<SpaceResponse> createSpace(@RequestBody SpaceRequest spaceRequest){
        Space savedSpace = spaceService.saveSpace(spaceRequest);

        SpaceResponse spaceResponse = new SpaceResponse(savedSpace);
        emailService.sendSpaceCreationNotification(spaceRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(spaceResponse);
    }

    @GetMapping("/getallspaces")
    public ResponseEntity<List<SpaceResponse>> getAllSpaces() {
        List<Space> spaces = spaceService.getAllSpaces();
        List<SpaceResponse> spaceResponses = spaces.stream()
                .map(SpaceResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(spaceResponses);
    }

}
