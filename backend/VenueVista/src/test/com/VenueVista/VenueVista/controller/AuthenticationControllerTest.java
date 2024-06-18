package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationResponse;
import com.VenueVista.VenueVista.auth.AuthenticationService;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class AuthenticationControllerTest {

    @Mock
    private AuthenticationService service;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthenticationController controller;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void testRegister() throws Exception {
        RegisterRequest request = new RegisterRequest();
        // Set fields of the request object as needed

        AuthenticationResponse response = new AuthenticationResponse();
        response.setAccessToken("mockAccessToken");
        response.setRefreshToken("mockRefreshToken");

        when(service.register(any(RegisterRequest.class))).thenReturn(response);
        doNothing().when(emailService).sendWelcomeEmail(any(RegisterRequest.class));

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@example.com\",\"password\":\"password\"}")) // Adjust JSON content as per RegisterRequest fields
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mockAccessToken"))
                .andExpect(jsonPath("$.refreshToken").value("mockRefreshToken"));
    }

    @Test
    void testAuthenticate() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        // Set fields of the request object as needed

        AuthenticationResponse response = new AuthenticationResponse();
        response.setAccessToken("mockAccessToken");
        response.setRefreshToken("mockRefreshToken");

        when(service.authenticate(any(AuthenticationRequest.class))).thenReturn(response);
        doNothing().when(emailService).sendLoginNotification(any(AuthenticationRequest.class));

        mockMvc.perform(post("/api/v1/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@example.com\",\"password\":\"password\"}")) // Adjust JSON content as per AuthenticationRequest fields
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mockAccessToken"))
                .andExpect(jsonPath("$.refreshToken").value("mockRefreshToken"));
    }

    @Test
    void testRefreshToken() throws Exception {
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        HttpServletResponse mockResponse = mock(HttpServletResponse.class);

        doNothing().when(service).refreshToken(any(HttpServletRequest.class), any(HttpServletResponse.class));

        mockMvc.perform(post("/api/v1/auth/refresh-token"))
                .andExpect(status().isOk());
    }

    @Test
    void testRefreshTokenUnauthorized() throws Exception {
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        HttpServletResponse mockResponse = mock(HttpServletResponse.class);

        doThrow(new RuntimeException("Invalid token")).when(service).refreshToken(any(HttpServletRequest.class), any(HttpServletResponse.class));

        mockMvc.perform(post("/api/v1/auth/refresh-token"))
                .andExpect(status().isUnauthorized());
    }
}
