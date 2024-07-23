const mongoose = require('mongoose');

const AdminBlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    img: String,
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

const AdminBlogModel = mongoose.model('adminblogs', AdminBlogSchema);

module.exports = AdminBlogModel;