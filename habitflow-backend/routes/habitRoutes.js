// Week 8 - Express.js Routing
// Week 10 - REST API Development

const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ============================================
// GET /api/habits - Get all habits
// ============================================
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// GET /api/habits/:id - Get single habit
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// POST /api/habits - Create new habit
// ============================================
router.post('/', async (req, res) => {
  try {
    const { name, category, frequency } = req.body;
    const habit = new Habit({ name, category, frequency, history: [] });
    const savedHabit = await habit.save();
    res.status(201).json({ success: true, data: savedHabit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ============================================
// PUT /api/habits/:id - Update habit details
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ============================================
// PATCH /api/habits/:id/toggle - Mark/unmark today as done
// ============================================
router.patch('/:id/toggle', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }
    const today = todayStr();
    const alreadyDone = habit.history.includes(today);
    habit.history = alreadyDone
      ? habit.history.filter((d) => d !== today)
      : [...habit.history, today];
    await habit.save();
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ============================================
// DELETE /api/habits/:id - Delete habit
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }
    res.status(200).json({ success: true, message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
