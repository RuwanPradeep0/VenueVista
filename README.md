
# Lecture Hall Booking System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

## Introduction

The Lecture Hall Booking System is designed to streamline the process of reserving lecture halls at the Faculty of Engineering, University of Jaffna. The system aims to reduce scheduling conflicts, enhance resource utilization, and provide a seamless experience for lecturers, instructors, and administrators.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture & Design Principles](#architecture--design-principles)
- [User Roles and Stories](#user-roles-and-stories)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Security Measures](#security-measures)
- [Performance Considerations](#performance-considerations)
- [Deployment and DevOps](#deployment-and-devops)
- [Contributing](#contributing)
- [License](#license)
- [Wiki](#wiki)

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

Detailed API documentation can be found [here](./API_DOCUMENTATION.md).

## Security Measures

- **Data Protection**: All sensitive data, such as passwords, are encrypted using SHA-256.
- **Access Control**: Implemented using Spring Security with role-based access control (RBAC).
- **Audit Logging**: All user activities are logged with timestamps.

## Performance Considerations

- **Scalability**: Supports horizontal scaling with load balancers.
- **Caching**: Uses Redis to cache frequently accessed data.
- **Performance Testing**: Conducted using JMeter.

## Deployment and DevOps

- **Infrastructure as Code**: Uses AWS CloudFormation.
- **Containerization**: Utilizes Docker for consistent deployment.
- **CI/CD**: Integrated with GitHub Actions for automated testing and deployment.

## Contributing

Contributions are welcome! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Wiki

For detailed documentation, including architecture diagrams, use cases, and more, visit our [Wiki](https://github.com/your-repo/lecture-hall-booking-system/wiki).
