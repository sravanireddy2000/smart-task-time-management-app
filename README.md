# Smart Task & Study Planner

A full-stack application designed to help students manage academic tasks and schedule study sessions.

## How to Run the Project

This project consists of two parts: a **Backend** (Node.js/Express) and a **Frontend** (React).

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

---

### 1. Setup the Backend
The backend handles data persistence using a local JSON file.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the backend server:
    ```bash
    node server.js
    ```
    The backend will run on [http://localhost:4000](http://localhost:4000).

---

### 2. Setup the Frontend
The frontend provides the user interface for task management.

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd smart-task-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React application:
    ```bash
    npm start
    ```
    The application will open in  browser at [http://localhost:3000](http://localhost:3000).

---

## Features
- **Add & Manage Tasks**: Track subjects, priorities, and deadlines.
- **Study Sessions**: Track total study time.
- **Study Planner**: Schedule specific time slots for subjects.
- **Persistent Storage**: Data is saved locally in `backend/db.json`.
