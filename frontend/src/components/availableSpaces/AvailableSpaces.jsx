import React from 'react'
import styles from './AvailableSpaces.module.scss'
import { FaChevronCircleRight } from "react-icons/fa";



const AvailableSpaces = ({ availableSpaces, handleClick, select }) => {
  return (
    <div className={styles.AvailableSpaces}>
    <h3 className={styles.heading}>Available Spaces</h3>
    <div className={styles.SpaceContainer}>
      {availableSpaces.map((space) => {
        return (
          <Space
            key={space?.id}
            space={space}
            select={select}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  </div>
  )
}



const Space = ({ space, select, handleClick }) => {
    return (
      <button
        id={space?.id}
        className={select === space?.id ? styles.SpaceSelected : styles.Space}
        onClick={() => handleClick(space.id)}
      >
        <div className={styles.name}>
          <h4>
            {space?.name}{" "}
            {select === space?.id && (
              <FaChevronCircleRight className={styles.icon} />
            )}
          </h4>
          <p>{space?.location}</p>
        </div>
      </button>
    );
  };
  
  export default AvailableSpaces;
  