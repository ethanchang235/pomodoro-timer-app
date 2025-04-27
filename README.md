# Pomodoro Timer App

A simple web-based Pomodoro timer application built with React for the frontend and Node.js/Express with SQLite for the backend to track your productivity sessions.

## Features

*   Standard Pomodoro Technique cycle:
    *   25-minute work sessions
    *   5-minute short breaks
    *   15-minute long breaks (after 4 work sessions)
*   Timer controls: Start, Pause, Reset.
*   Automatic switching between work and break modes upon timer completion.
*   Displays the current mode (Work / Short Break / Long Break).
*   Tracks completed work sessions (`Pomodoros`) during the current browser session.
*   Persistently stores and displays the **total** number of completed Pomodoros across all sessions using a backend API and an SQLite database.

## Technologies Used

*   **Frontend:**
    *   React
    *   JavaScript (ES6+)
    *   HTML5
    *   CSS3
    *   Axios (for API requests)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Cors
*   **Database:**
    *   SQLite
*   **Development:**
    *   npm (Node Package Manager)
    *   Git & GitHub
    *   VS Code (or your preferred editor)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js and npm:** Make sure you have Node.js (which includes npm) installed. You can download it from [https://nodejs.org/](https://nodejs.org/). Verify installation by running `node -v` and `npm -v` in your terminal.
*   **Git:** Required to clone the repository.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ethanchang235/pomodoro-timer-app.git
    cd pomodoro-timer-app
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

You need to run the backend server and the frontend development server simultaneously in two separate terminal windows.

1.  **Run the Backend Server:**
    *   Open a terminal window.
    *   Navigate to the `backend` directory:
        ```bash
        cd path/to/pomodoro-timer-app/backend
        ```
    *   Start the server:
        ```bash
        node server.js
        ```
    *   You should see output like `Server running on port 5001`. The server will also connect to/create the `pomodoro.db` SQLite database file in this directory.
    *   Keep this terminal window open.

2.  **Run the Frontend Development Server:**
    *   Open a **second** terminal window.
    *   Navigate to the `frontend` directory:
        ```bash
        cd path/to/pomodoro-timer-app/frontend
        ```
    *   Start the React development server:
        ```bash
        npm start
        ```
    *   This will usually open the application automatically in your default web browser at `http://localhost:3000`. If not, open your browser and navigate to that address.
    *   Keep this terminal window open.

Now you can use the Pomodoro Timer in your browser!

## Project Structure
