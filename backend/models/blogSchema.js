const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    author: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    update_at: {
        type: Date,
        default: Date.now(),
    }
});

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;