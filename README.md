# booking-ingestion

Booking Data Ingestion System

# Booking Data Ingestion System

This project is a Node.js application built with Express and PostgreSQL. It provides APIs for managing bookings, including creating, searching, and deleting bookings.

## Table of Contents

- [Features](#features)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
    - [POST /bookings](#post-bookings)
    - [GET /bookings](#get-bookings)
    - [GET /booking?booking_uid={id}](#get-bookingbooking_uidid)
    - [DELETE /booking?booking_uid={id}](#delete-bookingbooking_uidid)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
  - [Scalability](#scalability)
  - [Error Handling](#error-handling)
  - [Security](#security)
  - [Compliance](#compliance)
- [Sequential Diagram](#sequential-diagram)
- [License](#license)

## Features

- Create, get, search, and delete bookings
- Validate booking data using Joi
- Use TypeORM for database interactions
- Modular architecture with controllers, services, and repositories

## Deployment

To deploy this application, follow the setup instructions and run the application in production mode.

The application is deployed on `Render` and uses Docker for containerization.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker
- PostgreSQL database

### Setup

1. Clone the repository:
   `git clone <repository-url>`
   `cd booking-ingestion`

2. Install dependencies:
   `npm install`

# Running the Application

To run the application:
`npm start`

## API Documentation

Local - http://localhost:7000
Deployment - https://booking-ingestion.onrender.com

### Endpoints

# POST /bookings

    Create a new booking
        Request Body: IAddBookingRequest
        Response: 201 Created with the created booking

# Example Request

{
"booking_uid": "12345",
"customer_name": "Fargath",
"booking_date": "2025-01-13T18:30:00.000Z",
"amount": 2400,
"vendor": "Indigo"
}

# Example Response -

{
"booking_id": "2a31f743-787d-4fe1-8f0a-1caba240490a",
"booking_uid": "12345",
"customer_name": "Fargath",
"booking_date": "2025-01-13T18:30:00.000Z",
"amount": 2400,
"vendor": "Indigo",
"created_at": "2025-01-14T14:31:36.139Z",
"updated_at": null
}

# GET /bookings

    Get a list of bookings
        Response: 200 OK with a list of bookings

# Example Response

[
{
"booking_id": "2a09f753a-ba240-aba24-709d-0874fe122",
"booking_uid": "123456",
"customer_name": "Fargath",
"booking_date": "2025-01-12T18:30:00.000Z",
"amount": 2400,
"vendor": "Indigo",
"created_at": "2025-01-14T15:14:29.501Z",
"updated_at": null
},
{
"booking_id": "2a31f743-787d-4fe1-8f0a-1caba240490a",
"booking_uid": "12345",
"customer_name": "Fargath",
"booking_date": "2025-01-13T18:30:00.000Z",
"amount": 2400,
"vendor": "Indigo",
"created_at": "2025-01-14T14:31:36.139Z",
"updated_at": null
}
]

# GET /booking?booking_uid={id}

    Get a single booking by ID
    Response: 200 OK with the booking details

# Example Response

{
"booking_id": "2a31f743-787d-4fe1-8f0a-1caba240490a",
"booking_uid": "12345",
"customer_name": "Fargath",
"booking_date": "2025-01-13T18:30:00.000Z",
"amount": 2400,
"vendor": "Indigo",
"created_at": "2025-01-14T14:31:36.139Z",
"updated_at": null
}

# DELETE /booking?booking_uid={id}

    Get a single booking by ID
    Response: 200 OK with the Removal success message

# Example Response

{
"status": "success",
"message": "Booking removed successfully!!"
}

### Project Structure

booking-ingestion/
├── src/
│ ├── controllers/
│ │ ├── base-controller.controller.ts
│ │ ├── booking.controller.ts
│ │ ├── controller-factory.controller.ts
│ ├── models/
│ │ ├── common.model.ts
│ │ ├── booking.model.ts
│ ├── repositories/
│ │ ├── booking.repository.ts
│ ├── services/
│ │ ├── connection.service.ts
│ ├── server.ts
├── package.json
├── tsconfig.json
├── tslint.json
└── README.

# Roadmap

## Scalability:

1. Integrate message queues (e.g., RabbitMQ, Kafka, SQS) for processing high volumes of data.

## Error Handling:

1. Implement retry mechanisms for transient failures.
2. Add comprehensive logging and monitoring.

## Security:

1. Encrypt sensitive data at rest and in transit.
2. Implement role-based access control (RBAC) for API endpoints.
3. Implement hashing or Hmac for data encryption

## Compliance:

1. Ensure GDPR compliance by allowing data deletion upon request.

## Sequential Diagram

You can find sequential diagram for the Booking Data Ingestion System APIs.
https://drive.google.com/file/d/1-4En6Zvq1n-eVTuFYKbefmXG8O5ILYPW/view?usp=sharing

## License

This project is licensed under the ISC License.

This `README.md` file provides a comprehensive guide for your project, including features, deployment instructions, getting started steps, API documentation, environment variables, project structure, and license information. Adjust the content as needed to fit your specific project details.
