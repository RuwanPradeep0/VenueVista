// src/AboutPage.js

import React from 'react';
import './About.scss';
import heroVideo from '../../video/VenueVista.mp4';
import image01 from '../../images/signin.png'
import image02 from '../../images/bookingpage.png'
import image03 from '../../images/bookhall.png'
import image04 from '../../images/waitingreservation.png'
import image05 from '../../images/addwaiting.png'
import image07 from '../../images/addhall.png'

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className='topic'>
        <div className='topic-text'>
        <h1>About VenueVista</h1> 
        </div>
      </section>
      <section className="hero-section">
        <div className="hero-text">
          
          <p>Introducing our Lecture Hall Management System for the Faculty of Engineering at the University of Jaffna. This innovative platform revolutionizes lecture hall management, providing a seamless experience for lecturers, course coordinators, and administrators. Designed to optimize resource allocation, reduce scheduling conflicts, and enhance overall efficiency, the system enables users to easily search, filter, and reserve lecture halls based on location, capacity, and availability. With intelligent conflict-checking capabilities, scheduling clashes are minimized, ensuring smooth operations. Users can access their booking history, manage upcoming reservations, and modify or cancel bookings as required. Featuring a user-friendly interface and robust administrative tools, our system streamlines operations, enhances resource utilization, and fosters academic success through effective communication and accessible information.</p>
        </div>
        <video className="hero-video" src={heroVideo} autoPlay loop muted />
      </section>

      <section className="key-features">
        <h2>Key Features</h2>
        <ul>
          <li>Real-time availability checking</li>
          <li>User-friendly booking interface</li>
          <li>Secure payment processing</li>
        </ul>
      </section>

      <section className="user-guide">
        <h2>User Guide</h2>

        <div className="guide-step">
          <div className="guide-text">
            <h3>1. User Registration or Login</h3>
            <p>
              Only Lecturers and instructor are permitted to register; students are not allowed.<br />
              Access to functionalities is granted only after successful login.<br />
              Authentication mechanisms such as username/password or two-factor authentication may be employed.
              
            </p>
          </div>
          <img src={image01} alt="User Registration" />
        </div>

        <div className="guide-step reverse">
          <div className="guide-text">
            <h3>2. View Reservation Calendar</h3>
            <p>
              Lecturers and possibly Students shall be able to view a calendar displaying booked and available time slots for lecture halls.<br />
              The calendar should provide an overview of reservations for efficient scheduling.
            </p>
          </div>
          <img src={image02} alt="View Reservation Calendar" />
        </div>

        <div className="guide-step reverse">
          <img src={image03} alt="Book Time Slots" />
          <div className="guide-text">
            <h3>3. Book Time Slots</h3>
            <p>
              Lecturers should be able to book available time slots for lecture halls.<br />
              The booking process should allow selection of date, time slot, and any necessary infrastructure requirements (e.g., projectors, whiteboards).
            </p>
          </div>
        </div>

        <div className="guide-step reverse">
          <div className="guide-text">
            <h3>4. Manage Reservation</h3>
            <p>
              Users who booked a time slot should be able to cancel reservations.<br />
              Upon cancellation, the system should notify users on the waiting list, if any, about the newly available time slot.
            </p>
          </div>
          <img src={image04} alt="Manage Reservation" />
        </div>

        <div className="guide-step reverse">
          <img src={image05} alt="Waiting List" />
          <div className="guide-text">
            <h3>5. Waiting List</h3>
            <p>
              Lecturers and possibly administrative staff should be able to view reservations on the waiting list.<br />
              The system should automatically notify users on the waiting list when a previously booked time slot becomes available.
            </p>
          </div>
        </div>

        <div className="guide-step reverse">

          <div className="guide-text">
            <h3>6. Filtering Facilities</h3>
            <p>
              Lecturers should be able to filter available time slots based on specific facilities and infrastructures required for their lecture (e.g., projector availability, seating capacity).
            </p>
          </div>
          <img src={image02} alt="Filtering Facilities" />
        </div>

        <div className="guide-step reverse">
          <img src={image07} alt="Adding/Updating Lecture Halls" />
          <div className="guide-text">
            <h3>7. Adding/Updating Lecture Halls</h3>
            <p>
              Only authorized administrative staff (e.g., MA) should be able to add or update lecture halls within the system.<br />
              This functionality includes adding new lecture halls, updating existing ones, and ensuring their availability for reservation.
            </p>
          </div>
        </div>

      </section>

      <section className="cta-section">
        <h2>Ready to simplify your venue bookings?</h2>
        <button className="cta-button">Sign Up</button>
      </section>

      <footer className="footer">
        <p>Have questions? Reach out to us at support@venuevista.com.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
