const express = require('express');
const { protect } = require('../middleware/auth');
const Roadmap = require('../models/Roadmap');

const router = express.Router();

// Helper to compute icon and color from title
const getIconAndColor = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('front'))      return { icon: '🌐', color: '#3B82F6' };
  if (t.includes('back'))       return { icon: '⚙️', color: '#10B981' };
  if (t.includes('devops'))     return { icon: '🔄', color: '#F59E0B' };
  if (t.includes('cloud'))      return { icon: '☁️', color: '#6366F1' };
  if (t.includes('cyber'))      return { icon: '🔐', color: '#EF4444' };
  if (t.includes('ai') || t.includes('machine')) return { icon: '🤖', color: '#8B5CF6' };
  if (t.includes('database'))   return { icon: '🗄️', color: '#14B8A6' };
  if (t.includes('mobile'))     return { icon: '📱', color: '#F97316' };
  if (t.includes('block') || t.includes('web3')) return { icon: '⛓️', color: '#EC4899' };
  if (t.includes('data structure') || t.includes('algorithm')) return { icon: '📊', color: '#059669' };
  return { icon: '📘', color: '#6366F1' };
};

// GET /api/roadmaps - all roadmap summaries
router.get('/', protect, async (req, res) => {
  try {
    const dbRoadmaps = await Roadmap.find({ isAdminRoadmap: true });

    const summaries = dbRoadmaps.map(r => {
      const { icon, color } = getIconAndColor(r.title);
      return {
        id: r._id,
        title: r.title,
        description: r.description,
        icon,
        color,
        estimatedHours: r.steps.length * 10,
        totalSteps: r.steps.length
      };
    });

    res.json({ success: true, roadmaps: summaries });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/roadmaps/:id - single roadmap with all steps
router.get('/:id', protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    const { icon, color } = getIconAndColor(roadmap.title);
    const roadmapObj = roadmap.toObject();

    // Ensure every step has a proper string `id`
    roadmapObj.steps = roadmapObj.steps.map(s => ({
      ...s,
      id: (s._id || s.id || '').toString()
    }));

    roadmapObj.id = roadmap._id;
    roadmapObj.icon = icon;
    roadmapObj.color = color;

    res.json({ success: true, roadmap: roadmapObj });
  } catch (error) {
    console.error('Error fetching roadmap details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
