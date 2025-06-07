// app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON (if needed)
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint example (future habit tracker API, etc.)
app.get('/api/habits', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/data/habits.json'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Dopamine Detox Coach running at http://localhost:${PORT}`);
});
