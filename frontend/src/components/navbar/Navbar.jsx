import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import logo from '../../images/logo.png'
import styles from './Navbar.module.scss';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = ({user}) => {
  const [userName, setUserName] = useState('');
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username } = JSON.parse(storedUser);
      setUserName(username);
    }

    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavContainer}>
        <div className={styles.NavLogoContainer}>
          <img className={styles.NavLogo} src={logo} alt='logo' />
          <div>
            <p>Faculty Of Engineering</p>
            <p>University Of jaffna</p>
          </div>
        </div>

        {isNavShowing && (
          <ul className={styles.NavLinks}>
            <li className={styles.NavLink} title="Home">
              <NavLink exact={true} to="/" className={({ isActive }) => isActive && styles.active} onClick={closeNavHandler}>
                Home
              </NavLink>
            </li>

            {userName && (
              <li className={styles.NavLink} title="Manage Reservations">
                <NavLink to="/ManageReservations" className={({ isActive }) => isActive && styles.active} onClick={closeNavHandler}>
                  Manage Reservations
                </NavLink>
              </li>
            )}

            <li className={styles.NavLink} title="Manage Spaces">
              <NavLink exact={true} to="/spaces" className={({ isActive }) => isActive && styles.active} onClick={closeNavHandler}>
                Manage Spaces
              </NavLink>
            </li>

            {userName && <li className={styles.GeneralText}>{userName}</li>}
            
            {userName ? (
              <li className={styles.NavLink}>
                Log Out
              </li>
            ) : (
              <li className={styles.NavLink}>
                <NavLink to="/signin" className={({ isActive }) => isActive && styles.active} onClick={closeNavHandler}>
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        )}

        <button className={styles.NavToggleBtn} onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar