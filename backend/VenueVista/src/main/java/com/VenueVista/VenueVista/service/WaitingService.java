package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse_DTO.UserWaitingResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingListResponse;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingRequest;
import com.VenueVista.VenueVista.controller.RequestResponse_DTO.WaitingResponse;
import com.VenueVista.VenueVista.exception.InvalidDataException;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.models.user.User;
import com.VenueVista.VenueVista.repository.SpaceRepository;
import com.VenueVista.VenueVista.repository.UserRepository;
import com.VenueVista.VenueVista.repository.WaitingRepository;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WaitingService {

    private final WaitingRepository waitingRepository;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;
    private final EmailService emailService;  // Add EmailService

    // Create waiting Table
//    public WaitingResponse handleWaiting(WaitingRequest waitingRequest) {
//        Waiting waiting = requestToWaiting(waitingRequest);
//        Waiting savedWaiting = createWaiting(waiting);
//
//        // Send notification email
//        emailService.sendWaitingListNotification(waiting);
//        emailService.sendWaitingNotificationsWhoReserved(waiting);
//
//        return waitingToResponse(savedWaiting);
//    }

    public WaitingResponse handleWaiting(WaitingRequest waitingRequest) throws InvalidDataException {
        Waiting waiting = requestToWaiting(waitingRequest);

        // Check if the slot is available
        boolean isSlotAvailable = waitingRepository.findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
                waiting.getWaitingForDate().toLocalDate().atStartOfDay(), waiting.getStartTime(), waiting.getEndTime() ,waiting.getSpace()).isEmpty();

        if (!isSlotAvailable) {
            // Slot is not available, return an error response or throw an exception
            return null;
        }

        Waiting savedWaiting = createWaiting(waiting);

        // Send notification email
//        emailService.sendWaitingListNotification(waiting);
//        emailService.sendWaitingNotificationsWhoReserved(waiting);

        // Update other waiting entries with the same slot as unavailable
        updateOtherWaitingEntries(waiting);

        return waitingToResponse(savedWaiting);
    }

    public Waiting createWaiting(Waiting waiting) {
        return waitingRepository.save(waiting);
    }

    // Get User Waiting
    public List<UserWaitingResponse> getUserWaitings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        List<Waiting> userWaitings = waitingRepository.findByWaitingBy(user);

        return userWaitings.stream()
                .map(this::mapToUserWaitingResponse)
                .collect(Collectors.toList());
    }

    public List<WaitingListResponse> getWaitingList(Integer spaceID, String date, Integer startTime, Integer endTime) {
        Space space = spaceRepository.findById(spaceID)
                .orElseThrow(() -> new ResourceNotFoundException("Space not found with ID: " + spaceID));

        LocalDateTime waitingForDate = LocalDate.parse(date).atStartOfDay();
        LocalDateTime reservationStart = waitingForDate.withHour(startTime / 100).withMinute(startTime % 100);
        LocalDateTime reservationEnd = waitingForDate.withHour(endTime / 100).withMinute(endTime % 100);

        List<Waiting> waitings = waitingRepository.findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
                waitingForDate, reservationStart, reservationEnd, space);

        return waitings.stream()
                .map(this::mapToWaitingListResponse)
                .collect(Collectors.toList());
    }

    // Delete waiting by Id
    public void deleteUserWaitng(Integer waitingId) {
        if (!waitingRepository.existsById(waitingId)) {
            throw new ResourceNotFoundException("Waiting not found with ID: " + waitingId);
        }
        waitingRepository.deleteById(waitingId);
    }



/////////////////////
    private void updateOtherWaitingEntries(Waiting waiting) {
        List<Waiting> overlappingWaitings = waitingRepository.findByWaitingForDateAndStartTimeAndEndTimeAndSpace(
                waiting.getWaitingForDate().toLocalDate().atStartOfDay(), waiting.getStartTime(), waiting.getEndTime() , waiting.getSpace());

        for (Waiting otherWaiting : overlappingWaitings) {
            if (!otherWaiting.getId().equals(waiting.getId())) {
                otherWaiting.setAvailable(false);
                waitingRepository.save(otherWaiting);
            }
        }
    }


    private Waiting requestToWaiting(WaitingRequest waitingRequest) throws InvalidDataException {
       Waiting waiting = new Waiting();
        User user = userRepository.findById(waitingRequest.getWaitingByID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + waitingRequest.getWaitingByID()));

        waiting.setWaitingBy(user);

        waiting.setTitle(waitingRequest.getTitle());
        Space space = spaceRepository.findById(waitingRequest.getSpaceID())
                .orElseThrow(() -> new ResourceNotFoundException("Space not found with ID: " + waitingRequest.getSpaceID()));
        waiting.setSpace(space);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime waitingForDate = LocalDateTime.parse(waitingRequest.getWaitingForDate() + " 00:00", formatter);

            waiting.setWaitingForDate(waitingForDate);
            waiting.setStartTime(waitingForDate.withHour(waitingRequest.getStartTime() / 100)
                    .withMinute(waitingRequest.getStartTime() % 100));
            waiting.setEndTime(waitingForDate.withHour(waitingRequest.getEndTime() / 100)
                    .withMinute(waitingRequest.getEndTime() % 100));
        } catch (Exception e) {
            throw new InvalidDataException("Invalid date format. Expected format: yyyy-MM-dd");
        }


        waiting.setResponsiblePersonRole(waitingRequest.getResponsibleRole());
        waiting.setBatch(waitingRequest.getBatch());
        return waiting;
    }

    private WaitingResponse waitingToResponse(Waiting waiting) {
        int startTime = waiting.getStartTime().getHour() * 100 + waiting.getStartTime().getMinute();
        int endTime = waiting.getEndTime().getHour() * 100 + waiting.getEndTime().getMinute();

        return WaitingResponse.builder()
                .title(waiting.getTitle())
                .startTime(startTime)
                .endTime(endTime)
                .spaceID(waiting.getSpace().getId())
                .reservationDate(waiting.getWaitingForDate().toLocalDate().toString())
                .date(waiting.getDate())
                .waitingByID(waiting.getWaitingBy().getId())
                .responsibleRole(waiting.getResponsiblePersonRole())
                .batch(waiting.getBatch())
                .fullName(waiting.getWaitingBy().getFullName())
                .waitingId((int) waiting.getWaitingId())
                .build();
    }

    private UserWaitingResponse mapToUserWaitingResponse(Waiting waiting) {
        int startTime = waiting.getStartTime().getHour() * 100 + waiting.getStartTime().getMinute();
        int endTime = waiting.getEndTime().getHour() * 100 + waiting.getEndTime().getMinute();

        return UserWaitingResponse.builder()
                .id(waiting.getId())
                .title(waiting.getTitle())
                .startTime(startTime)
                .endTime(endTime)
                .spaceID(waiting.getSpace().getId())
                .reservationDate(waiting.getWaitingForDate().toLocalDate().toString())
                .date(waiting.getDate())
                .waitingByID(waiting.getWaitingBy().getId())
                .responsibleRole(waiting.getResponsiblePersonRole())
                .batch(waiting.getBatch())
                .fullName(waiting.getWaitingBy().getFullName())
                .spaceName(waiting.getSpace().getName())
                .waitingId(waiting.getId())
                .available(waiting.isAvailable())
                .build();
    }

    private WaitingListResponse mapToWaitingListResponse(Waiting waiting) {
        return WaitingListResponse.builder()
                .id(waiting.getId())
                .title(waiting.getTitle())
                .fullName(waiting.getWaitingBy().getFullName())
                .batch(waiting.getBatch())
                .responsiblePersonRole(waiting.getResponsiblePersonRole())
                .available(waiting.isAvailable())
                // Add any other fields you want to include in the response
                .build();
    }

    private int parseTime(Integer time) {
        if (time == null) {
            return 0;
        }
        return time;
    }


}

