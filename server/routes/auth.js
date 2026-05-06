const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { credential, userInfo } = req.body;
    if (!credential && !userInfo) {
      return res.status(400).json({ success: false, message: 'Google credential is required' });
    }

    let googleId, email, name, picture;

    if (userInfo && userInfo.googleId && userInfo.email) {
      // Verify the access token is valid by calling Google's tokeninfo endpoint
      const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${credential}`);
      if (!tokenInfoRes.ok) {
        return res.status(401).json({ success: false, message: 'Invalid Google access token' });
      }

      // Also verify via userinfo endpoint for extra security
      const googleUserInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${credential}` },
      });
      if (!googleUserInfoRes.ok) {
        return res.status(401).json({ success: false, message: 'Failed to verify Google user info' });
      }
      const verifiedInfo = await googleUserInfoRes.json();

      // Use the server-verified data (not client-sent data) for security
      googleId = verifiedInfo.sub;
      email = verifiedInfo.email;
      name = verifiedInfo.name;
      picture = verifiedInfo.picture;
      
      console.log('Google login verified info:', { email, name, hasPicture: !!picture, pictureUrl: picture });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid Google authentication data' });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google account email is required' });
    }

    // Check if user already exists by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Link Google account if user exists by email but not yet linked
      let needsSave = false;
      if (!user.googleId) {
        user.googleId = googleId;
        needsSave = true;
      }
      // Always update avatar from Google if available
      if (picture && user.avatar !== picture) {
        console.log('Updating user avatar from Google');
        user.avatar = picture;
        needsSave = true;
      }
      if (needsSave) {
        await user.save();
        console.log('User saved with updated info');
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture || '',
      });
    }

    const token = generateToken(user._id);
    res.json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, password: user.password }
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    res.status(401).json({ success: false, message: 'Google authentication failed' });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Please provide all fields' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, password: user.password }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

    const processedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: processedEmail }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, password: user.password }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  const userWithPassword = await User.findById(req.user._id).select('+password');
  res.json({
    success: true,
    user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, avatar: req.user.avatar, bio: req.user.bio, password: userWithPassword.password }
  });
});

// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name.trim();
    if (bio !== undefined) user.bio = bio.trim();
    if (avatar) user.avatar = avatar;
    await user.save();
    const userWithPassword = await User.findById(req.user._id).select('+password');
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, bio: user.bio, password: userWithPassword.password } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
