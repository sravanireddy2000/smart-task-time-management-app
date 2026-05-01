import React from "react";

const Analytics = ({ tasks, studyMinutes }) => {
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const hours = Math.floor(studyMinutes / 60);
  const minutes = studyMinutes % 60;

  return (
    <div className="widget glass analytics">
      <h3>📈 Weekly Analytics</h3>
      
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{hours}h {minutes}m</div>
          <div className="stat-label">Study Time</div>
        </div>
      </div>

      <div className="progress-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
          <span>Overall Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
