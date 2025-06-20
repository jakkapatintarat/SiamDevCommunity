const AdminBlogModel = require('../models/adminBlogSchema');
const path = require('path');
const fs = require('fs').promises;

const AdminBlogService =  {
    // Get all admin blogs
    async getAllAdminBlogs() {
        try {
            const blogs = await AdminBlogModel.find().sort({ createdAt: -1 });
            return blogs;
        } catch (error) {
            console.error('Error in getAllAdminBlogs:', error);
            throw error;
        }
    },

    // Get admin blog by id
    async getAdminBlogById(blogId) {
        try {
            const blog = await AdminBlogModel.findById(blogId);
            if (!blog) return null;
            return blog;
        } catch (error) {
            console.error('Error in getAdminBlogById:', error);
            throw error;
        }
    },

    // Create new admin blog
    async createAdminBlog(blogData) {
        try {
            const newBlog = new AdminBlogModel(blogData);
            const savedBlog = await newBlog.save();
            return savedBlog;
        } catch (error) {
            console.error('Error in createAdminBlog:', error);
            throw error;
        }
    },

    // Update admin blog
    async updateAdminBlog(blogId, updateData) {
        try {
            if (updateData.tags && typeof updateData.tags === 'string') {
                updateData.tags = updateData.tags.split(',');
            }
            const updatedBlog = await AdminBlogModel.findByIdAndUpdate(
                blogId,
                updateData,
                { new: true }
            );
            if (!updatedBlog) return null;
            return updatedBlog;
        } catch (error) {
            console.error('Error in updateAdminBlog:', error);
            throw error;
        }
    },

    // Delete admin blog
    async deleteAdminBlog(blogId) {
        try {
            const deletedBlog = await AdminBlogModel.findByIdAndDelete(blogId);
            if (deletedBlog && deletedBlog.image) {
                try {
                    await fs.unlink(deletedBlog.image);
                } catch (error) {
                    console.error('Error deleting image file:', error);
                }
            }
            return deletedBlog;
        } catch (error) {
            console.error('Error in deleteAdminBlog:', error);
            throw error;
        }
    },
}

module.exports = AdminBlogService; 