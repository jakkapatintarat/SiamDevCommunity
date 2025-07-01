const userService = require('../services/user.service');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ success: true, message: "ดึงข้อมูลผู้ใช้ทั้งหมดสำเร็จ", data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ทั้งหมด", error: error.message });
        }
    },

    // Get user by id
    async getUserById(req, res) {
        try {
            const userId = req.query.userId;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "ไม่พบผู้ใช้ที่ระบุ" });
            }
            res.status(200).json({ success: true, message: "ดึงข้อมูลผู้ใช้สำเร็จ", data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error: error.message });
        }
    },

    // Get profile
    async getProfile(req, res) {
        try {
            const userId = req.user._id;
            const profile = await userService.getProfile(userId);
            if (!profile) {
                return res.status(404).json({ success: false, message: "ไม่พบโปรไฟล์ผู้ใช้" });
            }
            res.status(200).json({ success: true, message: "ดึงโปรไฟล์สำเร็จ", data: profile });
        } catch (error) {
            res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงโปรไฟล์", error: error.message });
        }
    },

    // Create user
    async createUser(req, res) {
        try {
            const result = await userService.createUser(req.body);
            res.status(201).json({ success: true, message: "สร้างผู้ใช้ใหม่สำเร็จ", data: result });
        } catch (error) {
            res.status(400).json({ success: false, message: "เกิดข้อผิดพลาดในการสร้างผู้ใช้ใหม่", error: error.message });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await userService.updateUser(userId, req.body);
            if (!result) {
                return res.status(404).json({ success: false, message: "ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
            }
            res.status(200).json({ success: true, message: "อัปเดตข้อมูลผู้ใช้สำเร็จ", data: result });
        } catch (error) {
            res.status(400).json({ success: false, message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้", error: error.message });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await userService.deleteUser(userId);
            if (!result) {
                return res.status(404).json({ success: false, message: "ไม่พบผู้ใช้ที่ต้องการลบ" });
            }
            res.status(200).json({ success: true, message: "ลบผู้ใช้สำเร็จ", data: result });
        } catch (error) {
            res.status(400).json({ success: false, message: "เกิดข้อผิดพลาดในการลบผู้ใช้", error: error.message });
        }
    }
};

module.exports = userController; 