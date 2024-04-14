package com.VenueVista.VenueVista.controller;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {
        @GetMapping
        public ResponseEntity<String> getExample() {


            return ResponseEntity.ok("Helooo");

        }

}
