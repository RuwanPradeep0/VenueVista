package com.VenueVista.VenueVista.models.user;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class RoleTest {

    @Test
    public void testGetAuthoritiesForMA() {
        Role maRole = Role.MA;
        List<SimpleGrantedAuthority> authorities = maRole.getAuthorities();

        // Verify the size of authorities
        assertEquals(maRole.getPermissions().size() + 1, authorities.size());

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
    public void testGetAuthoritiesForLecturer() {
        Role lecturerRole = Role.LECTURER;
        List<SimpleGrantedAuthority> authorities = lecturerRole.getAuthorities();

        // Verify the size of authorities
        assertEquals(lecturerRole.getPermissions().size() + 1, authorities.size());

        // Verify permissions are converted to authorities
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_LECTURER")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_LOGIN")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_CREATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_UPDATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("LECTURER_DELETE")));
    }

    @Test
    public void testGetAuthoritiesForInstructor() {
        Role instructorRole = Role.INSTRUCTOR;
        List<SimpleGrantedAuthority> authorities = instructorRole.getAuthorities();

        // Verify the size of authorities
        assertEquals(instructorRole.getPermissions().size() + 1, authorities.size());

        // Verify permissions are converted to authorities
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_INSTRUCTOR")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_LOGIN")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_CREATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_UPDATE")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("INSTRUCTOR_DELETE")));
    }

    @Test
    public void testFromString() {
        assertEquals(Role.MA, Role.fromString("ma"));
        assertEquals(Role.LECTURER, Role.fromString("lecturer"));
        assertEquals(Role.INSTRUCTOR, Role.fromString("instructor"));

        // Test invalid role
        assertThrows(IllegalArgumentException.class, () -> Role.fromString("invalid"));
    }

    @Test
    public void testRolePermissions() {
        Set<Permission> maPermissions = Set.of(
                Permission.MA_CREATE,
                Permission.MA_UPDATE,
                Permission.MA_DELETE,
                Permission.LECTURER_CREATE,
                Permission.LECTURER_UPDATE,
                Permission.LECTURER_DELETE,
                Permission.INSTRUCTOR_CREATE,
                Permission.INSTRUCTOR_UPDATE,
                Permission.INSTRUCTOR_DELETE
        );
        assertEquals(maPermissions, Role.MA.getPermissions());

        Set<Permission> lecturerPermissions = Set.of(
                Permission.LECTURER_LOGIN,
                Permission.LECTURER_CREATE,
                Permission.LECTURER_UPDATE,
                Permission.LECTURER_DELETE
        );
        assertEquals(lecturerPermissions, Role.LECTURER.getPermissions());

        Set<Permission> instructorPermissions = Set.of(
                Permission.INSTRUCTOR_LOGIN,
                Permission.INSTRUCTOR_CREATE,
                Permission.INSTRUCTOR_UPDATE,
                Permission.INSTRUCTOR_DELETE
        );
        assertEquals(instructorPermissions, Role.INSTRUCTOR.getPermissions());
    }
}
