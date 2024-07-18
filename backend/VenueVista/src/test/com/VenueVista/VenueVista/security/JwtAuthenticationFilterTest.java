package com.VenueVista.VenueVista.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserDetailsService userDetailsService;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.clearContext();
    }

    @Test
    public void testDoFilterInternal_ValidToken() throws ServletException, IOException {
        String token = "Bearer valid_token";
        String username = "user@example.com";
        UserDetails userDetails = mock(UserDetails.class);

        when(request.getHeader("Authorization")).thenReturn(token);
        when(jwtService.extractUsername(any(String.class))).thenReturn(username);
        when(userDetailsService.loadUserByUsername(eq(username))).thenReturn(userDetails);
        when(jwtService.isTokenValid(eq("valid_token"), eq(userDetails))).thenReturn(true);
        when(userDetails.getAuthorities()).thenReturn(mock(Collection.class));

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(request).getHeader("Authorization");
        verify(jwtService).extractUsername(any(String.class));
        verify(userDetailsService).loadUserByUsername(eq(username));
        verify(jwtService).isTokenValid(eq("valid_token"), eq(userDetails));
        verify(filterChain).doFilter(request, response);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals(username, ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
    }

    @Test
    public void testDoFilterInternal_InvalidToken() throws ServletException, IOException {
        String token = "Bearer invalid_token";

        when(request.getHeader("Authorization")).thenReturn(token);
        when(jwtService.extractUsername(any(String.class))).thenReturn(null);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(request).getHeader("Authorization");
        verify(jwtService).extractUsername(any(String.class));
        verify(filterChain).doFilter(request, response);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    public void testDoFilterInternal_NoToken() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn(null);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(request).getHeader("Authorization");
        verify(filterChain).doFilter(request, response);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    public void testDoFilterInternal_TokenWithoutBearerPrefix() throws ServletException, IOException {
        String token = "invalid_token";

        when(request.getHeader("Authorization")).thenReturn(token);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(request).getHeader("Authorization");
        verify(filterChain).doFilter(request, response);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    public void testDoFilterInternal_UserEmailNotNullButAlreadyAuthenticated() throws ServletException, IOException {
        String token = "Bearer valid_token";
        String username = "user@example.com";
        UserDetails userDetails = mock(UserDetails.class);

        when(request.getHeader("Authorization")).thenReturn(token);
        when(jwtService.extractUsername(any(String.class))).thenReturn(username);
        when(userDetailsService.loadUserByUsername(eq(username))).thenReturn(userDetails);
        when(jwtService.isTokenValid(eq("valid_token"), eq(userDetails))).thenReturn(true);

        UsernamePasswordAuthenticationToken existingAuth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(existingAuth);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(request).getHeader("Authorization");
        verify(jwtService).extractUsername(any(String.class));
        verify(filterChain).doFilter(request, response);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals(existingAuth, SecurityContextHolder.getContext().getAuthentication());
    }
}
