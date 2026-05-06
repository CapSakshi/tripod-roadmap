const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roadmapId: {
    type: String,
    required: true
  },
  completedSteps: [{
    type: String
  }],
  totalSteps: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

progressSchema.index({ user: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
