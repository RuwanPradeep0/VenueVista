import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {getDateInYearFormat , generateColorCode} from '../../utills'
import styles from './Calender.module.scss'


const Calender = ({selectSpace,spaceReservations,selectSpaceName,startTime,endTime,updateReservations,}) => {
  
 //calculate the upcoming dates and pass it into the Day component
 const [firstDate, setFirstDate] = useState(new Date());
 let dateList = []; //list containing date objects
 const selectedDays = [1, 2, 3, 4, 5]; //The user will select days, initially it'll be of weekdays. (0 - Sunday, 1 - Monday...etc)
 const today = new Date().setHours(0, 0, 0, 0); //Date object representing current Date

 //get the date object of the monday of this week.
 const firstMonday = new Date(
   new Date(firstDate).setDate(firstDate.getDate() - firstDate.getDay() + 1)
 );

 //populate the dateList. The datelist will have a maximum of 5 objects
 for (let i = 0; dateList.length < 5; i++) {
   const date = new Date(firstDate);

   //if the selectedDays is not weekdays, then don't start with a Monday.
   if (selectedDays.length > 5) date.setDate(firstDate.getDate() + i);
   //else if selectedDays are the weekdays or less, then start with a Monday
   else {
     const newDate = new Date(firstMonday);
     newDate.setDate(firstMonday.getDate() + i);
     date.setFullYear(newDate.getFullYear());
     date.setMonth(newDate.getMonth());
     date.setDate(newDate.getDate());
   }

   //if the day is in the selected list --> add to dateList else continue
   if (selectedDays.includes(date.getDay())) dateList.push(date);
 }

 const handleRightClick = () => {
   /*
     Handles the click event of the right controller.
     The maximum possible dates span in a range of 60 days. +30 from current date
   */
   const newDate = new Date(firstDate);

   //if SelectedDays are not weekdays then add 5 to current first date dateList[0]
   if (selectedDays.length > 5) newDate.setDate(newDate.getDate() + 5);
   //if selectedDats are the weekdats then, increment by a week.
   else newDate.setDate(newDate.getDate() + 7);

   //only allow clicking until +30 days from today
   if (Math.round((newDate - new Date()) / 86400000) < 30)
     setFirstDate(newDate);
 };

 const handleLeftClick = () => {
   /*
     handles the click event of the Left Controller
   */
   const newDate = new Date(firstMonday);
   //Similar to right controller
   if (selectedDays.length > 5) newDate.setDate(newDate.getDate() - 5);
   else newDate.setDate(newDate.getDate() - 7);

   //only allow navigating upto -30 days from today
   if (Math.round((new Date() - newDate) / 86400000) < 35)
     setFirstDate(newDate);
 };

 //get the start time and end time and populate an array for each hour interval
 const hourIntervals = Array.from(
   { length: endTime - startTime },
   (_, index) => index + startTime
 );

 //configuring the modals
 const portalEl = document.getElementById("portal");
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [coords, setCoords] = useState({
   left: 500,
   top: 200,
 });
 const modalRef = useRef();
 const [addEventStartTime, setAddEventStartTime] = useState(0);
 const [addEventEndTime, setAddEventEndTime] = useState(0);
 const [clickedDate, setClickedDate] = useState(null);
 const [isAddEventOrRes, setIsAddEventOrRes] = useState(true); //true if clicked on an slot, false is clicked on a reservation
 const [clickedReservation, setClickedReservation] = useState(null);
 //listen to a click event and close modal if an outside element is clicked.
 useEffect(() => {
   let handler = (e) => {
     if (
       e.target.id !== "slot" && //if the click is on another slot
       e.target.id !== "reservation" && //if the click is on a reservation
       !modalRef.current.contains(e.target) //if the click is on the modal
     ) {
       setIsModalOpen(false);
     }
   };
   document.addEventListener("mousedown", handler);

   return () => {
     document.removeEventListener("mousedown", handler);
   };
 });
 const handleSlotClick = (e, hour, date) => {
   if (e.currentTarget !== e.target) return;

   setIsModalOpen(true);
   setCoords(e.currentTarget.getBoundingClientRect());
   setAddEventStartTime(hour * 100);
   setAddEventEndTime(hour * 100 + 40);
   setIsAddEventOrRes(true);
   setClickedDate(date);
 };

 const handleReservationClick = (e, reservation) => {
   setIsModalOpen(true);
   setIsAddEventOrRes(false);
   setClickedReservation(reservation);
   setCoords(e.currentTarget.getBoundingClientRect());
 };

 const handleAddWaitingClick = (e) => {
   setIsAddEventOrRes(true);
   setAddEventStartTime(clickedReservation.startTime);
   setAddEventEndTime(clickedReservation.endTime);
   setClickedDate(new Date(clickedReservation.date));
 };
  
    return (

    <div className={styles.container}>
        <div className={styles.controller}>
        <button className={styles.icon} onClick={handleLeftClick}>
          <FaChevronLeft />
        </button>

        <button className={styles.icon} onClick={handleRightClick}>
          <FaChevronRight />
        </button>

        </div>

        <div className={styles.calendar}>
        {dateList.map((date) => (
          <Day
            key={date}
            dateObj={date}
            isToday={date.setHours(0, 0, 0, 0) === today}
            hourIntervals={hourIntervals}

            dayReservations={spaceReservations.filter(
              (reservation) => reservation.date === getDateInYearFormat(date)
            )}

            startTime={startTime}
            handleSlotClick={handleSlotClick}
            handleReservationClick={handleReservationClick}
          />
        ))}

        <TimeColumn hours={hourIntervals} />
      </div>

      {/* <Modal
        modalRef={modalRef}
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        rect={coords}
      >
        {isAddEventOrRes ? (
          <AddEvent
            startTimeProp={addEventStartTime}
            endTimeProp={addEventEndTime}
            spaceId={selectSpace}
            spaceName={selectSpaceName}
            date={clickedDate}
            spaceReservations={spaceReservations}
            updateReservations={updateReservations}
          />
        ) : (
          <ReservationInfo
            reservation={clickedReservation}
            onClick={handleAddWaitingClick}
          />
        )}
      </Modal> */}
      
    </div>
  )
}

export default Calender






const Day = ({
    dateObj,
    hourIntervals,
    dayReservations,
    isToday,
    handleSlotClick,
    handleReservationClick,
  }) => {
    /*
      A Day column in the calendar
  
      Args:
      dateObj: the date object representing the Day column
      hourIntervals: Selected hour slots
      dayReservations: All reservations in the selected space for this date
      isToday: if the day represented is today
    */
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      dateObj
    );
  
    //check if there are reservations which started before the first interval, but continues after that.
    //todo: APPROACH: Pass this to the first slot set the height to match the time from the first interval to the endTime
    const prevReservations = dayReservations.filter(
      (reservation) =>
        reservation.startTime < hourIntervals[0] * 100 &&
        reservation.endTime > hourIntervals[0] * 100
    );
    const Time =() =>{

    }


  
    return (
      <div className={styles.day}>
        <div className={`${styles.date} ${isToday ? styles.today : " "}`}>
          <h4>{dateObj.getDate()}</h4>
          <p>{dayName.toUpperCase()}</p>
        </div>
        {hourIntervals.map((hour) => (
          <Slot
            key={`${dateObj.getDate()}-${hour}`}
            slotReservations={dayReservations.filter(
              (reservation) => Math.floor(reservation.startTime / 100) === hour
            )}
            handleSlotClick={handleSlotClick}
            hour={hour}
            date={dateObj}
            handleResevationClick={handleReservationClick}
          />
        ))}
      </div>
    );
  };

  const Slot = ({
    slotReservations,
    handleSlotClick,
    handleResevationClick,
    hour,
    date,
  }) => {
    return (
      //TODO: Add Tab Navigation -- Conflict of erronous clicks
  
      <div
        className={styles.slot}
        onClick={(e) => handleSlotClick(e, hour, date)}
        id="slot"
      >
        {slotReservations.map((reservation) => {
          const minutes =
            (Math.floor(reservation.endTime / 100) -
              Math.floor(reservation.startTime / 100)) *
              60 +
            ((reservation.endTime % 100) - (reservation.startTime % 100));
          return (
            <button
              key={reservation.startTime}
              className={styles.reservation}
              style={{
                height: `${(minutes / 60) * 100}%`,
                top: `${((reservation.startTime % 100) / 60) * 100}%`,
                // backgroundColor: `${generateColorCode(
                //   reservation.reservedBy[0]
                // )}`,
              }}
              id="reservation"
              onClick={(e) => handleResevationClick(e, reservation)}
            >
              {reservation.title}
            </button>
          );
        })}
      </div>
    );
  };
  
  const TimeColumn = ({ hours }) => {
    const hourStrings = hours.map((hour) => {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(`2000-01-01T${hour.toString().padStart(2, "0")}:00`));
    });
  
    return (
      <div className={styles.timeCol}>
        {hourStrings.map((hour) => (
          <div className={styles.hour} key={hour}>
            {hour}
          </div>
        ))}
      </div>
    );
  };
  
