package com.VenueVista.VenueVista.repository;

import java.util.List;
import java.util.Optional;

import com.VenueVista.VenueVista.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = "SELECT t.* FROM Token t INNER JOIN User u ON t.user_id = u.id WHERE u.id = :id AND (t.expired = false OR t.revoked = false);",nativeQuery = true)
    List<Token> findAllValidTokenByUser(Integer id);

    Optional<Token> findByToken(String token);
}
