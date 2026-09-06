// Week 9 - MongoDB & Mongoose
// Habit Schema / Model

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Habit name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      enum: ['Health', 'Study', 'Work', 'Other'],
      default: 'Other',
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly'],
      default: 'Daily',
    },
    history: {
      // array of "YYYY-MM-DD" date strings on which the habit was completed
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Habit', habitSchema);
