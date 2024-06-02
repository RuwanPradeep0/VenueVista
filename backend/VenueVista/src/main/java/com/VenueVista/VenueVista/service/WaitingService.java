package com.VenueVista.VenueVista.service;


import com.VenueVista.VenueVista.controller.RequestResponse.WaitingRequest;
import com.VenueVista.VenueVista.controller.RequestResponse.WaitingResponse;
import com.VenueVista.VenueVista.models.Waiting;
import com.VenueVista.VenueVista.repository.WaitingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class WaitingService {

    private final WaitingRepository waitingRepository;

    public WaitingResponse handleWaiting(WaitingRequest waitingRequest) {
        Waiting waiting = requestToWaiting(waitingRequest);
        WaitingResponse waitingResponse = waitingToResponse(waiting);
//        Waiting existingWaiting = getWaitingByDetails(waiting.getSpaceID(), waiting.getStartTime(),
//                waiting.getEndTime(), waiting.getWaitingId(), waiting.getResponsiblePersonRole());
//
        createWaiting(waiting);
        return waitingResponse;

    }


    public Waiting createWaiting(Waiting waiting) {
        return waitingRepository.save(waiting);
    }

//    public Waiting getWaitingByDetails(int spaceID, LocalDateTime startDateTime, LocalDateTime endDateTime, long waitingId, long responsiblePersonId) {
//        return waitingRepository.findBySpaceIDAndStartTimeAndEndTimeAndWaitingIdAndResponsiblePersonRole(
//                spaceID, startDateTime, endDateTime, waitingId, responsiblePersonId);
//    }

    private Waiting requestToWaiting(WaitingRequest request) {
        int startTime = parseTime(request.getStartTime());
        int endTime = parseTime(request.getEndTime());
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.parse(request.getWaitingForDate()), LocalTime.of(startTime / 100, startTime % 100));
        LocalDateTime endDateTime = LocalDateTime.of(LocalDate.parse(request.getWaitingForDate()), LocalTime.of(endTime / 100, endTime % 100));

        return Waiting.builder()
                .spaceID(request.getSpaceID())
                .title(request.getTitle())
                .waitingForDate(startDateTime)
                .startTime(startDateTime)
                .endTime(endDateTime)
                .date(request.getDate())
                .waitingId(request.getWaitingByByID().longValue())
                .responsiblePersonRole(request.getResponsibleRole())
                .available(false)
                .build();
    }

    private WaitingResponse waitingToResponse(Waiting waiting) {
        int startTime = waiting.getStartTime().getHour() * 100 + waiting.getStartTime().getMinute();
        int endTime = waiting.getEndTime().getHour() * 100 + waiting.getEndTime().getMinute();

        return new WaitingResponse(
                waiting.getTitle(),
                startTime,
                endTime,
                waiting.getSpaceID(),
                waiting.getWaitingForDate().toLocalDate().toString(),
                waiting.getDate(),
                (int) waiting.getWaitingId(),
                String.valueOf(waiting.getResponsiblePersonRole()),
                null,
                null,
                waiting.getId()
        );
    }

    private int parseTime(Integer time) {
        if (time == null) {
            return 0;
        }
        return time;
    }

}
