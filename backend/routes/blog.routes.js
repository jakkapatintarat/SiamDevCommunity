const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const BlogModel = require('../models/blogSchema');
const CommentsModel = require('../models/comment');
const BookmarkModel = require('../models/bookmarkSchema');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imgs/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + req.body.author + '.jpg');
    }
});
const upload = multer({ storage: storage });

// Get all blogs
router.get('/', async (req, res) => {
    const allModels = await BlogModel.find();
    res.json(allModels).status(200);
});

// Get blog by id
router.get('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blogResult = await BlogModel.findById(blogId);
        res.json(blogResult);
    } catch (error) {
        res.json({ message: 'no have this blog', error });
    }
});

// Create new blog
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        const imagePath = req.file ? req.file.path : null;
        
        const newBlog = new BlogModel({
            title,
            content,
            author,
            tags: tags ? tags.split(',') : [],
            image: imagePath
        });
        
        await newBlog.save();
        res.json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error });
    }
});

// Update blog
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const blogId = req.params.id;
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.image = req.file.path;
        }
        
        if (updateData.tags) {
            updateData.tags = updateData.tags.split(',');
        }
        
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            updateData,
            { new: true }
        );
        
        if (updatedBlog) {
            res.json({ message: 'Blog updated successfully', blog: updatedBlog });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
});

// Delete blog
router.delete('/delete/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        
        if (deletedBlog) {
            // Also delete associated comments and bookmarks
            await CommentsModel.deleteMany({ blogId });
            await BookmarkModel.deleteMany({ blogId });
            
            res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
});

module.exports = router; 