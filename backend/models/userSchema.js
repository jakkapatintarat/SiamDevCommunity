const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fname: String,
    lname: String,
    tel: String,
    role: String,
    img: String,
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