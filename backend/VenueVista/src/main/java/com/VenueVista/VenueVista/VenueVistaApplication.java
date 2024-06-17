package com.VenueVista.VenueVista;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class VenueVistaApplication {

	public static void main(String[] args) {
		SpringApplication.run(VenueVistaApplication.class, args);
	}

}
