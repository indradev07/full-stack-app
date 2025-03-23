TV Shows Management App 🎬

This project is a Full Stack Application that fetches TV show details from the TVMaze API and provides a RESTful API to manage TV shows. The frontend is built with React (Vite), and the backend is a Spring Boot (Java 17) application using an H2 in-memory database.

The entire project is Dockerized, so it can be easily run using Docker Compose.

🚀 Features

✔ Fetches TV show details from TVMaze API and stores them in the database
✔ RESTful APIs for retrieving TV show information
✔ Frontend displays TV show details in a user-friendly interface
✔ Uses H2 Database for easy setup (no external DB required)
✔ Dockerized for easy deployment

🏗 Project Structure

/tvshows-app
│── backend/       # Spring Boot Application (Java 17, H2 Database)
│── frontend/      # React (Vite) Application
│── docker-compose.yml   # Docker setup for both frontend & backend
│── README.md      # Project Documentation

🛠 Tech Stack

Backend (Spring Boot)
Java 17
Spring Boot 3
Spring Data JPA
H2 Database
RestTemplate for API calls
Lombok for reducing boilerplate code
Docker

Frontend (React + Vite)
React 18
Vite for fast build
Tailwind CSS for styling
Axios for API requests
Docker

⚡ Setup Instructions

🔹 Clone the Repository
git clone https://github.com/indradev07/full-stack-app.git
cd tvshows-app

🔹 Run with Docker
docker-compose up --build

This will:
✅ Build and start the backend (Spring Boot) on port 8080
✅ Build and start the frontend (React) on port 5173

📡 Backend API Endpoints


Method	Endpoint	Description
GET	/api/tvshows	Get all TV shows
GET	/api/tvshows/{id}	Get TV show by ID


👨‍💻 Contributors

Indra Pal
