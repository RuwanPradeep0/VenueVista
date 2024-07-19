package com.VenueVista.VenueVista.models.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    MA_LOGIN("MA:login"),
    MA_CREATE("MA:create"),
    MA_UPDATE("MA:update"),
    MA_DELETE("MA:delete"),

    LECTURER_LOGIN("LECTURER:login"),
    LECTURER_CREATE("LECTURER:create"),
    LECTURER_UPDATE("LECTURER:update"),
    LECTURER_DELETE("LECTURER:delete"),

    INSTRUCTOR_LOGIN("INSTRUCTOR:login"),
    INSTRUCTOR_CREATE("INSTRUCTOR:create"),
    INSTRUCTOR_UPDATE("INSTRUCTOR:update"),
    INSTRUCTOR_DELETE("INSTRUCTOR:delete"),

    ;

    private final String permission;

}
