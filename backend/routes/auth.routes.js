const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Login route
router.post('/login', authController.login);

// Admin login route
router.post('/login/admin', authController.adminLogin);

// Register route
router.post('/register', authController.register);

module.exports = router; 