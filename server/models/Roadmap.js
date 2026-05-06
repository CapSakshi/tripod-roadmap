const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
  resources: [{ type: String }]
}, { _id: true });

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 100 },
  description: { type: String, required: [true, 'Description is required'], maxlength: 1000 },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Dev', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  steps: [stepSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Admin-managed vs user-created
  isAdminRoadmap: { type: Boolean, default: false },
  // User roadmap fields
  isPublic: { type: Boolean, default: false },
  isDraft: { type: Boolean, default: true },
  thumbnail: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

roadmapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

roadmapSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
