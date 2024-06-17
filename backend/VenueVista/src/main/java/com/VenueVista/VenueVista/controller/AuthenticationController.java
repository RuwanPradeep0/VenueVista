package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationResponse;
import com.VenueVista.VenueVista.auth.AuthenticationService;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*") // Consider removing or configuring this more restrictively in production
public class AuthenticationController {


    private final AuthenticationService service;

    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        ResponseEntity<AuthenticationResponse> response = ResponseEntity.ok(service.register(request));
        emailService.sendWelcomeEmail(request);

        return response;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        ResponseEntity<AuthenticationResponse> response = ResponseEntity.ok(service.authenticate(request));
        emailService.sendLoginNotification(request);
        return response;
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            service.refreshToken(request, response);
        } catch (Exception ex) {
            // Handle exceptions during token refresh
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Failed to refresh token: " + ex.getMessage());
        }



    }
}