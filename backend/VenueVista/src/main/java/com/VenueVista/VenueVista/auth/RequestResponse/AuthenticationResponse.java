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
public class AuthenticationResponse {

    public String token;
//    public String responsibleName;
//    public  String email;
//    public Role userRole;
}
