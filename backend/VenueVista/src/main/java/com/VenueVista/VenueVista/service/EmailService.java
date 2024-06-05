//package com.VenueVista.VenueVista.service;
//
//import com.VenueVista.VenueVista.auth.RequestResponse.AuthenticationRequest;
//import com.VenueVista.VenueVista.auth.RequestResponse.RegisterRequest;
//import com.VenueVista.VenueVista.controller.RequestResponse.ReservationRequest;
//import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
//import com.VenueVista.VenueVista.repository.SpaceRepository;
//import com.VenueVista.VenueVista.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    @Autowired
//    private UserRepository userRepository;
//    private SpaceRepository spaceRepository;
//
//    @Autowired
//    public void sendWelcomeEmail(RegisterRequest registerRequest) {
//        String toEmail = registerRequest.getEmail();
//        String subject = "Welcome to VenueVista!";
//        String body = "Dear " + registerRequest.getFirstName() + ",\n\n"
//                + "Thank you for registering with VenueVista. We're excited to have you on board!\n\n"
//                + "Best regards,\n"
//                + "VenueVista Team";
//
//        sendEmail(toEmail, subject, body);
//    }
//
//    public void sendLoginNotification(AuthenticationRequest authRequest) {
//        String toEmail = authRequest.getEmail();
//        String subject = "Login Notification";
//        String body = """
//                Dear user,
//
//                This is a notification that your account has been logged into VenueVista.
//
//                If this wasn't you, please contact our support team immediately.
//
//                Best regards,
//                VenueVista Team""";
//
//        sendEmail(toEmail, subject, body);
//    }
//
////    public void sendReservationConfirmation(ReservationRequest reservationRequest) {
////        String toEmail = userRepository.findById(reservationRequest.getReservedBy()).get().getEmail();
////        String subject = "Reservation Confirmation";
////        String body = "Dear " + userRepository.findById(reservationRequest.getReservedBy()).get().getFirstName()+ ",\n\n"
////                + "This is to confirm your reservation at VenueVista for the following details:\n\n"
////                + "Space: " + spaceRepository.getSpaceById(reservationRequest.getSpaceID()) + "\n"
////                + "Date: " + reservationRequest.getDate() + "\n"
////                + "Time: " + reservationRequest.getStartTime() + "\n\n"
////                + "We look forward to hosting you!\n\n"
////                + "Best regards,\n"
////                + "VenueVista Team";
////
////        sendEmail(toEmail, subject, body);
////    }
//
//    public void sendSpaceCreationNotification(SpaceRequest spaceRequest) {
//        String toEmail = "2020e017@eng.jfn.ac.lk"; //  MA email
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
//
//    private void sendEmail(String toEmail, String subject, String body) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject(subject);
//        message.setText(body);
//        mailSender.send(message);
//    }
//}