package com.VenueVista.VenueVista.auth;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationResponse;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.models.user.Role;
import com.VenueVista.VenueVista.models.user.User;
import com.VenueVista.VenueVista.repository.UserRepository;
import com.VenueVista.VenueVista.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AuthenticationServiceTest {

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john.doe@example.com", "password", "LECTURER");

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .role(Role.LECTURER)
                .password("encodedPassword")
                .build();


        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refreshToken");

        AuthenticationResponse response = authenticationService.register(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("refreshToken", response.getRefreshToken());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testAuthenticate() {
        AuthenticationRequest request = new AuthenticationRequest("john.doe@example.com", "password");

        User user = User.builder()
                .email(request.getEmail())
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refreshToken");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("refreshToken", response.getRefreshToken());
    }

    @Test
    public void testRefreshToken() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);

        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer refreshToken");
        when(jwtService.extractUsername(anyString())).thenReturn("john.doe@example.com");

        User user = User.builder()
                .email("john.doe@example.com")
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.isTokenValid(anyString(), any(UserDetails.class))).thenReturn(true);
        when(jwtService.generateToken(any(User.class))).thenReturn("newAccessToken");

        PrintWriter writer = mock(PrintWriter.class);
        when(response.getWriter()).thenReturn(writer);

        authenticationService.refreshToken(request, response);

        verify(response, times(1)).setContentType("application/json");
        verify(writer, times(1)).write(anyString());
    }
}
