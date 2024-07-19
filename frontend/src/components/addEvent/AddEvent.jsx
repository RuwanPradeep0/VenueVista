import React, { useEffect, useState } from 'react';
import { FiMapPin, FiCheck, FiCheckCircle } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock, FaPlus } from "react-icons/fa";
import { MdError, MdPlaylistAddCheckCircle } from "react-icons/md";
import Select from "react-select";
import classNames from "classnames";
import {
  getDateInFormat,
  getTimeString,
  setTimeFormat,
  mapTimeStringToInteger,
  getDateInYearFormat,
} from '../../utills';
import { createReservation } from '../../services/ReservationService';
import { createWaiting } from '../../services/WaitingService';
import styles from './AddEvent.module.scss';

const reservationPersonOptions = [
  { label: "Lecturer" },
  { label: "Instructor" },
  { label: "Other" },
];

const BatchOptions = [
  { label: "E19" },
  { label: "E20" },
  { label: "E21" },
  { label: "E22" },
  { label: "E23" },
  { label: "E24" },
  { label: "other" },
];

const AddEvent = ({
  startTimeProp,
  endTimeProp,
  spaceId,
  date,
  spaceReservations,
  spaceName,
  updateReservations,
  setAllReservations,
  allReservations,
  isConflict,
  setIsModalOpen,
}) => {
  const [startTime, setStartTime] = useState(getTimeString(startTimeProp));
  const [endTime, setEndTime] = useState(getTimeString(endTimeProp));
  const [isClash, setClash] = useState(false);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [responsibleName, setResponsibleName] = useState('');
  const [batchOption, setBatchOption] = useState('');
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [showFeedbackError, setShowFeedbackError] = useState(false);
  const [showFeedbackWaiting, setShowFeedbackWaiting] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const getUserId = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user ? user.id : null;
  };

  const userId = getUserId();

  useEffect(() => {
    console.log('date', date);
  }, [date]);

  useEffect(() => {
    setStartTime(getTimeString(startTimeProp));
    setEndTime(getTimeString(endTimeProp));
  }, [startTimeProp, endTimeProp]);

  useEffect(() => {
    setShowFeedbackSuccess(false);
    setShowFeedbackWaiting(false);
    setShowFeedbackError(false);
    setIsTimeInvalid(false);
  }, [startTimeProp, endTimeProp, spaceId, date]);

  useEffect(() => {
    setTitle('');
    setResponsibleName('');
    setBatchOption('');
  }, [spaceId, startTime, endTime, spaceReservations]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
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
  }, [startTime, endTime]);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const validateReservation = (startTimeFormatted, endTimeFormatted) => {
    if (startTimeFormatted > endTimeFormatted) {
      console.log("Please enter a valid End Time");
    } else {
      checkAvailability(startTimeFormatted, endTimeFormatted);
    }
  };

  const checkAvailability = (startTimeFormatted, endTimeFormatted) => {
    const reservationDate = getDateInYearFormat(date || new Date());
    const dayReservations = spaceReservations.filter(
      (reservation) => reservation.reservationDate === reservationDate
    );

    if (dayReservations.filter(
      (reservation) =>
        (reservation.startTime <= startTimeFormatted &&
          startTimeFormatted <= reservation.endTime) &&
        (reservation.startTime <= endTimeFormatted &&
          endTimeFormatted <= reservation.endTime) 
    ).length === 0) {
      setClash(false);
    } else {
      setClash(true);
    }

    // if (isConflict) {
    //   setClash(true);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit date:', date);
    try {
      const res = await createReservation(
        title,
        setTimeFormat(startTime),
        setTimeFormat(endTime),
        spaceId,
        getDateInYearFormat(date),
        getDateInYearFormat(new Date(Date.now())),
        userId,
        responsibleName,
        batchOption,
        -1
      );

      setAllReservations([...allReservations, res.data]);
      setShowFeedbackSuccess(true);
    } catch (error) {
      if (error.message === "reserved") {
        setShowFeedbackError(true);
      } else if (error.message === "email") {
        setShowFeedbackSuccess(true);
        updateReservations();
      } else {
        setShowFeedbackError(true);
      }
    }

    setTimeout(() => {
      setShowFeedbackError(false);
      setShowFeedbackSuccess(false);
      setIsModalOpen(false);
    }, 4000);
  };

  const handleWaiting = async (e) => {
    e.preventDefault();
    console.log('handleWaiting date:', date);
    try {
      const res = await createWaiting(
        title,
        setTimeFormat(startTime),
        setTimeFormat(endTime),
        spaceId,
        getDateInYearFormat(date),
        getDateInYearFormat(new Date(Date.now())),
        userId,
        responsibleName,
        batchOption,
        -1
      );

      setShowFeedbackWaiting(true);
      updateReservations();
    } catch (error) {
      if (error.message === "email") {
        setShowFeedbackWaiting(true);
        updateReservations();
      } else {
        setShowFeedbackError(true);
      }
    }

    setTimeout(() => {
      setShowFeedbackError(false);
      setShowFeedbackWaiting(false);
    }, 4000);
  };

  useEffect(() => {
    setIsDisable(
      !responsibleName ||
      !batchOption ||
      title === "" ||
      !mapTimeStringToInteger(startTime) ||
      !mapTimeStringToInteger(endTime) ||
      mapTimeStringToInteger(startTime) > mapTimeStringToInteger(endTime)
    );
  }, [responsibleName, batchOption, title, startTime, endTime]);

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
        <ResponsibleSelect setResponsibleName={setResponsibleName} />
        <BatchSelect setBatchOption={setBatchOption} />
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
          Error Occurred <br /> Please Try Again
        </p>
      </div>
    </div>
  );
};

export default AddEvent;

const ResponsibleSelect = ({ setResponsibleName }) => (
  <Select
    placeholder="Select a responsible person"
    options={reservationPersonOptions}
    onChange={(choice) => { setResponsibleName(choice.label) }}
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

const BatchSelect = ({ setBatchOption }) => (
  <Select
    placeholder="Select the batch"
    options={BatchOptions}
    onChange={(choice) => { setBatchOption(choice.label) }}
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