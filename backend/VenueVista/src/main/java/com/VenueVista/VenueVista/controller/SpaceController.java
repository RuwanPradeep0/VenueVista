package com.VenueVista.VenueVista.controller;

import ch.qos.logback.classic.Logger;
import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.SpaceResponse;
import com.VenueVista.VenueVista.models.Space;
//import com.VenueVista.VenueVista.service.EmailService;
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
//    private final EmailService emailService;

    @PostMapping("/createspaces")
    public ResponseEntity<SpaceResponse> createSpace(@RequestBody SpaceRequest spaceRequest){
        Space savedSpace = spaceService.saveSpace(spaceRequest);

        SpaceResponse spaceResponse = new SpaceResponse(savedSpace);
//        emailService.sendSpaceCreationNotification(spaceRequest);
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
/*
//using @PathVariable for updatespace...
    @PutMapping("/updatespace/{id}")
    public ResponseEntity<SpaceResponse> updateSpace(@PathVariable Integer id, @RequestBody SpaceRequest spaceRequest) {
        Space updatedSpace = spaceService.updateSpace(id, spaceRequest);
        SpaceResponse spaceResponse = new SpaceResponse(updatedSpace);
        return ResponseEntity.ok(spaceResponse);
    }
 */

    /**
     * Endpoint to update an existing space.
     *
     * @param id the ID of the space to be updated
     * @param spaceRequest the space request object containing updated space details
     * @return the response entity containing the updated space response
     */
    @PutMapping("/updatespace")
    public ResponseEntity<SpaceResponse> updateSpace(@RequestParam Integer id, @RequestBody SpaceRequest spaceRequest) {
        Space updatedSpace = spaceService.updateSpace(id, spaceRequest);
        SpaceResponse spaceResponse = new SpaceResponse(updatedSpace);
        return ResponseEntity.ok(spaceResponse);
    }

  /*
  //using @PathVariable for deletespace...
    @DeleteMapping("/deletespace/{id}")
    public ResponseEntity<Void> deleteSpace(@PathVariable Integer id) {
        spaceService.deleteSpace(id);
        return ResponseEntity.noContent().build();
    }
*/
    /**
     * Endpoint to delete an existing space.
     *
     * @param id the ID of the space to be deleted
     * @return a response entity with no content status
     */
    @DeleteMapping("/deletespace")
    public ResponseEntity<Void> deleteSpace(@RequestParam Integer id) {
        spaceService.deleteSpace(id);
        return ResponseEntity.noContent().build();
    }

}
