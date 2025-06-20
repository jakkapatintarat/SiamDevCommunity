const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {     
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true, 
    },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    update_at: {
        type: Date,
        default: Date.now(),
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;