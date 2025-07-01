const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all users
router.get('/', userController.getAllUsers);

// Get user by id
router.get('/userById', authMiddleware, userController.getUserById);

// Get profile
router.get('/profile', authMiddleware, userController.getProfile);

// Create user
router.post('/add', userController.createUser);

// Update user
router.patch('/update/:id', userController.updateUser);

// Delete user
router.delete('/delete/:id', userController.deleteUser);

module.exports = router; 