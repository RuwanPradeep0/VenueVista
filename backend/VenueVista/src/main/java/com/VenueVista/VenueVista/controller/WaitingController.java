package com.VenueVista.VenueVista.controller;


import com.VenueVista.VenueVista.controller.RequestResponse.WaitingRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.WaitingResponse;
import com.VenueVista.VenueVista.service.WaitingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
@CrossOrigin("*")
public class WaitingController {
    private final WaitingService waitingService;

    @PostMapping("/createrwaitings")
    public ResponseEntity<WaitingResponse> createWaiting(@RequestBody WaitingRequest waitingRequest) {

            WaitingResponse waitingResponse = waitingService.handleWaiting(waitingRequest);
            return ResponseEntity.ok(waitingResponse);


    }
}