import React, { useEffect, useState } from 'react'
import styles from './ReservationsTable.module.scss'
import classNames from "classnames";
import { getAllSpaces } from '../../../services/SpaceService';
import { getTimeString , getDateInFormat } from '../../../utills';
import { MdClose, MdCheck } from "react-icons/md";

import { createReservation, deleteUserReservation } from '../../../services/ReservationService';
import { deleteUserWaiting } from '../../../services/WaitingService';


const ReservationsTable = ({
    reservations,
    isActionable,
    isAcceptable,
    user,
    waitingList,
    onDeleteSuccess
}) => {
    const[spaces , setSpaces] = useState('');

    async function getSpaces() {
        await getAllSpaces(setSpaces);
      }

    useEffect(() =>{
        getSpaces()

    },[])

    // useEffect(()=>{
    //   updateReservation()
    // })

    const handleDelete = async (reservation) => {
      if (waitingList === false) {
        try {
          console.log('id :' , reservation.id)
          const res = await deleteUserReservation(reservation.id);
          if (res.status === 200) {
            onDeleteSuccess(reservation.id);
          }
        } catch (error) {
          if (error.message === "email") {
            // Error but an email issue, so you can handle it accordingly
          } else {
            // Other errors
            console.log(error);
          }
        }
      } else {
        try {
          const res = await deleteUserWaiting(reservation.id);
          console.log(res.status)
          if (res.status === 200) {
            onDeleteSuccess(reservation.id);
          }
   
        } catch (error) {
          if (error.message === "email") {
            // Error but an email issue, so you can handle it accordingly
          } else {
            // Other errors
            console.log(error);
          }
        }
      }
    };

      const handleReservation = async (reservation) => {
        await createReservation(
          
          reservation.title,
          reservation.startTime,
          reservation.endTime,
          reservation.spaceID,
          reservation.reservationDate,
          Date.now(),
          reservation.waitingByID,
          reservation.responsibleRole,
          reservation.batch,
          reservation.waitingId
        )
          .then((res) => {
            // if reservation sucess
            console.log(res);
            onDeleteSuccess(reservation.waitingId)
            // updateReservation();
          })
          .catch((error) => {
            // if reserved
            if (error.message === "reserved") {
              console.log("reserved");
              // updateReservation();
            } else if (error.message === "email") {
              // updateReservation();
            } else {
              // other error
              console.log(error);
            }
          });
      };

      return (
        <div
          className={classNames(
            styles.container,
            // reservations.length === 0 && styles.hide
          )}
        >
          <table className={styles.resTable}>
            <thead>
              <tr>
                <th className={styles.firstCol}>Title</th>
                <th>Date</th>
                <th>Batch</th>
                <th>Space</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Responsible Person</th>
                {isActionable && <th className={styles.actionCol}>Actions</th>}{" "}
                {/* add a new column for actions */}
              </tr>
            </thead>
            <tbody>
              {reservations?.map((reservation) => {
                
                return (
                  <tr key={reservation.id}>
                    <td className={styles.firstCol}>{reservation.title}</td>
                    <td>{getDateInFormat(new Date(reservation.reservationDate))}</td>
                    <td>{reservation.batch}</td>
                    <td>{reservation.spaceName}</td>
                    <td>{getTimeString(reservation.startTime)}</td>
                    <td>{getTimeString(reservation.endTime)}</td>
                    <td>{reservation.fullName}</td>
                    {isActionable && (
                      <td className={styles.actionColCell}>
                        {isAcceptable && (
                          <button
                            className={classNames(styles.btn, styles.acceptBtn)}
                            onClick={() => handleReservation(reservation)}
                          >
                            <MdCheck />
                            Confirm
                          </button>
                        )}
    
                        <button
                          className={classNames(styles.btn, styles.cancelBtn)}
                          onClick={() => handleDelete(reservation)}
                        >
                          <MdClose />
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}

export default ReservationsTable
