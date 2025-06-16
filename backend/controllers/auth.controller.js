const authService = require('../services/auth.service');

const authController = {
    // Login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.send(result);
        } catch (error) {
            res.status(401).send(error.message);
        }
    },

    // Admin Login
    async adminLogin(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.adminLogin(email, password);
            console.log(result);
            res.send(result);
        } catch (error) {
            res.status(401).send(error.message);
        }
    },

    // Register
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            res.json(result);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
};

module.exports = authController; 