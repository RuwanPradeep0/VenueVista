package com.VenueVista.VenueVista.auth.RequestResponse;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RegisterRequestTest {

    @Test
    public void testNoArgsConstructor() {
        RegisterRequest registerRequest = new RegisterRequest();
        assertThat(registerRequest.getFirstName()).isNull();
        assertThat(registerRequest.getLastName()).isNull();
        assertThat(registerRequest.getEmail()).isNull();
        assertThat(registerRequest.getPassword()).isNull();
        assertThat(registerRequest.getUserRole()).isNull();
    }

    @Test
    public void testAllArgsConstructor() {
        RegisterRequest registerRequest = new RegisterRequest("John", "Doe", "john.doe@example.com", "password123", "USER");
        assertThat(registerRequest.getFirstName()).isEqualTo("John");
        assertThat(registerRequest.getLastName()).isEqualTo("Doe");
        assertThat(registerRequest.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(registerRequest.getPassword()).isEqualTo("password123");
        assertThat(registerRequest.getUserRole()).isEqualTo("USER");
    }

    @Test
    public void testBuilder() {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .userRole("USER")
                .build();
        assertThat(registerRequest.getFirstName()).isEqualTo("John");
        assertThat(registerRequest.getLastName()).isEqualTo("Doe");
        assertThat(registerRequest.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(registerRequest.getPassword()).isEqualTo("password123");
        assertThat(registerRequest.getUserRole()).isEqualTo("USER");
    }

    @Test
    public void testSettersAndGetters() {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setFirstName("John");
        registerRequest.setLastName("Doe");
        registerRequest.setEmail("john.doe@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setUserRole("USER");

        assertThat(registerRequest.getFirstName()).isEqualTo("John");
        assertThat(registerRequest.getLastName()).isEqualTo("Doe");
        assertThat(registerRequest.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(registerRequest.getPassword()).isEqualTo("password123");
        assertThat(registerRequest.getUserRole()).isEqualTo("USER");
    }

    @Test
    public void testToString() {
        RegisterRequest registerRequest = new RegisterRequest("John", "Doe", "john.doe@example.com", "password123", "USER");
        String expectedString = "RegisterRequest(firstName=John, lastName=Doe, email=john.doe@example.com, password=password123, userRole=USER)";
        assertThat(registerRequest.toString()).isEqualTo(expectedString);
    }

    @Test
    public void testEqualsAndHashCode() {
        RegisterRequest registerRequest1 = new RegisterRequest("John", "Doe", "john.doe@example.com", "password123", "USER");
        RegisterRequest registerRequest2 = new RegisterRequest("John", "Doe", "john.doe@example.com", "password123", "USER");
        assertThat(registerRequest1).isEqualTo(registerRequest2);
        assertThat(registerRequest1.hashCode()).isEqualTo(registerRequest2.hashCode());
    }
}
