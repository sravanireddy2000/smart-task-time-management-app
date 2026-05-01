import React from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="header">
      <h1>📚 Smart Task</h1>
      <button 
        className="theme-toggle" 
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Theme"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default Navbar;