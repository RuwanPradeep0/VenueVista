package com.VenueVista.VenueVista.auth;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationResponse;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.models.user.Role;
import com.VenueVista.VenueVista.models.user.User;
import com.VenueVista.VenueVista.repository.UserRepository;
import com.VenueVista.VenueVista.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var userRole = Role.fromString(request.getUserRole());
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .role(userRole)
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();


    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user =userRepository.findByEmail(request.getEmail())
                .orElseThrow();


        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
//                .email(user.getEmail())
//                .userRole(user.getRole())
//                .responsibleName(user.getResponsibleName())
                .build();
    }

}
