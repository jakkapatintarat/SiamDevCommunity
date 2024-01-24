const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;