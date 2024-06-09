import axios from 'axios';

const endPointWaiting = "http://localhost:8080/api/v1/waiting";

const createWaiting = async(title, startTime, endTime, spaceID, waitingForDate, date ,  waitingByID, responsibleRole, batch, waitingId) =>{
    try {


        return await axios.post(
            endPointWaiting + '/createrwaitings',
            {
                title,
                startTime,
                endTime,
                spaceID,
                waitingForDate,
                date,
                waitingByID,
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


async function getUserWaitings(setReservations, username) {
  try {
  const response = await axios.get(endPointWaiting + "/user", {
    params: {
        email: username,
      },
     });

    console.log(response.data)
    setReservations(response.data);
  } catch (error) {
          console.error("Error fetching user waiting:", error.message);
  }
}

const deleteUserWaiting = async(waitingId) =>{

  console.log(waitingId)
  try {
    console.log(waitingId)
    const response = await axios.delete(`${endPointWaiting}/deleteuserwaitings` , {
      params:{
        waitingId : waitingId
      }
    })


    return response;

    
  } catch (error) {
    throw new Error(error)
    
  }


}

export{createWaiting , getWaitingList ,deleteUserWaiting , getUserWaitings};
