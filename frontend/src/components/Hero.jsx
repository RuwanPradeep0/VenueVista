import React from 'react'
import styles from '../styles/Hero.module.scss'

const Hero = ({ title, description, children, spanText }) => {
  return (
    <div>
      <div className={styles.Hero}>
      <h1>
        <span>{spanText}</span>
        {title}
      </h1>
      <p>{description}</p>
      {children}
    </div>
    </div>
  )
}

export default Hero
