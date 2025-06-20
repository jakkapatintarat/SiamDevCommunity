const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const adminBlogController = require('../controllers/adminBlog.controller');

// Get all admin blogs
router.get('/blogs', adminBlogController.getAllAdminBlogs);

// Get admin blog by id
router.get('/blog/:id', adminBlogController.getAdminBlogById);

// Create admin blog
router.post('/blog/create', upload.single('image'), adminBlogController.createAdminBlog);

// Update admin blog
router.patch('/blog/update/:id', upload.single('image'), adminBlogController.updateAdminBlog);

// Delete admin blog
router.delete('/blog/delete/:id', adminBlogController.deleteAdminBlog);

module.exports = router; 