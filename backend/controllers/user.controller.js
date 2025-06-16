const userService = require('../services/user.service');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users).status(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get user by id
    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.json({ message: error.message });
        }
    },

    // Create user
    async createUser(req, res) {
        try {
            const result = await userService.createUser(req.body);
            res.json(result);
        } catch (error) {
            res.json({ message: error.message });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await userService.updateUser(userId, req.body);
            res.json(result);
        } catch (error) {
            res.json({ message: error.message });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await userService.deleteUser(userId);
            res.json(result);
        } catch (error) {
            res.json({ message: error.message });
        }
    }
};

module.exports = userController; 