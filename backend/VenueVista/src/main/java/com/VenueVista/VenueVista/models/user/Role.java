package com.VenueVista.VenueVista.models.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Role {

    MA(
            Set.of(
                    Permission.MA_CREATE,
                    Permission.MA_UPDATE,
                    Permission.MA_DELETE,
                    Permission.LECTURER_CREATE,
                    Permission.LECTURER_UPDATE,
                    Permission.LECTURER_DELETE,
                    Permission.INSTRUCTOR_CREATE,
                    Permission.INSTRUCTOR_UPDATE,
                    Permission.INSTRUCTOR_DELETE

            )
    ),
    LECTURER(
            Set.of(
                    Permission.LECTURER_LOGIN,
                    Permission.LECTURER_CREATE,
                    Permission.LECTURER_UPDATE,
                    Permission.LECTURER_DELETE
            )
    ),
    INSTRUCTOR(
            Set.of(
                    Permission.INSTRUCTOR_LOGIN,
                    Permission.INSTRUCTOR_CREATE,
                    Permission.INSTRUCTOR_UPDATE,
                    Permission.INSTRUCTOR_DELETE
            )
    ),
    ;

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.name()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
    public static Role fromString(String roleStr) {
        return Role.valueOf(roleStr.toUpperCase());
    }
}
