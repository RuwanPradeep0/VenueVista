// src/AboutPage.js

import React, { useState } from 'react';
import './About.scss';
import heroVideo from '../../video/VenueVista.mp4';
import image01 from '../../images/signin.png'
import image02 from '../../images/bookingpage.png'
import image03 from '../../images/bookhall.png'
import image04 from '../../images/waitingreservation.png'
import image05 from '../../images/addwaiting.png'
import image07 from '../../images/addhall.png'


const AboutPage = () => {

  const [visibleStep, setVisibleStep] = useState(null);

  const toggleVisibility = (step) => {
    setVisibleStep(visibleStep === step ? null : step);
  };

  const steps = [
    {
      title: 'User Registration or Login',
      content: 'Only Lecturers and instructors are permitted to register; students are not allowed.<br />Access to functionalities is granted only after successful login.<br />Authentication mechanisms such as username/password or two-factor authentication may be employed.',
      image: image01,
      alt: 'User Registration'
    },
    {
      title: 'View Reservation Calendar',
      content: 'Lecturers and possibly Students shall be able to view a calendar displaying booked and available time slots for lecture halls.<br />The calendar should provide an overview of reservations for efficient scheduling.',
      image: image02,
      alt: 'View Reservation Calendar'
    },
    {
      title: 'Book Time Slots',
      content: 'Lecturers should be able to book available time slots for lecture halls.<br />The booking process should allow selection of date, time slot, and any necessary infrastructure requirements (e.g., projectors, whiteboards).',
      image: image03,
      alt: 'Book Time Slots'
    },
    {
      title: 'Manage Reservation',
      content: 'Users who booked a time slot should be able to cancel reservations.<br />Upon cancellation, the system should notify users on the waiting list, if any, about the newly available time slot.',
      image: image04,
      alt: 'Manage Reservation'
    },
    {
      title: 'Waiting List',
      content: 'Lecturers and possibly administrative staff should be able to view reservations on the waiting list.<br />The system should automatically notify users on the waiting list when a previously booked time slot becomes available.',
      image: image05,
      alt: 'Waiting List'
    },
    {
      title: 'Filtering Facilities',
      content: 'Lecturers should be able to filter available time slots based on specific facilities and infrastructures required for their lecture (e.g., projector availability, seating capacity).',
      image: image02,
      alt: 'Filtering Facilities'
    },
    {
      title: 'Adding/Updating Lecture Halls',
      content: 'Only authorized administrative staff (e.g., MA) should be able to add or update lecture halls within the system.<br />This functionality includes adding new lecture halls, updating existing ones, and ensuring their availability for reservation.',
      image: image07,
      alt: 'Adding/Updating Lecture Halls'
    }
  ];


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

      <section className="user-guide">
      <h2>User Guide</h2>
      {steps.map((step, index) => (
        <div key={index} className={`guide-step`}>
          <img src={step.image} alt={step.alt} />
          <div className="guide-text">
            <h3 onClick={() => toggleVisibility(index)}>
              {step.title}
              <span className={`arrow ${visibleStep === index ? 'up' : 'down'}`}>
                {visibleStep === index ? '▲' : '▼'}
              </span>
            </h3>
            {visibleStep === index && (
              <div className="step-content">
                {step.content.split('\n').map((content, contentIndex) => (
                  <p key={contentIndex} className="description-box" dangerouslySetInnerHTML={{ __html: content }}></p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
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
