package com.VenueVista.VenueVista.auth.RequestResponse;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class AuthenticationResponseTest {

    @Test
    public void testNoArgsConstructor() {
        AuthenticationResponse authResponse = new AuthenticationResponse();
        assertThat(authResponse.getAccessToken()).isNull();
        assertThat(authResponse.getRefreshToken()).isNull();
    }

    @Test
    public void testAllArgsConstructor() {
        AuthenticationResponse authResponse = new AuthenticationResponse("accessToken123", "refreshToken456");
        assertThat(authResponse.getAccessToken()).isEqualTo("accessToken123");
        assertThat(authResponse.getRefreshToken()).isEqualTo("refreshToken456");
    }

    @Test
    public void testBuilder() {
        AuthenticationResponse authResponse = AuthenticationResponse.builder()
                .accessToken("accessToken123")
                .refreshToken("refreshToken456")
                .build();
        assertThat(authResponse.getAccessToken()).isEqualTo("accessToken123");
        assertThat(authResponse.getRefreshToken()).isEqualTo("refreshToken456");
    }

    @Test
    public void testSettersAndGetters() {
        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setAccessToken("accessToken123");
        authResponse.setRefreshToken("refreshToken456");
        assertThat(authResponse.getAccessToken()).isEqualTo("accessToken123");
        assertThat(authResponse.getRefreshToken()).isEqualTo("refreshToken456");
    }

    @Test
    public void testToString() {
        AuthenticationResponse authResponse = new AuthenticationResponse("accessToken123", "refreshToken456");
        String expectedString = "AuthenticationResponse(accessToken=accessToken123, refreshToken=refreshToken456)";
        assertThat(authResponse.toString()).isEqualTo(expectedString);
    }

    @Test
    public void testEqualsAndHashCode() {
        AuthenticationResponse authResponse1 = new AuthenticationResponse("accessToken123", "refreshToken456");
        AuthenticationResponse authResponse2 = new AuthenticationResponse("accessToken123", "refreshToken456");
        assertThat(authResponse1).isEqualTo(authResponse2);
        assertThat(authResponse1.hashCode()).isEqualTo(authResponse2.hashCode());
    }
}
