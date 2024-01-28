const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fname: String,
    lname: String,
    tel: String,
    role: String,
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;