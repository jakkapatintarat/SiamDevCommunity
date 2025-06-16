const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');
const userModel = require('../models/userSchema');

const authService = {
    // Login
    async login(username, password) {
        const user = await userModel.findOne({ username });
        if (!user) {
            throw new Error('not register');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('user name or password is not valid');
        }

        const { password: _, ...result } = user._doc;
        const token = jwt.sign({ result }, 'secret', { expiresIn: '1h' });
        return { message: "login success", user: result, token };
    },

    // Admin Login
    async adminLogin(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('not register');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('user name or password is not valid');
        }

        const { password: _, ...result } = user._doc;
        if (result.role !== 'admin') {
            throw new Error('you are not admin');
        }

        const token = jwt.sign({ result }, 'secret', { expiresIn: '1h' });
        return { message: "login success", user: result, token };
    },

    // Register
    async register(userData) {
        const { username, password, email, fname, lname, tel } = userData;
        const existingUser = await userModel.findOne({ username });
        
        if (existingUser) {
            throw new Error('username already exist');
        }

        const avatar = faker.image.avatar();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email,
            fname,
            lname,
            tel,
            role: 'user',
            img: avatar
        });

        await newUser.save();

        const payloadToken = {
            username: newUser.username,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname,
            tel: newUser.tel,
            role: newUser.role,
            img: newUser.img,
        };

        const token = jwt.sign(payloadToken, 'secret', { expiresIn: '1h' });
        return { newUser, token };
    }
};

module.exports = authService; 