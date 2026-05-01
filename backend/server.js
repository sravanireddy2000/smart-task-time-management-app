const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Helper to write DB
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');

// --- ROUTES ---

// Get all data
app.get('/api/data', (req, res) => {
  const data = readDB();
  res.json(data);
});

// Create task
app.post('/api/tasks', (req, res) => {
  const data = readDB();
  const newTask = req.body;
  data.tasks.push(newTask);
  writeDB(data);
  res.status(201).json(newTask);
});

// Update task status
app.put('/api/tasks/:id', (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);
  const taskIndex = data.tasks.findIndex(t => t.id === id);
  
  if (taskIndex !== -1) {
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
    writeDB(data);
    res.json(data.tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);
  data.tasks = data.tasks.filter(t => t.id !== id);
  writeDB(data);
  res.json({ message: 'Deleted successfully' });
});

// Add study session time
app.post('/api/study/session', (req, res) => {
  const data = readDB();
  const { minutes } = req.body;
  data.studyMinutes += parseInt(minutes);
  writeDB(data);
  res.json({ studyMinutes: data.studyMinutes });
});

// Create Study Slot
app.post('/api/study/slots', (req, res) => {
  const data = readDB();
  const newSlot = req.body;
  data.studySlots.push(newSlot);
  data.studySlots.sort((a, b) => a.time.localeCompare(b.time));
  writeDB(data);
  res.status(201).json(data.studySlots);
});

// Delete Study Slot
app.delete('/api/study/slots/:id', (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);
  data.studySlots = data.studySlots.filter(s => s.id !== id);
  writeDB(data);
  res.json(data.studySlots);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
