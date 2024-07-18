package com.VenueVista.VenueVista.models.user;

import com.VenueVista.VenueVista.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.ApplicationArguments;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AdminUserInitializerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminUserInitializer adminUserInitializer;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRun_WhenAdminUserDoesNotExist() throws Exception {
        // Arrange
        when(userRepository.existsByEmail("admin@example.com")).thenReturn(false);
        when(passwordEncoder.encode("adminPassword")).thenReturn("encodedPassword");

        ApplicationArguments args = mock(ApplicationArguments.class);

        // Act
        adminUserInitializer.run(args);

        // Assert
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();

        assertEquals("Admin", savedUser.getFirstName());
        assertEquals("User", savedUser.getLastName());
        assertEquals("admin@example.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals(Role.MA, savedUser.getRole());

        verify(userRepository, times(1)).existsByEmail("admin@example.com");
        verify(userRepository, times(1)).save(any(User.class));
        verify(passwordEncoder, times(1)).encode("adminPassword");
    }

    @Test
    public void testRun_WhenAdminUserExists() throws Exception {
        // Arrange
        when(userRepository.existsByEmail("admin@example.com")).thenReturn(true);

        ApplicationArguments args = mock(ApplicationArguments.class);

        // Act
        adminUserInitializer.run(args);

        // Assert
        verify(userRepository, times(1)).existsByEmail("admin@example.com");
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }
}
