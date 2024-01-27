const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    img: String,
    author: String,
});

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;