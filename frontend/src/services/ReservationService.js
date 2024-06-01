import axios from 'axios';

const endPointReservation = "http://localhost:8080/api/v1/reservations";

const createReservation = async(title, startTime, endTime, spaceID, reservationDate, date , reservedBy, responsibleRole, batch, waitingId) =>{
    try {

        console.log(reservationDate)
        return await axios.post(
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
            
        )
        
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

const getAllReservations = async () => {
    try {
        console.log('function calling')
        const response = await axios.get(`${endPointReservation}/getAllreservations`);
        // setReservations(response.data); // Return the data to use it in your application
        return response;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while fetching reservations");
    }
}
export { createReservation, getAllReservations };
