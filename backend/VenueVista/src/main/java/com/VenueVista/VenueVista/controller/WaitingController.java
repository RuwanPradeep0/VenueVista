package com.VenueVista.VenueVista.controller;


import com.VenueVista.VenueVista.controller.RequestResponse_DTO.UserWaitingResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingListResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingResponse;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.service.WaitingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
@CrossOrigin("*")
public class WaitingController {
    private final WaitingService waitingService;

    @PostMapping("/createrwaitings")
    public ResponseEntity<WaitingResponse> createWaiting(@RequestBody WaitingRequest waitingRequest) throws InvalidDataException {

            WaitingResponse waitingResponse = waitingService.handleWaiting(waitingRequest);
            return ResponseEntity.ok(waitingResponse);
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserWaitingResponse>> getUserWaitings(@RequestParam String email){

        List<UserWaitingResponse> userWaitingResponses = waitingService.getUserWaitings(email);

        return ResponseEntity.ok(userWaitingResponses);
    }

    @DeleteMapping("/deleteuserwaitings")
    public ResponseEntity<String> deleteUserWaiting(@RequestParam Integer waitingId){
        waitingService.deleteUserWaitng(waitingId);
        return ResponseEntity.ok("Waiting deleted successfully");
    }


    @GetMapping("/waitinglist")
    public ResponseEntity<List<WaitingListResponse>> getWaitingList(
            @RequestParam Integer spaceID,
            @RequestParam String date,
            @RequestParam Integer startTime,
            @RequestParam Integer endTime) {
        List<WaitingListResponse> waitingList = waitingService.getWaitingList(spaceID, date, startTime, endTime);
        return ResponseEntity.ok(waitingList);
    }




}