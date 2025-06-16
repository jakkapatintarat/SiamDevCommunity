const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AdminBlogModel = require('../models/adminBlogSchema');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imgs/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-admin-' + req.body.author + '.jpg');
    }
});
const upload = multer({ storage: storage });

// Get all admin blogs
router.get('/blogs', async (req, res) => {
    try {
        const adminBlogs = await AdminBlogModel.find();
        res.json(adminBlogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin blogs', error });
    }
});

// Get admin blog by id
router.get('/blog/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await AdminBlogModel.findById(blogId);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Admin blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin blog', error });
    }
});

// Create admin blog
router.post('/blog/create', upload.single('image'), async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        const imagePath = req.file ? req.file.path : null;
        
        const newAdminBlog = new AdminBlogModel({
            title,
            content,
            author,
            tags: tags ? tags.split(',') : [],
            image: imagePath
        });
        
        await newAdminBlog.save();
        res.json({ message: 'Admin blog created successfully', blog: newAdminBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin blog', error });
    }
});

// Update admin blog
router.patch('/blog/update/:id', upload.single('image'), async (req, res) => {
    try {
        const blogId = req.params.id;
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.image = req.file.path;
        }
        
        if (updateData.tags) {
            updateData.tags = updateData.tags.split(',');
        }
        
        const updatedBlog = await AdminBlogModel.findByIdAndUpdate(
            blogId,
            updateData,
            { new: true }
        );
        
        if (updatedBlog) {
            res.json({ message: 'Admin blog updated successfully', blog: updatedBlog });
        } else {
            res.status(404).json({ message: 'Admin blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin blog', error });
    }
});

// Delete admin blog
router.delete('/blog/delete/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await AdminBlogModel.findByIdAndDelete(blogId);
        
        if (deletedBlog) {
            res.json({ message: 'Admin blog deleted successfully', blog: deletedBlog });
        } else {
            res.status(404).json({ message: 'Admin blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin blog', error });
    }
});

module.exports = router; 