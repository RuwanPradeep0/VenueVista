import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock, FaPlus } from "react-icons/fa";
import {
  generateColorCode,
  getDateInFormat,
  getTimeString,
} from "../../utills";
import { getWaitingList } from "../../services/WaitingService";
import { SlPeople } from "react-icons/sl";
import styles from "./ReservationInfo.module.scss";

const ReservationInfo = ({ reservation, onClick,isUserLoggedIn }) => {
  // const spaceName = spaces.find((s) => s.id === reservation.spaceId).name;

  const spaceName = "Lecture Hall 01";

  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    console.log("reservation :" , reservation)
    if (reservation !== null)
      getWaitingList(
        setWaitingList,
        reservation.spaceID,
        reservation.reservationDate,
        reservation.startTime,
        reservation.endTime
      )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [reservation, onClick]);

  return (
    <div className={styles.container}>
      <div
        className={styles.infoTop}
        style={{
          backgroundColor: `${generateColorCode(reservation.fullName[0])}`,
        }}
      >
        <h4 className={styles.title}>{reservation.title}</h4>

        <div className={styles.info}>
          <p className={styles.infoItem}>
            <FiMapPin />
            {spaceName}
          </p>
          <p className={styles.infoItem}>
            <LuCalendarDays />
            {getDateInFormat(new Date(reservation.reservationDate))}
          </p>
          <p className={styles.infoItem}>
            <FaRegClock />
            {`${getTimeString(reservation.startTime)} - ${getTimeString(
              reservation.endTime
            )}`}
          </p>
          <p className={styles.infoItem}>
            <SlPeople />
            {reservation.batch}
          </p>
        </div>
      </div>

      <div className={styles.infoBottom}>
        <p className={styles.infoText}>Reserved By</p>
        <p className={styles.person}>{reservation.fullName}</p>
        <p className={styles.infoText + " " + styles.resPerson}>
          Responsible
        </p>
        <p className={styles.person}>{reservation.responsibleRole}</p>
        <div className={styles.waitingList}>
          {
            isUserLoggedIn &&  <button className={styles.waitingListBtn} onClick={onClick}>
            <FaPlus className={styles.plusIcon} />
            Add to Waiting List
          </button>
          }
          <p className={styles.NumberWaiting}>{waitingList.length} Waiting</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;