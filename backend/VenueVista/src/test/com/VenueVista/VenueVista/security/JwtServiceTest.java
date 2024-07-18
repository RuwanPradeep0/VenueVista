package com.VenueVista.VenueVista.security;

import com.VenueVista.VenueVista.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        userDetails = loadUserByUsername("testuser"); // Replace with your own implementation or mock
    }

    @Test
    void testGenerateToken() {
        String token = jwtService.generateToken(userDetails);
        assertNotNull(token);
        assertTrue(token.split("\\.").length == 3); // JWT should have three parts
    }

    @Test
    void testGenerateRefreshToken() {
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        assertNotNull(refreshToken);
        assertTrue(refreshToken.split("\\.").length == 3); // Refresh token should have three parts
    }

    @Test
    void testExtractUsername() {
        String token = jwtService.generateToken(userDetails);
        String username = jwtService.extractUsername(token);
        assertEquals(userDetails.getUsername(), username);
    }

    @Test
    void testExtractClaim() {
        String token = jwtService.generateToken(userDetails);
        String responsibleName = jwtService.extractClaim(token, claims -> claims.get("responsibleName", String.class));
        assertEquals("John Doe", responsibleName); // Replace with expected responsible name
    }

    @Test
    void testIsTokenValid() {
        String token = jwtService.generateToken(userDetails);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    private UserDetails loadUserByUsername(String username) {
        // Mock implementation of UserDetailsService or load from your application context
        return new UserDetails() {
            @Override
            public String getUsername() {
                return username;
            }

            // Implement other UserDetails methods as needed for your test
            @Override
            public String getPassword() {
                return "password";
            }

            @Override
            public boolean isEnabled() {
                return true;
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }
        };
    }
}
