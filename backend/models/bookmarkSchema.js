const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: String,
    blogId: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
});

const BookmarkModel = mongoose.model('bookmark', bookmarkSchema);

module.exports = BookmarkModel;