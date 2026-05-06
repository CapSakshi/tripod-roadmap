const express = require('express');
const { protect } = require('../middleware/auth');
const Roadmap = require('../models/Roadmap');

const router = express.Router();

// Validate user roadmap
const validateRoadmap = (body) => {
  const errors = [];
  if (!body.title || body.title.trim().length < 3) errors.push('Title must be at least 3 characters');
  if (!body.description || body.description.trim().length < 10) errors.push('Description must be at least 10 characters');
  return errors;
};

// POST /api/roadmap/create
router.post('/create', protect, async (req, res) => {
  try {
    const { title, description, category, difficulty, steps, isPublic } = req.body;
    const errors = validateRoadmap(req.body);
    if (errors.length) return res.status(400).json({ success: false, message: errors.join(', ') });

    const roadmap = await Roadmap.create({
      title: title.trim(),
      description: description.trim(),
      category: category || 'Other',
      difficulty: difficulty || 'Beginner',
      steps: (steps || []).map(s => ({
        title: s.title?.trim() || '',
        description: s.description?.trim() || '',
        resources: Array.isArray(s.resources) ? s.resources.filter(r => r.trim()) : []
      })),
      createdBy: req.user._id,
      isPublic: !!isPublic,
      isDraft: !isPublic,
      isAdminRoadmap: false
    });

    await roadmap.populate('createdBy', 'name avatar');
    res.status(201).json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/roadmap/public - all public user roadmaps with filters
router.get('/public', async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 12 } = req.query;
    const query = { isPublic: true, isDraft: false, isAdminRoadmap: false };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];

    const total = await Roadmap.countDocuments(query);
    const roadmaps = await Roadmap.find(query)
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, roadmaps, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/roadmap/my - user's own roadmaps
router.get('/my', protect, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ createdBy: req.user._id, isAdminRoadmap: false })
      .sort({ updatedAt: -1 });
    res.json({ success: true, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/roadmap/:id
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
      .populate('createdBy', 'name avatar bio')
      .populate('comments.user', 'name avatar');
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (e) {}
    }

    if (!roadmap.isPublic && roadmap.createdBy._id.toString() !== userId?.toString()) {
      return res.status(403).json({ success: false, message: 'This roadmap is private' });
    }
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/roadmap/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, createdBy: req.user._id, isAdminRoadmap: false });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found or unauthorized' });

    const { title, description, category, difficulty, steps, isPublic } = req.body;
    if (title) roadmap.title = title.trim();
    if (description) roadmap.description = description.trim();
    if (category) roadmap.category = category;
    if (difficulty) roadmap.difficulty = difficulty;
    if (steps) roadmap.steps = steps.map(s => ({
      title: s.title?.trim() || '',
      description: s.description?.trim() || '',
      resources: Array.isArray(s.resources) ? s.resources.filter(r => r.trim()) : []
    }));
    if (isPublic !== undefined) {
      roadmap.isPublic = !!isPublic;
      roadmap.isDraft = !isPublic;
    }

    await roadmap.save();
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/roadmap/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id, isAdminRoadmap: false });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found or unauthorized' });
    res.json({ success: true, message: 'Roadmap deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/roadmap/:id/like
router.post('/:id/like', protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, isPublic: true });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    const alreadyLiked = roadmap.likes.includes(req.user._id);
    if (alreadyLiked) {
      roadmap.likes.pull(req.user._id);
    } else {
      roadmap.likes.push(req.user._id);
    }
    await roadmap.save();
    res.json({ success: true, liked: !alreadyLiked, likesCount: roadmap.likes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/roadmap/:id/comment
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length < 1) return res.status(400).json({ success: false, message: 'Comment text required' });

    const roadmap = await Roadmap.findOne({ _id: req.params.id, isPublic: true });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    roadmap.comments.push({ user: req.user._id, text: text.trim() });
    await roadmap.save();
    await roadmap.populate('comments.user', 'name avatar');

    const newComment = roadmap.comments[roadmap.comments.length - 1];
    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/roadmap/:id/fork
router.post('/:id/fork', protect, async (req, res) => {
  try {
    const original = await Roadmap.findOne({ _id: req.params.id, isPublic: true });
    if (!original) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    const forked = await Roadmap.create({
      title: `${original.title} (Fork)`,
      description: original.description,
      category: original.category,
      difficulty: original.difficulty,
      steps: original.steps.map(s => ({ title: s.title, description: s.description, resources: [...s.resources] })),
      createdBy: req.user._id,
      isPublic: false,
      isDraft: true,
      isAdminRoadmap: false,
      forkedFrom: original._id
    });

    res.status(201).json({ success: true, roadmap: forked, message: 'Roadmap forked successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/roadmap/user/:userId - public profile roadmaps
router.get('/user/:userId', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ createdBy: req.params.userId, isPublic: true, isAdminRoadmap: false })
      .populate('createdBy', 'name avatar bio')
      .sort({ createdAt: -1 });
    res.json({ success: true, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
