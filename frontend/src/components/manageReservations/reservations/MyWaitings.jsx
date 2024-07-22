import React, { useEffect, useState } from 'react'
import styles from './MyReservations.module.scss'
import ReservationsTable from '../reservationTable/ReservationsTable'
import { getUserWaitings } from '../../../services/WaitingService'
import { checkUser } from '../../../utills'
import classNames from "classnames";



const MyWaitings = () => {

    const [user, setUser] = useState("");
    const [valid, setValid] = useState(false);
    const [waiting, setWaiting] = useState([]);
    const [availableWaiting, setAvailableWaiting] = useState([]);
    const [unavailableWaiting, setUnAvailableWaiting] = useState([]);

    function getReservation() {
        getUserWaitings(setWaiting, user.username);
        console.log(user.username)
        console.log(waiting)
      }



      useEffect(() => {
        checkUser(setUser, setValid);
      }, []);
    
      useEffect(() => {
        if (user !== "") {
          getReservation();
        }
      }, [user]);
    
      useEffect(() => {
        if (waiting.length>0) {
          setAvailableWaiting(waiting.filter((wait) => wait.available));
          setUnAvailableWaiting(waiting.filter((wait) => !wait.available));
        }
      }, [waiting ]);

      const handleDeleteSuccess = (reservationId) => {
        setAvailableWaiting(prev => prev.filter(res => res.id !== reservationId));
        setUnAvailableWaiting(prev => prev.filter(res => res.id !== reservationId));
      };
     

  return (
     <div className={styles.container}>
      <h2>Available for Reservation</h2>
      <p
        className={classNames(
          styles.NoReservations,
          availableWaiting.length === 0 && styles.show
        )}
      >
        You are not in a waiting list for any reservation
      </p>

      <ReservationsTable
        reservations={availableWaiting}
        isActionable={true}
        isAcceptable={true}
        waitingList={true}
        updateReservation={getReservation}
        user={user}
        onDeleteSuccess={handleDeleteSuccess}
        
      />

     
      {unavailableWaiting.length !== 0 && (
        <h2 className={styles.pastReservations}>Currently Unavailable</h2>
      )}

      <ReservationsTable
        reservations={unavailableWaiting}
        updateReservation={getReservation}
        isActionable={true}
        waitingList={true}
        user={user}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  )
}

export default MyWaitings
