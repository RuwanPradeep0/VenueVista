import axios from 'axios';

const endPointReservation = "http://localhost:8080/api/v1/reservations";

const createReservation = async(title, startTime, endTime, spaceID, reservationDate, date , reservedBy, responsibleRole, batch, waitingId) =>{
    try {

        console.log(reservationDate)
        const response = await axios.post(
            endPointReservation + '/createreservations',
            {
                title,
                startTime,
                endTime,
                spaceID,
                reservationDate,
                date,
                reservedBy,
                responsibleRole,
                batch,
                waitingId
            }
        );
        console.log(response.data); // Log the response data if needed
    } catch (error) {
        console.log(error.message);
        if (error.response && error.response.status === 401) {
            throw new Error("Reservation already exists");
        } else if (error.response && error.response.status === 503) {
            throw new Error("Service unavailable");
        } else {
            throw new Error("Error occurred");
        }
    }
}

const getAllReservation = async() => {
    // Implement get all reservations if needed
}

export { createReservation, getAllReservation };
