const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    profileImg: {
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
});

const CommentsModel = mongoose.model('comments', commentSchema);

module.exports = CommentsModel;