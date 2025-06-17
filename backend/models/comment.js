const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: String,
    userId: String,
    username: String,
    comment: String,
    profileImg: String,
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