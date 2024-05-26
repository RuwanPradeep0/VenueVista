import axios from 'axios';

const endPointReservation = "http://localhost:8080/api/v1/reservation";
//Ruwan : need to implement

const createReservation = async(token, arrgs) =>{

    console.log(arrgs )

    await axios
    .post(
      endPointReservation,
      {
        spaceID: arrgs[3],
        title: arrgs[0],
        reservationDateTime: arrgs[4],
        startTime: arrgs[1],
        endTime: arrgs[2],
        date: arrgs[5],
        reservedBy: arrgs[6],
        responsiblePerson: arrgs[7],
        waitingId: arrgs[8],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.message);
      if (error.response.status === 401) {
        throw new Error("reserved");
      } else if (error.response.status === 503) {
        throw new Error("email");
      }
      throw new Error("");
    });

}

const getAllReservation = async()=>{


}
 
export{createReservation , getAllReservation};