import React from "react";

const API_URL = "http://localhost:4000/api";

const TaskCard = ({ task, tasks, setTasks }) => {

  const markComplete = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" })
      });
      if (res.ok) {
        const updated = tasks.map((t) =>
          t.id === task.id ? { ...t, status: "completed" } : t
        );
        setTasks(updated);
      }
    } catch (err) {
      console.error("Error marking complete:", err);
    }
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks/${task.id}`, { method: "DELETE" });
      if (res.ok) {
        const updated = tasks.filter((t) => t.id !== task.id);
        setTasks(updated);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const priorityClass = `priority-${task.priority.toLowerCase()}`;

  return (
    <div className="task-card glass">
      <h4 className="task-title" style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', opacity: task.status === 'completed' ? 0.6 : 1 }}>
        {task.title}
      </h4>
      
      <div className="task-meta">
        <span className="badge subject">{task.subject}</span>
        <span className={`badge ${priorityClass}`}>Priority: {task.priority}</span>
        <span className="badge" style={{ background: 'var(--card-border)' }}>🕒 {task.deadline}</span>
      </div>

      <div className="task-actions">
        {task.status !== "completed" && (
          <button className="btn-icon" onClick={markComplete} title="Mark as Completed">
            ✔ Complete
          </button>
        )}
        <button className="btn-icon danger" onClick={deleteTask} title="Delete Task">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;