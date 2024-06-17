package com.VenueVista.VenueVista.config;

import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ApplicationConfigTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private ApplicationConfig applicationConfig;

    @Test
    public void testUserDetailsService() {
        UserDetailsService userDetailsService = applicationConfig.userDetailsService();
        assertThat(userDetailsService).isNotNull();
    }

    @Test
    public void testAuthenticationProvider() {
        AuthenticationProvider authenticationProvider = applicationConfig.authenticationProvider();
        assertThat(authenticationProvider).isNotNull();
    }

    @Test
    public void testAuthenticationManager() throws Exception {
        AuthenticationManager authenticationManager = applicationConfig.authenticationManager(null);
        assertThat(authenticationManager).isNotNull();
    }

    @Test
    public void testPasswordEncoder() {
        PasswordEncoder passwordEncoder = applicationConfig.passwordEncoder();
        assertThat(passwordEncoder).isNotNull();
        assertThat(passwordEncoder.encode("password")).isNotNull();
    }

    @Test
    public void testRegisterRequest() {
        RegisterRequest registerRequest = applicationConfig.registerRequest();
        assertThat(registerRequest).isNotNull();
    }
}
