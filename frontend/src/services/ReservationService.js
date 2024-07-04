import axios from 'axios';

const endPointReservation = "http://localhost:8080/api/v1/reservations";

const createReservation = async(title, startTime, endTime, spaceID, reservationDate, date , reservedByID, responsibleRole, batch, waitingId) =>{
    
    console.log(reservationDate)
    
    try {

        console.log(endTime)
        return await axios.post(
            endPointReservation + '/createreservations',
            {
                title,
                startTime,
                endTime,
                spaceID,
                reservationDate,
                date,
                reservedByID,
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
        throw new Error("Error occurred while fetching reservations");
    }
}

const deleteUserReservation = async (reservationId) => {
    
   
    try {
        console.log('reservationId' , reservationId)
        const response = await axios.delete(`${endPointReservation}/deleteuserereservations`, {
            params: { reservationId }
        });
        // Check if the request was successful (status code 200-299)
        if (response.status >= 200 && response.status < 300) {
            console.log('Reservation deleted successfully:', response);
            // Optionally return the response for further processing
            return response;
        } else {
            // If the request was not successful, throw an error with status and message
            throw new Error(`Failed to delete reservation. Server responded with status: ${response.status}`);
        }
    } catch (error) {
        // Check if the error is a 403 Forbidden error
        if (error.response && error.response.status === 403) {
            // Handle 403 Forbidden error: Provide appropriate feedback to the user
            console.error('Forbidden: You do not have permission to delete this reservation');
            // Optionally, you can show an error message to the user or perform other actions
            // For example, display an error message on the UI
            // showMessage('Error', 'You do not have permission to delete this reservation');
        } else {
            // Handle other errors
            console.error('Error deleting reservation:', error.message);
            // Optionally, you can show a generic error message to the user or perform other actions
            // For example, display a generic error message on the UI
            // showMessage('Error', 'Failed to delete reservation. Please try again later.');
        }
    }
}



const getUserReservations = async(setReservations, username) =>{
    console.log('calling :' , username)
    try {
        console.log('calling')
        const response = await axios.get(endPointReservation + "/user" , {
            params :{
                email : username,
            }
        }
        )

        setReservations(response.data);
        console.log(response.data)
    } catch (error) {

        console.log(error)
        
    }

}


export { createReservation, getAllReservations ,deleteUserReservation ,getUserReservations};
