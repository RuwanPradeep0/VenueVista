package com.VenueVista.VenueVista.repository;

import com.VenueVista.VenueVista.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<Object> getUserById(Integer responsiblePerson);

    boolean existsByEmail(String mail);

}
