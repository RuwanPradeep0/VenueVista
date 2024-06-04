import axios from 'axios';

const endPointWaiting = "http://localhost:8080/api/v1/waiting";

const createWaiting = async(title, startTime, endTime, spaceID, waitingForDate, date ,  waitingByByID, responsibleRole, batch, waitingId) =>{
    try {

        console.log(endTime)
        return await axios.post(
            endPointWaiting + '/createrwaitings',
            {
                title,
                startTime,
                endTime,
                spaceID,
                waitingForDate,
                date,
                waitingByByID,
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


async function getWaitingList(){

}


const getUserWaitings = async()=>{

}

const deleteUserWaiting = () =>{

}

export{createWaiting , getWaitingList ,deleteUserWaiting , getUserWaitings};
