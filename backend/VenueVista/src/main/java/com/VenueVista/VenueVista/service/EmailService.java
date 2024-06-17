
package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
import com.VenueVista.VenueVista.models.Reservation;
import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.repository.ReservationRepository;
import com.VenueVista.VenueVista.repository.SpaceRepository;
import com.VenueVista.VenueVista.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;


    public void sendWelcomeEmail(RegisterRequest registerRequest) {
        String toEmail = registerRequest.getEmail();
        if (toEmail == null || toEmail.isEmpty()) {
            throw new IllegalArgumentException("Recipient email address is required");
        }
        String subject = "Welcome to VenueVista!";
        String body = "Dear " + registerRequest.getFirstName() + ",\n\n"
                + "Thank you for registering with VenueVista. We're excited to have you on board!\n\n"
                + "Best regards,\n"
                + "VenueVista Team";

        sendEmail(toEmail, subject, body);
    }


    public void sendLoginNotification(AuthenticationRequest authRequest) {
        String toEmail = authRequest.getEmail();
        if (toEmail == null || toEmail.isEmpty()) {
            throw new IllegalArgumentException("Recipient email address is required");
        }
        String subject = "Login Notification";
        String body = """
                Dear user,

                This is a notification that your account has been logged into VenueVista.

                If this wasn't you, please contact our support team immediately.

                Best regards,
                VenueVista Team""";

        sendEmail(toEmail, subject, body);
    }


//    public void sendReservationConfirmation(ReservationRequest reservationRequest) {
//        String toEmail = userRepository.findById(reservationRequest.getReservedByID())
//                .orElseThrow(() -> new IllegalArgumentException("User not found"))
//                .getEmail();
//        if (toEmail == null || toEmail.isEmpty()) {
//            throw new IllegalArgumentException("Recipient email address is required");
//        }
//        String subject = "Reservation Confirmation";
//        String body = "Dear " + userRepository.findById(reservationRequest.getReservedByID())
//                .orElseThrow(() -> new IllegalArgumentException("User not found"))
//                .getFirstName() + ",\n\n"
//                + "This is to confirm your reservation at VenueVista for the following details:\n\n"
//                + "Space: " + spaceRepository.findById(reservationRequest.getSpaceID())
//                .orElseThrow(() -> new IllegalArgumentException("Space not found")).getName() + "\n"
//                + "Date: " + reservationRequest.getDate() + "\n"
//                + "Time: " + reservationRequest.getStartTime() + "\n\n"
//                + "We look forward to hosting you!\n\n"
//                + "Best regards,\n"
//                + "VenueVista Team";
//
//        sendEmail(toEmail, subject, body);
//    }


//    public void sendSpaceCreationNotification(SpaceRequest spaceRequest) {
//        String toEmail = "2020e017@eng.jfn.ac.lk"; // Admin email
//        String subject = "New Space Created";
//        String body = "Hello Admin,\n\n"
//                + "A new space has been created in VenueVista with the following details:\n\n"
//                + "Space Name: " + spaceRequest.getName() + "\n"
//                + "Description: " + spaceRequest.getDescription() + "\n"
//                + "Capacity: " + spaceRequest.getCapacity() + "\n\n"
//                + "Please review and take necessary actions.\n\n"
//                + "Best regards,\n"
//                + "VenueVista Team";
//
//        sendEmail(toEmail, subject, body);
//    }


//    public void sendWaitingListNotification(Waiting waiting) {
//        // Get the email of the person who booked the slot earlier
//        String toEmail = userRepository.findById(waiting.getWaitingBy().getId())
//                .orElseThrow(() -> new IllegalArgumentException("User not found"))
//                .getEmail();
//
//        if (toEmail == null || toEmail.isEmpty()) {
//            throw new IllegalArgumentException("Recipient email address is required");
//        }
//
//        String subject = "Waiting List Notification";
//        String body = "Dear " + waiting.getWaitingBy().getFullName() + ",\n\n"
//                + "This is to inform you that you have been added to the waiting list for the following slot at VenueVista:\n\n"
//                + "Space: " + waiting.getSpace().getName() + "\n"
//                + "Date: " + waiting.getWaitingForDate().toLocalDate().toString() + "\n"
//                + "Time: " + waiting.getStartTime().toLocalTime().toString() + " - " + waiting.getEndTime().toLocalTime().toString() + "\n\n"
//                + "We will notify you if the slot becomes available.\n\n"
//                + "Best regards,\n"
//                + "VenueVista Team";
//
//        sendEmail(toEmail, subject, body);
//    }


    public void sendWaitingNotificationsWhoReserved(Waiting waiting) {
        // Get the reservation of the existing user for the same space and time
        Reservation existingReservation = reservationRepository.findBySpaceAndStartTimeAndEndTime(
                waiting.getSpace(),
                waiting.getStartTime(),
                waiting.getEndTime()
        ).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        String toEmail = existingReservation.getReservedById().getEmail();

        if (toEmail == null || toEmail.isEmpty()) {
            throw new IllegalArgumentException("Recipient email address is required");
        }

        String subject = "New Waiting List Notification";
        String body = "Dear " + existingReservation.getReservedById().getFullName() + ",\n\n"
                + "We want to inform you that a new user has been added to the waiting list for the slot you reserved at VenueVista:\n\n"
                + "Space: " + waiting.getSpace().getName() + "\n"
                + "Date: " + waiting.getWaitingForDate().toLocalDate().toString() + "\n"
                + "Time: " + waiting.getStartTime().toLocalTime().toString() + " - " + waiting.getEndTime().toLocalTime().toString() + "\n\n"
                + "Best regards,\n"
                + "VenueVista Team";

        sendEmail(toEmail, subject, body);
    }

    @Async
    private void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
