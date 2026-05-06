const express = require('express');
const { protect } = require('../middleware/auth');
const Progress = require('../models/Progress');
const Roadmap = require('../models/Roadmap');

const router = express.Router();

// GET /api/progress - all user progress
router.get('/', protect, async (req, res) => {
  try {
    const allProgress = await Progress.find({ user: req.user._id });
    res.json({ success: true, progress: allProgress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/progress/:roadmapId
router.get('/:roadmapId', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      roadmapId: req.params.roadmapId
    });

    if (!progress) {
      const roadmap = await Roadmap.findById(req.params.roadmapId);
      return res.json({
        success: true,
        progress: {
          roadmapId: req.params.roadmapId,
          completedSteps: [],
          totalSteps: roadmap ? roadmap.steps.length : 0,
          percentage: 0
        }
      });
    }

    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/progress/:roadmapId/toggle
router.post('/:roadmapId/toggle', protect, async (req, res) => {
  try {
    const { stepId } = req.body;
    const roadmapId = req.params.roadmapId;
    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    let progress = await Progress.findOne({ user: req.user._id, roadmapId });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        roadmapId,
        completedSteps: [],
        totalSteps: roadmap.steps.length
      });
    }

    const stepIndex = progress.completedSteps.indexOf(stepId);
    if (stepIndex > -1) {
      progress.completedSteps.splice(stepIndex, 1);
    } else {
      progress.completedSteps.push(stepId);
    }

    progress.totalSteps = roadmap.steps.length;
    progress.percentage = Math.round((progress.completedSteps.length / roadmap.steps.length) * 100);
    progress.lastUpdated = new Date();

    await progress.save();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
