const blogService = require('../services/blog.service');

class BlogController {
    // Get all blogs
    async getAllBlogs(req, res) {
        try {
            const blogs = await blogService.getAllBlogs();
            res.json({
                message: 'ดึงข้อมูลบทความสำเร็จ',
                blogs: blogs
            });
        } catch (error) {
            console.error('Error in getAllBlogs:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ' });
        }
    }

    // Get blog by id
    async getBlogById(req, res) {
        try {
            const blog = await blogService.getBlogById(req.query.blogId);
            if (!blog) {
                return res.status(404).json({ message: 'ไม่พบบทความ' });
            }
            res.json(blog);
        } catch (error) {
            console.error('Error in getBlogById:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ' });
        }
    }

    // Create new blog
    async createBlog(req, res) {
        try {
            const blogData = {
                ...req.body,
                img: req.file ? req.file.path : null
            };
            const blog = await blogService.createBlog(blogData);
            res.status(201).json({
                message: 'สร้างบทความสำเร็จ',
                blog: blog
            });
        } catch (error) {
            console.error('Error in createBlog:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างบทความ' });
        }
    }

    // Update blog
    async updateBlog(req, res) {
        try {
            const blogData = {
                ...req.body,
                img: req.file ? req.file.path : undefined
            };
            const blog = await blogService.updateBlog(req.params.id, blogData);
            if (!blog) {
                return res.status(404).json({ message: 'ไม่พบบทความ' });
            }
            res.json({
                message: 'อัพเดทบทความสำเร็จ',
                blog: blog
            });
        } catch (error) {
            console.error('Error in updateBlog:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัพเดทบทความ' });
        }
    }

    // Delete blog
    async deleteBlog(req, res) {
        try {
            const blogId = req.params.id;
            const deletedBlog = await blogService.deleteBlog(blogId);
            
            if (deletedBlog) {
                res.json({ message: 'ลบ blog สำเร็จ', blog: deletedBlog });
            } else {
                res.status(404).json({ message: 'ไม่พบ blog นี้' });
            }
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบ blog', error });
        }
    }

    // Get all comments for a blog
    async getBlogComments(req, res) {
        try {
            const blogId = req.params.id;
            const comments = await blogService.getBlogComments(blogId);
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล comments', error });
        }
    }

    // Add comment to blog
    async addComment(req, res) {
        try {
            const blogId = req.params.id;
            const { comment, userId, username, profileImg } = req.body;
            
            const newComment = await blogService.addComment(blogId, {
                comment,
                userId,
                username,
                profileImg
            });
            
            res.json({ message: 'เพิ่มความคิดเห็นสำเร็จ', comment: newComment });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น', error });
        }
    }

    // Create bookmark
    async createBookmark(req, res) {
        try {
            const blogId = req.body.blogId;
            const userId = req.body.userId;
            const bookmark = await blogService.createBookmark(blogId, userId);

            if (bookmark.status === 400) {
                return res.status(400).json({ message: bookmark.message });
            }

            
            res.json({ message: 'เพิ่มรายการบันทึกสำเร็จ', bookmark: bookmark });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มรายการบันทึก', error });
        }
    }

    // Get all bookmark 
    async getAllBookmark(req, res) {
        try {
            const userId = req.params.userId;
            const bookmark = await blogService.getAllBookmark(userId);
            res.json({ message: 'ดึงข้อมูลรายการบันทึกสำเร็จ', bookmark: bookmark });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายการบันทึก', error });
        }
    }

    // Delete bookmark
    async deleteBookmark(req, res) {
        try {
            const blogId = req.params.id;
            const bookmark = await blogService.deleteBookmark(blogId);
            res.json({ message: 'ลบรายการบันทึกสำเร็จ', bookmark: bookmark });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบรายการบันทึก', error });
        }
    }

    // Get all comments
    async getAllComments(req, res) {
        try {
            const comments = await blogService.getAllComments();
            res.json({ message: 'ดึงข้อมูลความคิดเห็นสำเร็จ', comments: comments });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น', error });
        }
    }
}

module.exports = new BlogController(); 