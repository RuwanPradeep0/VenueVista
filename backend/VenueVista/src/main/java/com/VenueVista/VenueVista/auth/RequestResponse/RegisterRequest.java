package com.VenueVista.VenueVista.auth.RequestResponse;

import com.VenueVista.VenueVista.models.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    public  String firstName;
    public  String lastName;
    public  String email;
    public  String password;
    private String userRole;
}
