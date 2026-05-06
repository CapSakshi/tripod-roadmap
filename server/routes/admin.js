const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect, adminOnly } = require('../middleware/auth');
const Roadmap = require('../models/Roadmap');

const router = express.Router();

// Multer config for thumbnail uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/thumbnails/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'thumb-' + unique + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'));
    }
  }
});

// All admin routes require protect + adminOnly
router.use(protect, adminOnly);

// Validate roadmap input
const validateRoadmap = (body) => {
  const { title, description, category, difficulty, steps } = body;
  const errors = [];
  if (!title || title.trim().length < 3) errors.push('Title must be at least 3 characters');
  if (!description || description.trim().length < 10) errors.push('Description must be at least 10 characters');
  const validCategories = ['Web Dev', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other'];
  if (!validCategories.includes(category)) errors.push('Invalid category');
  if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) errors.push('Invalid difficulty');
  if (!steps || !Array.isArray(steps) || steps.length === 0) errors.push('At least one step is required');
  steps?.forEach((step, i) => {
    if (!step.title || step.title.trim().length < 2) errors.push(`Step ${i + 1}: title is required`);
    if (!step.description || step.description.trim().length < 5) errors.push(`Step ${i + 1}: description is required`);
  });
  return errors;
};

// GET /api/admin/roadmaps
router.get('/roadmaps', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ isAdminRoadmap: true })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/roadmap
router.post('/roadmap', upload.single('thumbnail'), async (req, res) => {
  try {
    let steps = req.body.steps;
    if (typeof steps === 'string') steps = JSON.parse(steps);

    const errors = validateRoadmap({ ...req.body, steps });
    if (errors.length) return res.status(400).json({ success: false, message: errors.join(', ') });

    const roadmapData = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      category: req.body.category,
      difficulty: req.body.difficulty,
      steps: steps.map(s => ({
        title: s.title.trim(),
        description: s.description.trim(),
        resources: Array.isArray(s.resources) ? s.resources.filter(r => r.trim()) : []
      })),
      createdBy: req.user._id,
      isAdminRoadmap: true,
      isPublic: true,
      isDraft: false
    };

    if (req.file) {
      roadmapData.thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    }

    const roadmap = await Roadmap.create(roadmapData);
    await roadmap.populate('createdBy', 'name email');
    res.status(201).json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/roadmap/:id
router.put('/roadmap/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    let steps = req.body.steps;
    if (typeof steps === 'string') steps = JSON.parse(steps);

    const errors = validateRoadmap({ ...req.body, steps });
    if (errors.length) return res.status(400).json({ success: false, message: errors.join(', ') });

    const roadmap = await Roadmap.findOne({ _id: req.params.id, isAdminRoadmap: true });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    roadmap.title = req.body.title.trim();
    roadmap.description = req.body.description.trim();
    roadmap.category = req.body.category;
    roadmap.difficulty = req.body.difficulty;
    roadmap.steps = steps.map(s => ({
      title: s.title.trim(),
      description: s.description.trim(),
      resources: Array.isArray(s.resources) ? s.resources.filter(r => r.trim()) : []
    }));
    if (req.file) roadmap.thumbnail = `/uploads/thumbnails/${req.file.filename}`;

    await roadmap.save();
    await roadmap.populate('createdBy', 'name email');
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/roadmap/:id
router.delete('/roadmap/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findOneAndDelete({ _id: req.params.id, isAdminRoadmap: true });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    res.json({ success: true, message: 'Roadmap deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
