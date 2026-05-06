const mongoose = require('mongoose');
require('dotenv').config();
const Roadmap = require('./models/Roadmap');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tripod-roadmap';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    const result = await Roadmap.updateMany({}, { isAdminRoadmap: false, isPublic: true, isDraft: false });
    console.log(`Updated ${result.modifiedCount} roadmaps to be public and non-admin.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
