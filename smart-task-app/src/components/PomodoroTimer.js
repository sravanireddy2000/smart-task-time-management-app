import React, { useState, useEffect } from "react";

const PomodoroTimer = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // 'work' or 'break'

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (mode === "work") {
        onSessionComplete(25); // Pass completed minutes
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("work");
        setTimeLeft(25 * 60);
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, onSessionComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="widget glass pomodoro">
      <h3>🍅 Pomodoro</h3>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
        {mode === "work" ? "Session Time" : "Break Time"}
      </p>
      <div className="timer-controls">
        <button className="btn-icon" onClick={toggleTimer}>
          {isRunning ? "⏸ Pause" : "▶ Start"}
        </button>
        <button className="btn-icon danger" onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
