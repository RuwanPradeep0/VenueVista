package com.VenueVista.VenueVista.models.user;

import com.VenueVista.VenueVista.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Check if the admin user already exists
        if (!userRepository.existsByEmail("admin@example.com")) {
            // Create the admin user
            User adminUser = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("adminPassword"))
                    .role(Role.MA)
                    .build();

            // Save the admin user to the database
            userRepository.save(adminUser);
        }
    }

    }

