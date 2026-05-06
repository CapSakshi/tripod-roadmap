const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({});
    console.log('Users in DB:');
    users.forEach(u => console.log(u.email, u.name));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
