import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import Dashboard from "./components/Dashboard";
import PomodoroTimer from "./components/PomodoroTimer";
import Analytics from "./components/Analytics";
import StudyPlanner from "./components/StudyPlanner";
import "./App.css";

const API_URL = "http://localhost:4000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [studySlots, setStudySlots] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState("");

  // Load state from backend on init
  useEffect(() => {
    fetch(`${API_URL}/data`)
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || []);
        setStudyMinutes(data.studyMinutes || 0);
        setStudySlots(data.studySlots || []);
      })
      .catch(err => console.error("Error fetching data:", err));

    const storedTheme = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(storedTheme);
  }, []);

  // Theme Sync
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle Notifications (Deadline Check)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const dueToday = tasks.filter(t => t.deadline === today && t.status !== "completed");
    
    if (dueToday.length > 0) {
      setNotification(`You have ${dueToday.length} task(s) due today!`);
      const timer = setTimeout(() => setNotification(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [tasks]);

  const handleSessionComplete = async (minutes) => {
    try {
      const res = await fetch(`${API_URL}/study/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes })
      });
      const data = await res.json();
      setStudyMinutes(data.studyMinutes);
    } catch (err) {
      console.error("Error logging study session:", err);
    }
  };

  return (
    <div className="app-container">
      {notification && <div className="notification">{notification}</div>}

      <aside className="sidebar glass">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <TaskForm tasks={tasks} setTasks={setTasks} />
      </aside>

      <main className="main-content">
        <div className="widgets-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <PomodoroTimer onSessionComplete={handleSessionComplete} />
          <Analytics tasks={tasks} studyMinutes={studyMinutes} />
          <StudyPlanner studySlots={studySlots} setStudySlots={setStudySlots} />
        </div>
        
        <div className="dashboard-wrapper glass">
          <Dashboard tasks={tasks} setTasks={setTasks} />
        </div>
      </main>
    </div>
  );
}

export default App;