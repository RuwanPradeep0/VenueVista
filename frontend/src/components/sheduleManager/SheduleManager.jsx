import React, { useEffect, useRef, useState } from 'react'
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

  const [spaceReservations, setSpaceReservations] = useState([]);
  const [allSpaces, setAllSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [allReservations, setAllReservations] = useState([]);
  const [selectSpace, setSelectSpace] = useState(null);
  const [selectSpaceName, setSelectSpaceName] = useState("");
  const [isSpaceInfoOpen, setIsSpaceInfoOpen] = useState(false);

  const spaceInfoRef = useRef();

  const fetchInitialReservations = async () => {
    try {
      const response = await getAllReservations();
      setAllReservations(response.data);
    } catch (error) {
      console.error('Error fetching initial reservations:', error);
    }
  };
  
  async function getSpaces() {
    await getAllSpaces(setAllSpaces);
  }

  useEffect(() => {
    getSpaces();
    fetchInitialReservations();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsUserLoggedIn(!!user);
  }, []);

  useEffect(() => {
    if (allSpaces?.length !== 0) {
      const spacesWithRequiredFacilities = allSpaces?.filter(
        (space) =>
          space.capacity >= capacity[0] &&
          space.capacity >= capacity[1] &&
          selectedFacilities.every((facility) =>
            space.facilitiesList.includes(facility)
          )
      );

      setFilteredSpaces(spacesWithRequiredFacilities);

      if (spacesWithRequiredFacilities.length > 0 && !spacesWithRequiredFacilities.some(space => space.id === selectSpace)) {
        setSelectSpace(spacesWithRequiredFacilities[0].id);
        setSelectSpaceName(spacesWithRequiredFacilities[0].name);
      }
    }
  }, [allSpaces, capacity, selectedFacilities]);

  useEffect(() => {
    if (allReservations.length !== 0 && selectSpace) {
      const reservationsForSpace = allReservations.filter(
        (reservation) => reservation.spaceID === selectSpace
      );

      const filteredByBatch = selectedBatches.length > 0
        ? reservationsForSpace.filter(reservation => selectedBatches.includes(reservation.batch))
        : reservationsForSpace;

      setSpaceReservations(filteredByBatch);
    }
  }, [allReservations, selectSpace, selectedBatches]);

  useEffect(() => {
    let handler = (e) => {
      if (!spaceInfoRef.current.contains(e.target)) {
        setIsSpaceInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleSpaceClick = (id) => {
    if (selectSpace === id) {
      setIsSpaceInfoOpen(true);
    } else {
      setSelectSpace(id);
      const selectedSpace = allSpaces.find(space => space.id === id);
      setSelectSpaceName(selectedSpace.name);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <AvailableSpaces
          availableSpaces={filteredSpaces}
          handleClick={handleSpaceClick}
          select={selectSpace}
        />
        <Calender
          selectSpace={selectSpace}
          selectSpaceName={selectSpaceName}
          spaceReservations={spaceReservations}
          selectedDays={selectedDays}
          startTime={startTime}
          endTime={endTime}
          isUserLoggedIn={isUserLoggedIn}
          allReservations={allReservations}
          fetchInitialReservations={fetchInitialReservations}
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