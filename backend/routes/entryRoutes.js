const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Entry = require('../models/Entry');

// @desc    Create new entry
// @route   POST /api/entries
// @access  Public
const createEntry = asyncHandler(async (req, res) => {
  const { date, mood, note, tags } = req.body;

  const entry = await Entry.create({
    date: date || new Date(),
    mood,
    note,
    tags: tags || []
  });

  res.status(201).json({
    success: true,
    data: entry
  });
});

// @desc    Get all entries
// @route   GET /api/entries
// @access  Public
const getEntries = asyncHandler(async (req, res) => {
  const { mood, tag, startDate, endDate } = req.query;
  
  let query = {};
  
  // Filter by mood
  if (mood) {
    query.mood = mood;
  }
  
  // Filter by tag
  if (tag) {
    query.tags = { $in: [tag] };
  }
  
  // Filter by date range
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const entries = await Entry.find(query).sort({ date: -1 });

  res.json({
    success: true,
    count: entries.length,
    data: entries
  });
});

// @desc    Get single entry
// @route   GET /api/entries/:id
// @access  Public
const getEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  res.json({
    success: true,
    data: entry
  });
});

// @desc    Update entry
// @route   PUT /api/entries/:id
// @access  Public
const updateEntry = asyncHandler(async (req, res) => {
  let entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    data: entry
  });
});

// @desc    Delete entry
// @route   DELETE /api/entries/:id
// @access  Public
const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  await entry.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Get mood statistics
// @route   GET /api/entries/stats/mood
// @access  Public
const getMoodStats = asyncHandler(async (req, res) => {
  const stats = await Entry.aggregate([
    {
      $group: {
        _id: '$mood',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  res.json({
    success: true,
    data: stats
  });
});

// @desc    Get entries by date range
// @route   GET /api/entries/stats/date-range
// @access  Public
const getDateRangeStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
  const end = endDate ? new Date(endDate) : new Date();

  const entries = await Entry.find({
    date: { $gte: start, $lte: end }
  }).sort({ date: 1 });

  res.json({
    success: true,
    count: entries.length,
    data: entries
  });
});

router.route('/')
  .post(createEntry)
  .get(getEntries);

router.route('/:id')
  .get(getEntry)
  .put(updateEntry)
  .delete(deleteEntry);

router.get('/stats/mood', getMoodStats);
router.get('/stats/date-range', getDateRangeStats);

module.exports = router;
