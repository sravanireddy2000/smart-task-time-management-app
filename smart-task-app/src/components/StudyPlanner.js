import React, { useState } from "react";

const API_URL = "http://localhost:4000/api";

const StudyPlanner = ({ studySlots, setStudySlots }) => {
  const [newSlot, setNewSlot] = useState({ time: "", subject: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSlot.time || !newSlot.subject) return;

    try {
      const res = await fetch(`${API_URL}/study/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), ...newSlot })
      });
      const data = await res.json();
      setStudySlots(data);
      setNewSlot({ time: "", subject: "" });
    } catch (err) {
      console.error("Error adding slot:", err);
    }
  };

  const removeSlot = async (id) => {
    try {
      const res = await fetch(`${API_URL}/study/slots/${id}`, { method: "DELETE" });
      const data = await res.json();
      setStudySlots(data);
    } catch (err) {
      console.error("Error deleting slot:", err);
    }
  };

  return (
    <div className="widget glass planner">
      <h3>📅 Daily Planner</h3>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="time" 
          value={newSlot.time}
          onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
          required
        />
        <input 
          type="text" 
          placeholder="Subject" 
          value={newSlot.subject}
          onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
          style={{ flex: 2, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
          required
        />
        <button type="submit" className="btn-primary" style={{ padding: '0.5rem' }}>Add</button>
      </form>

      <div className="slots-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {studySlots.length === 0 ? (
          <p style={{ opacity: 0.6, fontSize: '0.9rem', textAlign: 'center' }}>No study sessions planned.</p>
        ) : (
          studySlots.map(slot => (
            <div key={slot.id} className="time-slot">
              <div>
                <span className="slot-time">{slot.time}</span>
                <span className="slot-subject" style={{ marginLeft: '1rem' }}>{slot.subject}</span>
              </div>
              <button className="btn-icon danger" onClick={() => removeSlot(slot.id)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;
