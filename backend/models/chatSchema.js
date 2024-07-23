import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    text: String,
    user: String,
    create_at: {
        type: Date,
        default: Date.now(),
    }
});

const chatModel = mongoose.model('chats', chatSchema);

module.exports = chatModel;