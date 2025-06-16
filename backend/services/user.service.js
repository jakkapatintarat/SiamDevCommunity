const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const userModel = require('../models/userSchema');

const userService = {
    // Get all users
    async getAllUsers() {
        return await userModel.find();
    },

    // Get user by id
    async getUserById(userId) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('no have this user');
        }
        return user;
    },

    // Create user
    async createUser(userData) {
        const { username, password, email, fname, lname, tel } = userData;
        const existingUser = await userModel.findOne({ username });
        const existingEmail = await userModel.findOne({ email });

        if (existingUser) {
            throw new Error('username is already use');
        }
        if (existingEmail) {
            throw new Error('email is already use');
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
        return { newUser };
    },

    // Update user
    async updateUser(userId, updateData) {
        const { username, password, email, fname, lname, tel } = updateData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { username, password: hashedPassword, email, fname, lname, tel },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('No have user!. Can\'t update');
        }

        return { message: `update ${userId} success!`, updatedUser };
    },

    // Delete user
    async deleteUser(userId) {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('Already no have user!. Can\'t delete');
        }
        return { message: `delete ${userId} success!`, deletedUser };
    }
};

module.exports = userService; 