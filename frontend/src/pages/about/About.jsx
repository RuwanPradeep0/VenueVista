import React, { useState } from 'react';
import './About.scss';
import heroVideo from '../../video/VenueVista.mp4';
import image01 from '../../images/signin.png'
import image02 from '../../images/bookingpage.png'
import image03 from '../../images/bookhall.png'
import image04 from '../../images/waitingreservation.png'
import image05 from '../../images/addwaiting.png'
import image06 from '../../images/filtering.png'
import image07 from '../../images/addhall.png'
import { IoIosArrowDown } from "react-icons/io";
import Hero from '../../components/Hero';


const About = () => {

  const [visibleStep, setVisibleStep] = useState(null);


const toggleVisibility = (index) => {
  setVisibleStep(visibleStep === index ? null : index);
};

  const steps = [
    {
      title: 'User Registration or Login',
      steps: [
        'Only Lecturers and instructors are permitted to register but Students are not allowed.',
        'Access to functionalities is granted only after successful login.',
        'Authentication mechanisms such as username/password or two-factor authentication may be employed.',
      ],
      image: image01,
      alt: 'User Registration',
    },
    {
      title: 'View Reservation Calendar',
      steps:[ 'Lecturers and possibly Students shall be able to view a calendar displaying booked and available time slots for lecture halls.',
             'The calendar should provide an overview of reservations for efficient scheduling.',
      ],
      image: image02,
      alt: 'View Reservation Calendar',
    },
    {
      title: 'Book Time Slots',
      steps: ['Lecturers should be able to book available time slots for lecture halls.',
        'The booking process should allow selection of date, time slot, and any necessary infrastructure requirements.',],
      image: image03,
      alt: 'Book Time Slots',
    },
    {
      title: 'Manage Reservation',
      steps: ['Users who booked a time slot should be able to cancel reservations.',
        'Upon cancellation, the system should notify users on the waiting list, if any, about the newly available time slot.',],
      image: image04,
      alt: 'Manage Reservation',
    },
    {
      title: 'Waiting List',
      steps: ['Lecturers and possibly administrative staff should be able to view reservations on the waiting list.',
        'The system should automatically notify users on the waiting list when a previously booked time slot becomes available.',],
      image: image05,
      alt: 'Waiting List',
    },
    {
      title: 'Filtering Facilities',
      steps: 'Lecturers should be able to filter available time slots based on specific facilities and infrastructures required for their lecture (e.g., projector availability, seating capacity).',
      image: image02,
      alt: 'Filtering Facilities',
    },
    {
      title: 'Adding/Updating Lecture Halls',
      steps: ['Only authorized administrative staff (e.g., MA) should be able to add or update lecture halls within the system.',
        'This functionality includes adding new lecture halls, updating existing ones, and ensuring their availability for reservation.',],
      image: image07,
      alt: 'Adding/Updating Lecture Halls',
    },
  ];
  
  return (

    <div>
        <Hero
                spanText="About"
                title="VenueVista"
                description="Effortlessly Book and Manage Lecture Halls with Ease."
            />

<div className="about-page">
      
      <section className="hero-section">
        <div className="hero-text">
          
          <p>Introducing our Lecture Hall Management System for the Faculty of Engineering at the University of Jaffna. This innovative platform revolutionizes lecture hall management, providing a seamless experience for lecturers, course coordinators, and administrators. Designed to optimize resource allocation, reduce scheduling conflicts, and enhance overall efficiency, the system enables users to easily search, filter, and reserve lecture halls based on location, capacity, and availability. With intelligent conflict-checking capabilities, scheduling clashes are minimized, ensuring smooth operations. Users can access their booking history, manage upcoming reservations, and modify or cancel bookings as required. Featuring a user-friendly interface and robust administrative tools, our system streamlines operations, enhances resource utilization, and fosters academic success through effective communication and accessible information.</p>
        </div>
        <video className="hero-video" src={heroVideo} autoPlay loop muted />
      </section>

      <section className="user-guide">
      <h2>User Guide</h2>
      {steps.map((step, index) => (
        <div key={index} className="guide-step">
          <img src={step.image} alt={step.alt} className="guide-image" />
          <div className="guide-text">
            <div className="text-container">
              <h3 onClick={() => toggleVisibility(index)}>
                {step.title}
                <span className={`arrow ${visibleStep === index ? 'up' : 'down'}`}>
                  <IoIosArrowDown className={visibleStep === index ? 'rotate-up' : 'rotate-down'} />
                </span>
              </h3>
              {visibleStep === index && (
                <div className="step-content">
                  {step.steps.map((content, contentIndex) => (
                    <p key={contentIndex} className="description-box">
                      {content}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>

   

    <footer className="footer">
    <p>&copy; 2024 VenueVista. All rights reserved.</p>
    <p>Contact us at:venuevista@eng.jfn.ac.lk</p>
    <p>Phone: (+94) 36456-7890</p>
</footer>
    </div>
    </div>
   
  );
};


export default About;