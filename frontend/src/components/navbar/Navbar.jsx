import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../images/logo.png';
import styles from './Navbar.module.scss';

const Navbar = ({ user }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username, role } = JSON.parse(storedUser);
      setUserName(username);
      setUserRole(role);
    }
  }, [location]);

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.NavLogoContainer}>
          <img className={styles.NavLogo} src={logo} alt='logo' />

          <div>
            <p>Faculty Of Engineering</p>
            <p>University Of Jaffna</p>
          </div>

          <ul className={styles.NavLinks}>
            <li className={styles.NavLink} title="Home">
              <NavLink exact={true} to="/" className={({ isActive }) => isActive && styles.active}>
                Home
              </NavLink>
            </li>

            {/* Manage Reservations Should Only be Visible if the user is logged in */}
            {userName && (
              <li className={styles.NavLink} title="Manage Reservations">
                <NavLink to="/ManageReservations" className={({ isActive }) => isActive && styles.active}>
                  Manage Reservations
                </NavLink>
              </li>
            )}

            {/* Manage Spaces Should Only be Visible if the user is logged in and has role 'MA' */}
            {userName && userRole === 'MA' && (
              <li className={styles.NavLink} title="Manage Spaces">
                <NavLink exact={true} to="/spaces" className={({ isActive }) => isActive && styles.active}>
                  Manage Spaces
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div>
          <ul className={styles.NavLinks}>
            {userName && <li className={styles.GeneralText}>{userName}</li>}
            {
              userName ? (
                <li className={styles.NavLink}>
                  Log Out
                </li>
              ) : (
                <li className={styles.NavLink}>
                  <NavLink to="/signin" className={({ isActive }) => isActive && styles.active}>
                    Sign In
                  </NavLink>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
