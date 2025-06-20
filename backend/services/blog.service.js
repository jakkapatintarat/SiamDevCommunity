const BlogModel = require('../models/blogSchema');
const CommentsModel = require('../models/comment');
const BookmarkModel = require('../models/bookmarkSchema');
const path = require('path');
const fs = require('fs').promises;

class BlogService {
    // แปลงรูปภาพเป็น base64
    async convertImageToBase64(imagePath) {
        if (!imagePath) return null;
        try {
            const imageBuffer = await fs.readFile(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const mimeType = path.extname(imagePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
            return `data:${mimeType};base64,${base64Image}`;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    }

    // Get all blogs
    async getAllBlogs() {
        try {
            const blogs = await BlogModel.find().sort({ createdAt: -1 });
            // แปลงรูปภาพเป็น base64 สำหรับแต่ละ blog
            const blogsWithBase64 = await Promise.all(blogs.map(async (blog) => {
                const blogData = blog.toObject();
                if (blogData.image) {
                    blogData.image = await this.convertImageToBase64(blogData.image);
                }
                return blogData;
            }));
            return blogsWithBase64;
        } catch (error) {
            console.error('Error in getAllBlogs:', error);
            throw error;
        }
    }

    // Get blog by id
    async getBlogById(blogId) {
        try {
            const blog = await BlogModel.findById(blogId);
            if (!blog) return null;
            
            const blogData = blog.toObject();
            if (blogData.image) {
                blogData.image = await this.convertImageToBase64(blogData.image);
            }
            return blogData;
        } catch (error) {
            console.error('Error in getBlogById:', error);
            throw error;
        }
    }

    // Create new blog
    async createBlog(blogData) {
        try {
            const newBlog = new BlogModel({
                ...blogData,
                image: blogData.img // เก็บ path ของรูปภาพ
            });
            const savedBlog = await newBlog.save();
            return savedBlog;
        } catch (error) {
            console.error('Error in createBlog:', error);
            throw error;
        }
    }

    // Update blog
    async updateBlog(blogId, updateData) {
        try {
            if (updateData.tags && typeof updateData.tags === 'string') {
                updateData.tags = updateData.tags.split(',');
            }
            // ถ้ามีการอัพโหลดรูปภาพใหม่
            if (updateData.img) {
                updateData.image = updateData.img;
                delete updateData.img;
            }
            const updatedBlog = await BlogModel.findByIdAndUpdate(
                blogId,
                updateData,
                { new: true }
            );
            if (!updatedBlog) return null;
            return updatedBlog;
        } catch (error) {
            console.error('Error in updateBlog:', error);
            throw error;
        }
    }

    // Delete blog
    async deleteBlog(blogId) {
        try {
            const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
            if (deletedBlog) {
                // ลบรูปภาพที่เกี่ยวข้อง
                if (deletedBlog.image) {
                    try {
                        await fs.unlink(deletedBlog.image);
                    } catch (error) {
                        console.error('Error deleting image file:', error);
                    }
                }
                // ลบ comments และ bookmarks ที่เกี่ยวข้อง
                await CommentsModel.deleteMany({ blogId });
                await BookmarkModel.deleteMany({ blogId });
            }
            return deletedBlog;
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            throw error;
        }
    }

    // Get all comments for a blog
    async getBlogComments(blogId) {
        return await CommentsModel.find({ blogId }).sort({ createdAt: -1 });
    }

    // Add comment to blog
    async addComment(blogId, commentData) {
        const newComment = new CommentsModel({
            blogId,
            ...commentData,
        });
        return await newComment.save();
    }

    // Create bookmark
    async createBookmark(blogId, userId) {
        const bookmark = await BookmarkModel.findOne({ blogId, userId });

        //if bookmark already exists, throw error and return status 400
        if (bookmark) {
            return { status: 400, message: 'Bookmark already exists' };
        }
        const newBookmark = new BookmarkModel({ blogId, userId });
        return await newBookmark.save();
    }

    // Get all bookmark
    async getAllBookmark(userId) {
        const bookmarks = await BookmarkModel.find({ userId : userId }).sort({ createdAt: -1 });
       
        //return blog detail & img base64
        const bookmarksWithBase64 = await Promise.all(bookmarks.map(async (bookmark) => {
            const blog = await BlogModel.findById(bookmark.blogId);
            if (blog.image) {
                bookmark.image = await this.convertImageToBase64(blog.image);
            }
            return {
                _id: bookmark._id,
                blogId: blog._id,
                title: blog.title,
                image: blog.image,
                content: blog.content,
                author: blog.author,
                image: bookmark.image,
            };
        }));

        return bookmarksWithBase64;
    }

    // Delete bookmark
    async deleteBookmark(bookmarkId,) {
        return await BookmarkModel.findOneAndDelete({ _id : bookmarkId });
    }
}

module.exports = new BlogService(); 