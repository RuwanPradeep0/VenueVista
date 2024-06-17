package com.VenueVista.VenueVista.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/public/**").permitAll() // Permit access to public resources
                .anyRequest().authenticated() // All other endpoints require authentication
                .and()
                .formLogin()
                .loginPage("/login") // Specify your custom login page URL
                .defaultSuccessUrl("/dashboard") // Redirect to this URL after successful login
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout") // Specify the URL for logout
                .logoutSuccessUrl("/login?logout") // Redirect to login page after logout
                .invalidateHttpSession(true) // Invalidate session
                .deleteCookies("JSESSIONID"); // Delete cookies
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Configure your authentication mechanism (e.g., using in-memory users, JDBC authentication, etc.)
        auth
                .inMemoryAuthentication()
                .withUser("user").password(passwordEncoder().encode("password")).roles("USER");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCryptPasswordEncoder for password encoding
    }
}
