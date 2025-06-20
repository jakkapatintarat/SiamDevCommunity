const adminBlogService = require('../services/adminBlog.service');

const AdminBlogController ={
    // Get all admin blogs
    async getAllAdminBlogs(req, res) {
        try {
            const blogs = await adminBlogService.getAllAdminBlogs();
            res.json({ message: 'ดึงข้อมูลบทความแอดมินสำเร็จ', blogs });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความแอดมิน', error });
        }
    },

    // Get admin blog by id
    async getAdminBlogById(req, res) {
        try {
            const blog = await adminBlogService.getAdminBlogById(req.params.id);
            if (!blog) {
                return res.status(404).json({ message: 'ไม่พบบทความแอดมิน' });
            }
            res.json(blog);
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความแอดมิน', error });
        }
    },

    // Create admin blog
    async createAdminBlog(req, res) {
        try {
            const blogData = {
                ...req.body,
                image: req.file ? req.file.path : null
            };
            const blog = await adminBlogService.createAdminBlog(blogData);
            res.status(201).json({ message: 'สร้างบทความแอดมินสำเร็จ', blog });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างบทความแอดมิน', error });
        }
    },

    // Update admin blog
    async updateAdminBlog(req, res) {
        try {
            const blogData = {
                ...req.body,
                image: req.file ? req.file.path : undefined
            };
            const blog = await adminBlogService.updateAdminBlog(req.params.id, blogData);
            if (!blog) {
                return res.status(404).json({ message: 'ไม่พบบทความแอดมิน' });
            }
            res.json({ message: 'อัพเดทบทความแอดมินสำเร็จ', blog });
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัพเดทบทความแอดมิน', error });
        }
    },

    // Delete admin blog
    async deleteAdminBlog(req, res) {
        try {
            const deletedBlog = await adminBlogService.deleteAdminBlog(req.params.id);
            if (deletedBlog) {
                res.json({ message: 'ลบบทความแอดมินสำเร็จ', blog: deletedBlog });
            } else {
                res.status(404).json({ message: 'ไม่พบบทความแอดมิน' });
            }
        } catch (error) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบบทความแอดมิน', error });
        }
    }
}

module.exports = AdminBlogController; 