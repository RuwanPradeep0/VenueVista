import axios from 'axios';

const endPointReservation = "http://localhost:8080/api/v1/reservation/createreservations";
//Ruwan : need to implement

const createReservation = async(arrgs) =>{

    console.log('calling' )

    await axios
    .post(
      endPointReservation +'/createreservations',
      {
        title: arrgs[0],
        startTime: arrgs[1],
        endTime: arrgs[2],
        spaceID: arrgs[3],
        reservationDateTime: arrgs[4],
        date: arrgs[5],
        reservedBy: arrgs[6],
        responsiblePerson: arrgs[7],
        batch: arrgs[8],                                                                                                                                                               
      },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
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