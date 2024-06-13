package com.VenueVista.VenueVista;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@SpringBootApplication
@EnableScheduling
public class VenueVistaApplication {

	public static void main(String[] args) {
		SpringApplication.run(VenueVistaApplication.class, args);
	}

}
