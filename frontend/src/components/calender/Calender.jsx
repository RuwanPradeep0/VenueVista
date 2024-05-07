import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from './Calender.module.scss'


const Calender = ({selectSpace,spaceReservations,selectedDays,selectSpaceName,startTime,endTime,updateReservations,}) => {
  
    const handleLeftClick = () =>{

    }

    const handleRightClick =() =>{
        
    }
  
  
  
  
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
      
    </div>
  )
}

export default Calender
