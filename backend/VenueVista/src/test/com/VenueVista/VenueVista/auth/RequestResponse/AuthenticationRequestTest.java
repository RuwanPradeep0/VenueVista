package com.VenueVista.VenueVista.auth.RequestResponse;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class AuthenticationRequestTest {

    @Test
    public void testNoArgsConstructor() {
        AuthenticationRequest authRequest = new AuthenticationRequest();
        assertThat(authRequest.getEmail()).isNull();
        assertThat(authRequest.getPassword()).isNull();
    }

    @Test
    public void testAllArgsConstructor() {
        AuthenticationRequest authRequest = new AuthenticationRequest("user@example.com", "password123");
        assertThat(authRequest.getEmail()).isEqualTo("user@example.com");
        assertThat(authRequest.getPassword()).isEqualTo("password123");
    }

    @Test
    public void testBuilder() {
        AuthenticationRequest authRequest = AuthenticationRequest.builder()
                .email("user@example.com")
                .password("password123")
                .build();
        assertThat(authRequest.getEmail()).isEqualTo("user@example.com");
        assertThat(authRequest.getPassword()).isEqualTo("password123");
    }

    @Test
    public void testSettersAndGetters() {
        AuthenticationRequest authRequest = new AuthenticationRequest();
        authRequest.setEmail("user@example.com");
        authRequest.setPassword("password123");
        assertThat(authRequest.getEmail()).isEqualTo("user@example.com");
        assertThat(authRequest.getPassword()).isEqualTo("password123");
    }

    @Test
    public void testToString() {
        AuthenticationRequest authRequest = new AuthenticationRequest("user@example.com", "password123");
        String expectedString = "AuthenticationRequest(email=user@example.com, password=password123)";
        assertThat(authRequest.toString()).isEqualTo(expectedString);
    }

    @Test
    public void testEqualsAndHashCode() {
        AuthenticationRequest authRequest1 = new AuthenticationRequest("user@example.com", "password123");
        AuthenticationRequest authRequest2 = new AuthenticationRequest("user@example.com", "password123");
        assertThat(authRequest1).isEqualTo(authRequest2);
        assertThat(authRequest1.hashCode()).isEqualTo(authRequest2.hashCode());
    }
}