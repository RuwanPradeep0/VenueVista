
# Lecture Hall Booking System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture & Design Principles](#architecture--design-principles)
- [Diagrammatic Representation](#diagrammatic-representation)
- [User Roles and Stories](#user-roles-and-stories)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Security Measures](#security-measures)
- [Wiki](#wiki)


## Introduction

Introducing our Lecture Hall Management System for the Faculty of Engineering at the University of Jaffna. This innovative platform revolutionizes the management of lecture halls, providing a seamless experience for lecturers, course coordinators, and administrators. Our system aims to optimize resource allocation, reduce scheduling conflicts, and enhance overall efficiency within the academic environment.

The Lecture Hall Booking System enables lecturers and course coordinators to easily search, filter, and reserve lecture halls based on location, capacity, and availability. With intelligent conflict-checking capabilities, scheduling clashes are minimized, ensuring smooth operations. Users have access to their booking history, upcoming reservations, and the ability to modify or cancel bookings as required.

Featuring a user-friendly interface and robust administrative tools, our system streamlines operations and enhances resource utilization. Effective communication channels and accessible information empower the University of Jaffna to optimize lecture scheduling and foster academic success.

![VenueVista](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/Images/HomePage.png)


![VenueVista](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/Images/ManageReservations.png)


![VenueVista](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/Images/ManageWaitings.png)

## Features

- **User Authentication**: Secure login and registration for users with role-based access control.
- **Lecture Hall Management**: Add, update, and manage lecture hall details.
- **Booking System**: Create, view, and cancel reservations for lecture halls.
- **Waiting List**: Manage waiting lists for booked lecture halls.
- **Calendar View**: Visual representation of booked and available time slots.
- **Notifications**: Email notifications for booking confirmations and cancellations.

## Architecture & Design Principles

- **Client-Server Architecture**: Utilizes a client-server model with a React.js front end and a Spring Boot back end.
- **Modularity**: Divided into modules such as space service, reservation service, waiting service, and email service.
- **Security**: Implements secure authentication mechanisms using Spring OAuth 2.0 and HTTPS for secure communication.
- **Scalability**: Designed to handle increasing numbers of users and bookings with support for horizontal scaling.
- **Reliability**: Ensures high availability and robust error handling to maintain data integrity and system uptime.

## Diagrammatic Representation
### ER DIAGRAM 

![Venue_ERD](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/Images/ER_Diagram.png)

### USER FLOW CHART 

![Venue_UFC](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/Images/UserFlowChart.png)

## User Roles and Stories

### Lecturer
- **Book a lecture hall**: Reserve a lecture hall for classes.
- **View bookings**: See booked and available time slots.
- **Cancel reservations**: Cancel bookings if plans change.

### Administrator (MA)
- **Manage lecture halls**: Add and update lecture hall details.
- **View and manage all bookings**: Resolve conflicts and optimize usage.

### Student
- **View lecture hall schedule**: Check the schedule to attend classes.

## System Requirements

- **Frontend**: Node.js, React.js
- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Tools**: VS Code, MySQL Workbench, Postman, Swagger UI

## Installation

### Prerequisites

- Node.js (>= 14.x)
- Java (>= 11)
- MySQL (>= 8.x)
- Docker (optional, for containerization)

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/lecture-hall-booking-system.git
    cd lecture-hall-booking-system
    ```

2. **Backend Setup**:
    ```sh
    cd backend
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

3. **Frontend Setup**:
    ```sh
    cd frontend
    npm install
    npm start
    ```

4. **Database Setup**:
    - Import the provided SQL scripts in `database` directory to set up the MySQL database.

## Usage

1. **Register** as a lecturer or student.
2. **Login** to the system.
3. **Navigate** to the booking calendar.
4. **Book** or **cancel** a lecture hall.
5. **View** and **manage** reservations.

## API Documentation

Detailed API documentation can be found [here](https://github.com/RuwanPradeep0/VenueVista/wiki/Technical-Documentation#api-documentation).

## Security Measures

- **Data Protection**: All sensitive data, such as passwords, are encrypted using SHA-256.
- **Access Control**: Implemented using Spring Security with role-based access control (RBAC).
- **Audit Logging**: All user activities are logged with timestamps.

## Wiki

For detailed documentation, including architecture diagrams, use cases, and more, visit our [Wiki](https://github.com/RuwanPradeep0/VenueVista/wiki).

[Download the project documentation PDF](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/PROJECT_DOCUMENTATION%20-%20Lecture%20Hall%20Booking%20System.pdf)

[Download the technical documentation PDF](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/TECHNICAL%20DOCUMENTATION-Lecture%20hall%20booking%20system.pdf)

[Download the user manual  PDF](https://github.com/RuwanPradeep0/VenueVista/blob/main/docs/VENUEVISTA%20user%20Guide.pdf)
