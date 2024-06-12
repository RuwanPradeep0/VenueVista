package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.controller.RequestResponse.UserWaitingResponse;
import com.VenueVista.VenueVista.controller.RequestResponse.WaitingRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.WaitingResponse;
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
import java.time.LocalTime;
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
    public WaitingResponse handleWaiting(WaitingRequest waitingRequest) {
        Waiting waiting = requestToWaiting(waitingRequest);
        Waiting savedWaiting = createWaiting(waiting);

        // Send notification email
        emailService.sendWaitingListNotification(waiting);
        emailService.sendWaitingNotificationsWhoReserved(waiting);

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

    // Delete waiting by Id
    public void deleteUserWaitng(Integer waitingId) {
        if (!waitingRepository.existsById(waitingId)) {
            throw new ResourceNotFoundException("Waiting not found with ID: " + waitingId);
        }
        waitingRepository.deleteById(waitingId);
    }

    private Waiting requestToWaiting(WaitingRequest request) {
        int startTime = parseTime(request.getStartTime());
        int endTime = parseTime(request.getEndTime());
        LocalDate waitingForDate = LocalDate.parse(request.getWaitingForDate());
        LocalDateTime startDateTime = LocalDateTime.of(waitingForDate, LocalTime.of(startTime / 100, startTime % 100));
        LocalDateTime endDateTime = LocalDateTime.of(waitingForDate, LocalTime.of(endTime / 100, endTime % 100));

        User waitingBy = userRepository.findById(request.getWaitingByID())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getWaitingByID()));

        Space space = spaceRepository.findById(request.getSpaceID())
                .orElseThrow(() -> new RuntimeException("Space not found with ID: " + request.getSpaceID()));

        return Waiting.builder()
                .space(space)
                .title(request.getTitle())
                .waitingForDate(startDateTime)
                .startTime(startDateTime)
                .endTime(endDateTime)
                .date(request.getDate())
                .batch(request.getBatch())
                .waitingBy(waitingBy)
                .waitingId(request.getWaitingId())
                .responsiblePersonRole(request.getResponsibleRole())
                .available(false)
                .build();
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
                .waitingId((int) waiting.getWaitingId())
                .build();
    }

    private int parseTime(Integer time) {
        if (time == null) {
            return 0;
        }
        return time;
    }
}

