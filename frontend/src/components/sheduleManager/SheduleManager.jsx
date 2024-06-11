import React ,{ useEffect, useRef, useState } from 'react'
import Calender from '../calender/Calender'
import AvailableSpaces from '../availableSpaces/AvailableSpaces'
import {getAllSpaces} from '../../services/SpaceService'
import {getAllReservations} from '../../services/ReservationService'

import { MdClose } from "react-icons/md";
import classNames from "classnames";


import styles from './SheduleManager.module.scss'

const SheduleManager = ({
    selectedDays,
    startTime,
    endTime,
    capacity,
    selectedFacilities,
    selectedBatches}) => {

  //filter reservations according to the space selected - default - 1
  // const [reservations, setReservations] = useState([]);
  const [spaceReservations, setSpaceReservations] = useState([]);
  const [allSpaces, setAllSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [allReservations, setAllReservations] = useState([]);

  const fetchInitialReservations = async () => {
    try {
      const response = await getAllReservations();
      setAllReservations(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching initial reservations:', error);
    }
  };
  
 //01
  async function getSpaces() {
    await getAllSpaces(setAllSpaces);
  }

    //initially fetching the data
    useEffect(() => {
      getSpaces();
      fetchInitialReservations();
    }, []);

    // Get the user from localStorage on component mount
    useEffect(() => {
      const user = localStorage.getItem('user');
      setIsUserLoggedIn(!!user); // Set isUserLoggedIn to true if user exists, false otherwise
    }, []);

  useEffect(() => {
    if (allReservations.length !== 0) {
      setSpaceReservations(
        allReservations.filter((reservation) => reservation.spaceID === selectSpace)
      );
    }
  }, [allReservations]);

  useEffect(() => {
    if (allReservations.length !== 0) {
      setSpaceReservations(
        allReservations.filter((reservation) => reservation.spaceID === selectSpace)
      );
    }
  }, []);

  //02

   //whenever the capacity change, change the displayed spaces using the filteredSpaces state
   useEffect(() => {
    if (allSpaces?.length !== 0) {
      setFilteredSpaces(
        allSpaces?.filter(
          (space) =>
            space.capacity >= capacity[1] &&
            space.capacity >= capacity[0] &&
            selectedFacilities.every((facility) =>
              space.facilitiesList.includes(facility)
            )
        )
      );
    }
  }, [allSpaces, capacity, selectedFacilities]);

  //This is for special cases, if the already selected space if filtered out
  //or if there are no matching spaces available
  useEffect(() => {
    if (filteredSpaces.length !== 0) {
      setSelectSpace(filteredSpaces[0].id);
      setSelectSpaceName(filteredSpaces[0].name);
      setSpaceReservations(
        allReservations.filter(
          (reservation) => reservation.spaceId === selectSpace
        )
      );
    } else if (filteredSpaces.length === 0) {
      setSpaceReservations([]);
    }
  }, [filteredSpaces]);

  




  //Available Spaces Selection
  const [selectSpace, setSelectSpace] = useState(1);
  const [isSpaceInfoOpen, setIsSpaceInfoOpen] = useState(false);

  const spaceInfoRef = useRef();
  //close space when clicked outside
  useEffect(() => {
    let handler = (e) => {
      if (
        !spaceInfoRef.current.contains(e.target) //if the click is on the modal
      ) {
        setIsSpaceInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleSpaceClick = (id) => {
    //if already selected, then show more details on the space
    if (selectSpace === id) {
      setIsSpaceInfoOpen(true);
    } else {
      setSelectSpace(id);
      setSpaceReservations(
        allReservations.filter((reservation) => reservation.spaceID === id)
      );
    }
  };

  //pass down the space name to the addEvent prop
  const [selectSpaceName, setSelectSpaceName] = useState(" ");
  useEffect(() => {
    try {
      setSelectSpaceName(allSpaces?.find((s) => s.id === selectSpace).name);
      setSpaceReservations(
        allReservations.filter(
          (reservation) => reservation.spaceID === selectSpace
        )
      );
    } catch (error) {
      //pass
      //When it first renders, there won't be any spaces.
      //so spaces.find will return nothing.
    }
  }, [selectSpace]);

  useEffect(() => {
    if (allReservations.length !== 0) {
      // Filter reservations based on the selected space and facilities
      const filteredReservations = allReservations.filter((reservation) => {
        const matchesSpaceAndFacilities =
          reservation.spaceID === selectSpace &&
          selectedFacilities.every((facility) =>
            reservation.facilitiesList.includes(facility)
          );
  
        // If selectedBatches is not empty, also filter by batch
        if (selectedBatches.length > 0) {
          return matchesSpaceAndFacilities && selectedBatches.includes(reservation.batch);
        }
  
        // If selectedBatches is empty, just match space and facilities
        return matchesSpaceAndFacilities;
      });
  
      // Check if the selected space is present in the filtered spaces
      const isSelectedSpaceFiltered = filteredSpaces.some(
        (space) => space.id === selectSpace
      );
  
      if (isSelectedSpaceFiltered) {
        // If the selected space is present in the filtered spaces, set the spaceReservations
        setSpaceReservations(filteredReservations);
      } else {
        // If the selected space is not present in the filtered spaces, clear the spaceReservations
        setSpaceReservations([]);
      }
    }
  }, [allReservations, selectSpace, filteredSpaces, selectedFacilities, selectedBatches]);
  


  return (
    <>
      <div className={styles.container}>
        <AvailableSpaces
          availableSpaces={filteredSpaces}
          handleClick={handleSpaceClick}
          select={selectSpace}
        />
        <Calender
          // prevReservations={reservations}
          selectSpace={selectSpace}
          selectSpaceName={selectSpaceName}
          spaceReservations={spaceReservations}
          selectedDays={selectedDays}
          startTime={startTime}
          endTime={endTime}
          // updateReservations={getReservations}
          isUserLoggedIn={isUserLoggedIn}
          allReservations={allReservations}
          fetchInitialReservations ={fetchInitialReservations}
          setAllReservations={setAllReservations}
        />
      </div>

      <div
        className={classNames(
          styles.overlay,
          isSpaceInfoOpen && styles.showOverlay
        )}
      ></div>
      <div
        className={classNames(
          styles.spaceInfoContainer,
          isSpaceInfoOpen && styles.open
        )}
        ref={spaceInfoRef}
      >
        <button onClick={() => setIsSpaceInfoOpen(false)}>
          <MdClose /> Close
        </button>

        {isSpaceInfoOpen && (
          <>
            <div className={styles.spaceTitle}>
              {filteredSpaces.find((space) => space.id === selectSpace).name}
            </div>
            <p className={styles.spaceInfoDescription}>
              {
                filteredSpaces.find((space) => space.id === selectSpace)
                  .description
              }
            </p>
            <div className={styles.capacity}>
              <span>Capacity:</span>
              {
                filteredSpaces.find((space) => space.id === selectSpace)
                  .capacity
              }
            </div>

            <div className={styles.facilities}>
              <span>Facilities:</span>
              {filteredSpaces
                .find((space) => space.id === selectSpace)
                .facilitiesList.join(", ")}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SheduleManager
