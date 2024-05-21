import React from 'react'
import { FiMapPin, FiCheck, FiCheckCircle } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock, FaPlus } from "react-icons/fa";
import { MdError, MdPlaylistAddCheckCircle } from "react-icons/md";

import {
    getDateInFormat,
    getTimeString,
    setTimeFormat,
    mapTimeStringToInteger,
    checkUser,
    getDateInYearFormat,
  } from '../../utills'

import Select from "react-select";
import classNames from "classnames";
import { useEffect, useState } from "react";
import {getAllResponsible} from '../../services/ResponsibleService'
import {createReservation} from '../../services/ReservationService'
import {createWaiting} from '../../services/WaitingService'
import {getAuthenticate} from '../../services/AuthenticationService'

import styles from './AddEvent.module.scss'


const groupedOptions = [
    {
      label: "Lecturers",
    },
    {
      label: "Instructors",
    },
  ];


const AddEvent = ({
  startTimeProp,
  endTimeProp,
  spaceId,
  date,
  spaceReservations,
  spaceName,
  updateReservations,
}) => {

    const [startTime, setStartTime] = useState(getTimeString(startTimeProp));
    const [endTime, setEndTime] = useState(getTimeString(endTimeProp));
    const [responsible, setResponsible] = useState([]);
    const [isClash, setClash] = useState(false);
    const [user, setUser] = useState("");
    const [valid, setValid] = useState(false);
    const [title, setTitle] = useState("");
    const [responsibleId, setResponsibleId] = useState(0);
    const [isTimeInvalid, setIsTimeInvalid] = useState(false);

    // useEffect(() => {
    //     getResponsible();
    //   }, []);

    
      // useEffect(() => {
      //   if (responsible.length !== 0) mapResponsible();
      // }, [responsible]);


      useEffect(() => {
        setStartTime(getTimeString(startTimeProp));
        setEndTime(getTimeString(endTimeProp));
      }, [startTimeProp, endTimeProp]);
    
      useEffect(() => {
        checkUser(setUser, setValid, () => {});
        setShowFeedbackSuccess(false);
        setShowFeedbackWaiting(false);
        setShowFeedbackError(false);
        setIsTimeInvalid(false);
      }, [startTimeProp, endTimeProp, spaceId, date]);

// //creating a proper object 
//       function mapResponsible() {
//         groupedOptions[0].options = responsible
//           .filter((res) => res.type.toLowerCase() !== "instructor")
//           .map((res) => {
//             const val = {};
//             val.value = res.id;
//             val.label = res.type + " " + res.fullName;
//             return val;
//           });
          
//         groupedOptions[1].options = responsible
//           .filter((res) => res.type.toLowerCase() === "instructor")
//           .map((res) => {
//             const val = {};
//             val.value = res.id;
//             val.label = res.fullName;
//             return val;
//           });
//       }

      // async function getResponsible() {
      //   await getAllResponsible(setResponsible);
      // }

      const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
      };

      const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
      };

      useEffect(() => {
        //setTimeInvalid is a useState value
        setIsTimeInvalid(
          !mapTimeStringToInteger(startTime) ||
            !mapTimeStringToInteger(endTime) ||
            mapTimeStringToInteger(startTime) > mapTimeStringToInteger(endTime)
        );
        const endTimeFormatted = mapTimeStringToInteger(endTime);
        const startTimeFormatted = mapTimeStringToInteger(startTime);
        if (startTimeFormatted !== false && endTimeFormatted !== false) {
          validateReservation(startTimeFormatted, endTimeFormatted);
        }
      },[startTime, endTime]);
    
      const handleChangeTitle = (event) => {
        setTitle(event.target.value);
      };

      //Validating the time
      const validateReservation = (startTimeFormatted, endTimeFormatted) => {
        console.log(startTimeFormatted, endTimeFormatted);
    
        if (startTimeFormatted > endTimeFormatted) {
          console.log("Please enter a valid End Time");
        } else {
          checkAvailablity(startTimeFormatted, endTimeFormatted);
        }
      };

      //check availability of the time slot
      const checkAvailablity = (startTimeFormatted, endTimeFormatted) => {
        var reservationDate = getDateInYearFormat(date || new Date());
        const dayReservations = spaceReservations?.filter(
          (reservation) => reservation.date === reservationDate
        );
        console.log(spaceReservations, dayReservations, reservationDate);
        if (
          dayReservations?.filter(
            (reservation) =>
              // reservation.startTime < startTimeFormatted < reservation.endTime ||
              //reservation.startTime < endTimeFormatted < reservation.endTime
              (reservation.startTime <= startTimeFormatted &&
                startTimeFormatted <= reservation.endTime) ||
              (reservation.startTime <= endTimeFormatted &&
                endTimeFormatted <= reservation.endTime)
          ).length === 0
        ) {
          console.log("Slot is available");
          setClash(false);
        } else {
          console.log("Slot is not available");
          setClash(true);
        }
      };

      
        //hadnling submit click, on submit click show feedback
        const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
        const [showFeedbackError, setShowFeedbackError] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
        
        
            await getAuthenticate(
                
              createReservation,
              title,
              setTimeFormat(startTime),
              setTimeFormat(endTime),
              spaceId,
              Date.now(),
              getDateInYearFormat(date),
              user.id,
              responsibleId,
              -1
            )
              .then((res) => {
                // if reservation sucess
                setShowFeedbackSuccess(true);
                updateReservations();
              })
              .catch((error) => {
                // if reserved
                if (error.message === "reserved") {
                  console.log("reserved");
                  setShowFeedbackError(true);
                } else if (error.message === "email") {
                  setShowFeedbackSuccess(true);
                  updateReservations();
                  console.log(error);
                } else {
                  console.log(error);
                  // other error
                  setShowFeedbackError(true);
                }
              });

                  //reset after timeout
    setTimeout(() => {
        setShowFeedbackError(false);
        setShowFeedbackSuccess(false);
      }, 4000);
    };

    //handling submit waiting list click, on submit show feedback
  const [showFeedbackWaiting, setShowFeedbackWaiting] = useState(false);
  const handleWaiting = async (e) => {
    e.preventDefault();

    await getAuthenticate(
      createWaiting,
      title,
      setTimeFormat(startTime),
      setTimeFormat(endTime),
      spaceId,
      Date.now(),
      getDateInYearFormat(date),
      user.id,
      responsibleId,
      -1
    )
      .then((res) => {
        // if waiting success
        setShowFeedbackWaiting(true);
        updateReservations();
      })
      .catch((error) => {
        // email error
        if (error.message === "email") {
          setShowFeedbackWaiting(true);
          updateReservations();
        } else {
          console.log(error);
          setShowFeedbackError(true);
          // other error
        }
      });

    //reset after timeout
    setTimeout(() => {
      setShowFeedbackError(false);
      setShowFeedbackWaiting(false);
    }, 4000);
  };

  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    setIsDisable(
      // !responsibleId ||
        title === "" ||
        !mapTimeStringToInteger(startTime) ||
        !mapTimeStringToInteger(endTime) ||
        mapTimeStringToInteger(startTime) > mapTimeStringToInteger(endTime)
    );
  }, [responsibleId, title, startTime, endTime]);

        




  return (
    <div className={styles.addEvent}>
        <form>
        <input
          type="text"
          placeholder="Add Title"
          className={styles.inputTitle}
          maxLength={25}
          onChange={handleChangeTitle}
          value={title}
        />
         <div className={styles.info}>
         <p className={styles.infoItem}>
            <FiMapPin />
            {spaceName}
          </p>
          <p className={styles.infoItem}>
            <LuCalendarDays />
            {getDateInFormat(date)}
          </p>
          <p className={styles.infoItem}>
            <FaRegClock />
            <input
              type="text"
              value={startTime}
              onChange={handleStartTimeChange}
              className={classNames(
                styles.time,
                isTimeInvalid && styles.invalid
              )}
            />{" "}
            -
            <input
              type="text"
              value={endTime}
              onChange={handleEndTimeChange}
              className={classNames(
                styles.time,
                isTimeInvalid && styles.invalid
              )}
            />
          </p>
         </div>
         <p className={styles.pResPerson}>Responsible Person</p>

         <ResponsibleSelect setResponsibleId={setResponsibleId} />
         {isClash ? (
          <button
            type="submit"
            className={classNames(styles.submitBtn, styles.addWaitingListBtn)}
            onClick={handleWaiting}
            disabled={isDisable}
          >
            <FaPlus />
            Add to Waiting List
          </button>
        ) : (
          <button
            type="submit"
            className={classNames(styles.submitBtn, styles.confirmBtn)}
            onClick={handleSubmit}
            disabled={isDisable}
          >
            <FiCheck className={styles.checkIcon} />
            Confirm Reservation
          </button>
        )}

        </form>

        <div
        className={classNames(
          styles.feedbackContainer,
          showFeedbackSuccess && styles.show
        )}
      >
        <FiCheckCircle className={styles.feedbackIcon} />
        <p>Reservation Added Successfully!</p>
      </div>

      <div
        className={classNames(
          styles.feedbackContainer,
          styles.feedbackWaiting,
          showFeedbackWaiting && styles.show
        )}
      >
        <MdPlaylistAddCheckCircle className={styles.feedbackIcon} />
        <p>Added to Waiting List!</p>
      </div>

      <div
        className={classNames(
          styles.feedbackContainer,
          styles.feedbackError,
          showFeedbackError && styles.show
        )}
      >
        <MdError className={styles.feedbackIcon} />
        <p>
          Error Occured <br /> Please Try Again
        </p>
      </div>
    </div>
  )
}

export default AddEvent


const ResponsibleSelect = ({ setResponsibleId }) => (
    <Select
      placeholder="Select a reponsible person"
      options={groupedOptions}
      onChange={(choice) => setResponsibleId(choice.value)}
      classNames={{
        container: () => styles.selectContainer,
        control: (state) =>
          classNames(
            styles.selectControl,
            state.isFocused && styles.selectControlFocused
          ),
        option: (state) => classNames(styles.selectOption),
        placeholder: (state) => classNames(styles.selectPlaceholder),
        input: (state) =>
          classNames(
            styles.selectInput,
            state.isFocused && styles.selectInputFocused
          ),
        menu: (state) => classNames(styles.selectMenu),
        valueContainer: (state) => styles.selectValueContainer,
      }}
    />
  );
  