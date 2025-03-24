TV Shows App

A full-stack web application for managing TV shows, featuring a React frontend and a Spring Boot backend with an H2 database.

📖 Project Overview

The TV Shows App allows users to fetch, store, and manage TV show data. It integrates with an external API, provides a RESTful backend, and serves a modern frontend built with React and Vite. The application is containerized using Docker for seamless deployment.

🚀 Features

✅ Fetch TV show data from an external API✅ Store TV show details in a database✅ Expose RESTful APIs for TV show management✅ Serve frontend with Vite for fast development✅ Dockerized setup for easy deployment

🏗️ Tech Stack

Frontend:

React (Vite) – Fast development and optimized build

Tailwind CSS – Modern styling framework

React Context API – State management

Backend:

Spring Boot – REST API and business logic

H2 Database – Lightweight, in-memory database

Lombok – Reduces boilerplate code

Build & Deployment:

Maven – Backend build tool

Docker & Docker Compose – Containerized setup

🏁 Getting Started

🔹 Prerequisites

Ensure you have the following installed:

Docker

Docker Compose

🔹 Clone the Repository

git clone https://github.com/indradev07/full-stack-app.git
cd full-stack-app

🔹 Run the Application with Docker

docker-compose up --build

This will build and start both the backend and frontend services.

📂 Project Structure

/tv-shows-app
│── backend  # Spring Boot Backend
│── frontend # React Vite Frontend
│── docker-compose.yml
│── README.md

🔗 Access Your App

Feature

URL

Frontend (React Vite)

http://localhost:5173

Backend API (Spring Boot)

http://localhost:8080/api/tvshows

H2 Database Console

http://localhost:8080/h2-console

🔹 H2 Console Credentials

JDBC URL: jdbc:h2:file:/data/tvshowsdb

Username: sa

Password: (leave blank)

📡 API Documentation

The backend exposes the following RESTful APIs:

Method

Endpoint

Description

GET

/api/tvshows

Fetch all TV shows

GET

/api/tvshows/{id}

Fetch a specific TV show by ID

Example Response for GET /api/tvshows:

[
  {
    "id": 1,
    "title": "Breaking Bad",
    "genre": "Drama",
    "rating": 9.5
  }
]

🛠️ Running Without Docker

If you want to run the application manually for development:

🔹 Run Backend

cd backend
mvn spring-boot:run

🔹 Run Frontend

cd frontend
npm install
npm run dev

🧪 Running Tests

To ensure everything is working as expected, run:

Backend Tests

cd backend
mvn test

Frontend Tests

cd frontend
npm test



