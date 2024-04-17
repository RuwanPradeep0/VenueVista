import React from 'react'
import { NavLink } from "react-router-dom";

import logo from '../images/logo.png'
import styles from '../styles/Navbar.module.scss';


const Navbar = ({user}) => {
  return (
    <>
    <div className={styles.Navbar}>
        <div className={styles.NavLogoContainer}>
            <img className={styles.NavLogo} src={logo} alt='logo' />

            <div>
            <p>Faculty Of Engineering</p>
            <p>University Of jaffna</p>
        </div>

           
           
            <ul className={styles.NavLinks}>
                <li className={styles.NavLink} title="Home">

              <NavLink exact={true} to="/" className={({ isActive }) => isActive && styles.active}>
                Home
              </NavLink>
            </li>


               {/* Manage Reservations Should Only be Visible if the user is logged in */}
          {user && (
            <li className={styles.NavLink} title="Manage Reservations">
              <NavLink to="/ManageReservations" className={({ isActive }) => isActive && styles.active}>
                Manage Reservations
              </NavLink>
            </li>
          )}
       
            </ul>

            

        </div>
        <div>
                <ul className={styles.NavLinks}>
                    <li className={styles.GeneralText}>Email</li>
                    {
                        user ? (
                            <li className={styles.NavLink}>
                                Log Out
                            </li>
                        ) : (
                            <li className={styles.NavLink}>
                                <NavLink>
                                    Sign In
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
                
            </div>


    </div>
    
    
    </>
  )
}

export default Navbar
