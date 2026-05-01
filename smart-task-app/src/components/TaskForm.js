import React, { useState } from "react";

const API_URL = "http://localhost:4000/api";

const TaskForm = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    title: "",
    subject: "",
    priority: "Medium",
    deadline: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      ...task,
      id: Date.now(),
      status: "pending"
    };

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      const savedTask = await res.json();
      setTasks([...tasks, savedTask]);

      setTask({
        title: "",
        subject: "",
        priority: "Medium",
        deadline: ""
      });
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Add New Task</h3>
      
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Subject (e.g., Mathematics)"
        value={task.subject}
        onChange={(e) => setTask({ ...task, subject: e.target.value })}
        required
      />

      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="date"
        value={task.deadline}
        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        required
      />

      <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Add Task</button>
    </form>
  );
};

export default TaskForm;