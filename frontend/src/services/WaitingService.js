

import axios from "axios";

const endPointWaiting = "http://localhost:8080/api/v1/waiting";

const createWaiting = async (
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
) => {

  console.log('waitingfor date : ' , waitingForDate)
  try {
    const response = await axios.post(`${endPointWaiting}/createrwaitings`, {
      title,
      startTime,
      endTime,
      spaceID,
      waitingForDate,
      date,
      waitingByID,
      responsibleRole,
      batch,
      waitingId,
    });
    return response;
  } catch (error) {
    console.error("Error creating waiting:", error.message);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Reservation already exists");
        case 503:
          throw new Error("Service unavailable");
        default:
          throw new Error("Error occurred");
      }
    } else {
      throw new Error("Error occurred");
    }
  }
};

const getWaitingList = async (setWaitingList,spaceID, date, startTime, endTime) => {

  console.log("space : ",spaceID )
  console.log("date : ",date )
  console.log("startTime : ",startTime )
  console.log("endTime : ",endTime )
  try {
    const response = await axios.get(`${endPointWaiting}/waitinglist`, {
      params: { spaceID, date, startTime, endTime },
    });
    console.log(response.data)
    setWaitingList(response.data)
  } catch (error) {
    console.error("Error fetching waiting list:", error.message);
    throw new Error("Error fetching waiting list");
  }
};

const getUserWaitings = async (setReservations, username) => {
  try {
    const response = await axios.get(`${endPointWaiting}/user`, {
      params: { email: username },
    });
    console.log(response.data);
    setReservations(response.data);
  } catch (error) {
    console.error("Error fetching user waitings:", error.message);
    throw new Error("Error fetching user waitings");
  }
};

const deleteUserWaiting = async (waitingId) => {
  try {
    const response = await axios.delete(
      `${endPointWaiting}/deleteuserwaitings`,
      {
        params: { waitingId },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting user waiting:", error.message);
    throw new Error("Error deleting user waiting");
  }
};



export { createWaiting, getWaitingList, deleteUserWaiting, getUserWaitings};
