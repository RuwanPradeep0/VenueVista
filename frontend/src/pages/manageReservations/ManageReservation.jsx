import React, { useState } from 'react'
import styles from './ManageReservations.module.scss'
import Hero from '../../components/Hero'
import ReservationsTable from '../../components/manageReservations/reservationTable/ReservationsTable';
import MyWaitings from '../../components/manageReservations/reservations/MyWaitings';
import MyReservations from '../../components/manageReservations/reservations/MyReservations';

const ManageReservation = () => {

  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div>      
      <Hero
    title="Manage Reservations"
    description="Edit, Delete Your Reservations and Check Waiting List"
      >
    {/* Toggle Between the state */}
    <button
      className={`${styles.toggleSwitch}  ${
        isWaiting ? styles.waiting : null
      }`}
      onClick={() => setIsWaiting(!isWaiting)}
    >
      <p className={styles.toggleItem}>Confirmed Reservations</p>
      <p className={styles.toggleItem}>Waiting List</p>
    </button>
  </Hero>

  <div className={styles.tableContainer}>
        {/* Conditionally Render the Confirmed Reservations and Waiting List according to state */}
        {isWaiting ? <MyWaitings /> : <MyReservations />}
      </div>
    </div>
  )
}

export default ManageReservation
