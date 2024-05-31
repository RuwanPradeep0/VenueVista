package com.VenueVista.VenueVista.exception;

public class AllReadyReservedException extends Exception {

    public AllReadyReservedException() {
        super();
    }

    public AllReadyReservedException(String message) {
        super(message);
    }

    public AllReadyReservedException(String message, Throwable cause) {
        super(message, cause);
    }

    public AllReadyReservedException(Throwable cause) {
        super(cause);
    }

    protected AllReadyReservedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}