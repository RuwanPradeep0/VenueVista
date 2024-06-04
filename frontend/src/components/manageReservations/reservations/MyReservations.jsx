import React, { useEffect, useState } from 'react'
import styles from './MyReservations.module.scss'
import ReservationsTable from '../reservationTable/ReservationsTable'
import { checkUser } from '../../../utills'
import { getUserReservations } from '../../../services/ReservationService'
import classNames from "classnames";


const MyReservations = () => {

    const [user, setUser] = useState("");
    const [valid, setValid] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [currentReservations, setCurrentReservations] = useState([]);
    // const [responsibleReservations, setResponsibleReservations] = useState([]);
    // const [responsibleCurrentReservations, setResponsibleCurrentReservations] = useState([]);

    useEffect(() => {
        checkUser(setUser, setValid);
        console.log(reservations)
      }, []);
    
      // Fetch reservations when user is set
      useEffect(() => {
        const getReservation = () => {
          getUserReservations(setReservations, user.username);
          console.log('reservations', reservations);
        };
    
        if (user.username) {
          getReservation();
          console.log(reservations)
        }
      }, [user]);
    //   useEffect(() => {
    //     if (user !== "") {
    //       getReservation();
    //       //no use
    //     //   if ((user.role = Role.RESPONSIBLE))
    //     //     getResponsibleReservations(setResponsibleReservations, user.email);
    //     }
    //   }, []);
    
      useEffect(() => {
        if (reservations.length > 0) {
          setPastReservations(
            reservations.filter((res) => {
              const date = new Date(res.reservationDate);
              const currentDate = new Date();
              return date <= currentDate;
            })
          );
          setCurrentReservations(
            reservations.filter((res) => {
              const date = new Date(res.reservationDate);
              const currentDate = new Date();
              return date > currentDate;
            })
          );
        }
      }, [reservations]);

      // nouse
      
    //   useEffect(() => {
    //     if (responsibleReservations.length > 0) {
    //       setResponsibleCurrentReservations(
    //         responsibleReservations.filter((res) => {
    //           const date = new Date(res.date);
    //           const currentDate = new Date();
    //           return date >= currentDate;
    //         })
    //       );
    //     }
    //   }, [responsibleReservations]);


  return (
    <div className={styles.container}>
    <h2>Upcoming Reservations</h2>
    <p
      className={classNames(
        styles.NoReservations,
        currentReservations.length === 0 && styles.show
      )}
    >
      You have no upcoming reservations.
    </p>

    <ReservationsTable
      reservations={currentReservations}
      isActionable={true}
      user={currentReservations.fullName}
      waitingList={false}
    //   updateReservation={getReservation}
    />

    {pastReservations.length !== 0 && (
      <h2 className={styles.pastReservations}>Past Reservations</h2>
    )}

    <ReservationsTable
      reservations={pastReservations}
      user={pastReservations.fullName}
      waitingList={false}
    />

    {/* {user.role === Role.RESPONSIBLE &&
      responsibleReservations.length !== 0 && (
        <>
          <h2 className={styles.pastReservations}>Responsible</h2>
          <ReservationTable
            reservations={responsibleCurrentReservations}
            user={user}
            waitingList={false}
            isActionable={true}
          />
        </>
      )} */}
  </div>
  )
}

export default MyReservations
