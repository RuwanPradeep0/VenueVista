package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.dto.ChangePasswordRequest;

import java.security.Principal;

public interface UserService {
    void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
