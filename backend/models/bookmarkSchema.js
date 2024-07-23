const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    blogId: {type: mongoose.Schema.Types.ObjectId, ref: 'blogs'},
    create_at: {
        type: Date,
        default: Date.now(),
    },
});

const BookmarkModel = mongoose.model('bookmark', bookmarkSchema);

module.exports = BookmarkModel;