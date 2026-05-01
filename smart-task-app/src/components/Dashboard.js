import React from "react";
import TaskCard from "./TaskCard";

const Dashboard = ({ tasks, setTasks }) => {
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(
    (t) => t.deadline === today && t.status === "pending"
  );

  const upcomingTasks = tasks.filter(
    (t) => t.deadline > today && t.status === "pending"
  );

  const completedTasks = tasks.filter(
    (t) => t.status === "completed"
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Task Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="task-column">
          <h3>📅 Today <span className="badge" style={{ background: 'var(--card-border)' }}>{todayTasks.length}</span></h3>
          {todayTasks.length === 0 && <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>No tasks for today.</p>}
          {todayTasks.map((task) => (
            <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
        </div>

        <div className="task-column">
          <h3>⏳ Upcoming <span className="badge" style={{ background: 'var(--card-border)' }}>{upcomingTasks.length}</span></h3>
          {upcomingTasks.length === 0 && <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>No upcoming tasks.</p>}
          {upcomingTasks.map((task) => (
            <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
        </div>

        <div className="task-column">
          <h3>✅ Completed <span className="badge" style={{ background: 'var(--card-border)' }}>{completedTasks.length}</span></h3>
          {completedTasks.length === 0 && <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>No completed tasks yet.</p>}
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;