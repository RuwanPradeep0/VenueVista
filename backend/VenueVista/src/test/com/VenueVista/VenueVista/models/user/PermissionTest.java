package com.VenueVista.VenueVista.models.user;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PermissionTest {

    @Test
    public void testPermissionValues() {
        assertEquals("MA:login", Permission.MA_LOGIN.getPermission());
        assertEquals("MA:create", Permission.MA_CREATE.getPermission());
        assertEquals("MA:update", Permission.MA_UPDATE.getPermission());
        assertEquals("MA:delete", Permission.MA_DELETE.getPermission());

        assertEquals("LECTURER:login", Permission.LECTURER_LOGIN.getPermission());
        assertEquals("LECTURER:create", Permission.LECTURER_CREATE.getPermission());
        assertEquals("LECTURER:update", Permission.LECTURER_UPDATE.getPermission());
        assertEquals("LECTURER:delete", Permission.LECTURER_DELETE.getPermission());

        assertEquals("INSTRUCTOR:login", Permission.INSTRUCTOR_LOGIN.getPermission());
        assertEquals("INSTRUCTOR:create", Permission.INSTRUCTOR_CREATE.getPermission());
        assertEquals("INSTRUCTOR:update", Permission.INSTRUCTOR_UPDATE.getPermission());
        assertEquals("INSTRUCTOR:delete", Permission.INSTRUCTOR_DELETE.getPermission());
    }

    @Test
    public void testEnumValues() {
        Permission[] permissions = Permission.values();
        assertEquals(12, permissions.length);

        assertEquals(Permission.MA_LOGIN, permissions[0]);
        assertEquals(Permission.MA_CREATE, permissions[1]);
        assertEquals(Permission.MA_UPDATE, permissions[2]);
        assertEquals(Permission.MA_DELETE, permissions[3]);

        assertEquals(Permission.LECTURER_LOGIN, permissions[4]);
        assertEquals(Permission.LECTURER_CREATE, permissions[5]);
        assertEquals(Permission.LECTURER_UPDATE, permissions[6]);
        assertEquals(Permission.LECTURER_DELETE, permissions[7]);

        assertEquals(Permission.INSTRUCTOR_LOGIN, permissions[8]);
        assertEquals(Permission.INSTRUCTOR_CREATE, permissions[9]);
        assertEquals(Permission.INSTRUCTOR_UPDATE, permissions[10]);
        assertEquals(Permission.INSTRUCTOR_DELETE, permissions[11]);
    }

    @Test
    public void testEnumValueOf() {
        assertEquals(Permission.MA_LOGIN, Permission.valueOf("MA_LOGIN"));
        assertEquals(Permission.MA_CREATE, Permission.valueOf("MA_CREATE"));
        assertEquals(Permission.MA_UPDATE, Permission.valueOf("MA_UPDATE"));
        assertEquals(Permission.MA_DELETE, Permission.valueOf("MA_DELETE"));

        assertEquals(Permission.LECTURER_LOGIN, Permission.valueOf("LECTURER_LOGIN"));
        assertEquals(Permission.LECTURER_CREATE, Permission.valueOf("LECTURER_CREATE"));
        assertEquals(Permission.LECTURER_UPDATE, Permission.valueOf("LECTURER_UPDATE"));
        assertEquals(Permission.LECTURER_DELETE, Permission.valueOf("LECTURER_DELETE"));

        assertEquals(Permission.INSTRUCTOR_LOGIN, Permission.valueOf("INSTRUCTOR_LOGIN"));
        assertEquals(Permission.INSTRUCTOR_CREATE, Permission.valueOf("INSTRUCTOR_CREATE"));
        assertEquals(Permission.INSTRUCTOR_UPDATE, Permission.valueOf("INSTRUCTOR_UPDATE"));
        assertEquals(Permission.INSTRUCTOR_DELETE, Permission.valueOf("INSTRUCTOR_DELETE"));
    }
}
