package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationResponse;
import com.VenueVista.VenueVista.auth.AuthenticationService;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.models.user.Permission;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){

        return ResponseEntity.ok(service.authenticate(request));

    }
}
