package com.VenueVista.VenueVista.models.user;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testGetAuthorities() {
        Role role = Role.MA;
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(role)
                .build();

        Collection<? extends SimpleGrantedAuthority> authorities = (Collection<? extends SimpleGrantedAuthority>) user.getAuthorities();

        // Verify the size of authorities
        assertEquals(role.getAuthorities().size(), authorities.size());

        // Verify permissions are converted to authorities
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_MA")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("MA_CREATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("MA_UPDATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("MA_DELETE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_CREATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_UPDATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_DELETE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_CREATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_UPDATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_DELETE")));
    }

    @Test
    public void testGetUsername() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertEquals("test@example.com", user.getUsername());
    }

    @Test
    public void testAccountNonExpired() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertTrue(user.isAccountNonExpired());
    }

    @Test
    public void testAccountNonLocked() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertTrue(user.isAccountNonLocked());
    }

    @Test
    public void testCredentialsNonExpired() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertTrue(user.isCredentialsNonExpired());
    }

    @Test
    public void testIsEnabled() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertTrue(user.isEnabled());
    }

    @Test
    public void testGetFullName() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .role(Role.MA)
                .build();

        assertEquals("Test User", user.getFullName());
    }
}
