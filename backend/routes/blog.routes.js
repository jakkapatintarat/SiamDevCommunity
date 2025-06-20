const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const upload = require('../middleware/upload.middleware');

// GET all blogs
router.get('/', blogController.getAllBlogs);

// GET blog by ID
router.get('/:id', blogController.getBlogById);

// POST create new blog
router.post('/create', upload.single('img'), blogController.createBlog);

// PATCH update blog
router.patch('/update/:id', upload.single('img'), blogController.updateBlog);

// DELETE blog
router.delete('/delete/:id', blogController.deleteBlog);

// GET blog comments
router.get('/:id/comments', blogController.getBlogComments);

// POST add comment
router.post('/:id/comments', blogController.addComment);

// Create bookmark
router.post('/:id/bookmark', blogController.createBookmark);

// Get all bookmark
router.get('/:userId/bookmark', blogController.getAllBookmark);

// Delete bookmark
router.delete('/:id/bookmark', blogController.deleteBookmark); 

module.exports = router; 