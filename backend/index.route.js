const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');
const adminRoutes = require('./routes/admin.routes');

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Blog routes
router.use('/blogs', blogRoutes);

// Admin routes
router.use('/admin', adminRoutes);

module.exports = router; 