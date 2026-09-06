// Week 7 - Node.js Fundamentals
// Week 8 - Express.js and Routing
// Week 9 - MongoDB Connection
// Week 10 - REST API

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const habitRoutes = require('./routes/habitRoutes');

// Initialize Express App
const app = express();

// ===== MIDDLEWARE =====
app.use(cors());                    // Allow cross-origin requests from React
app.use(express.json());            // Parse JSON request body
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
app.use('/api/habits', habitRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🔥 HabitFlow Backend API is Running!',
    version: '1.0.0',
    endpoints: {
      getAllHabits: 'GET /api/habits',
      getOneHabit: 'GET /api/habits/:id',
      createHabit: 'POST /api/habits',
      updateHabit: 'PUT /api/habits/:id',
      toggleToday: 'PATCH /api/habits/:id/toggle',
      deleteHabit: 'DELETE /api/habits/:id',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ===== DATABASE CONNECTION =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API Docs: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️  Please update MONGO_URI in .env file');
    // Start server even without DB (for testing)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without DB)`);
    });
  });
