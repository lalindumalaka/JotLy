//backend/models/Entry.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['😊', '😔', '😎', '😡', '😴', '🤔', '😍', '😢', '😤', '😇']
  },
  note: {
    type: String,
    required: true,
    maxlength: 1000
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
entrySchema.index({ date: -1 });
entrySchema.index({ mood: 1 });
entrySchema.index({ tags: 1 });

module.exports = mongoose.model('Entry', entrySchema);
