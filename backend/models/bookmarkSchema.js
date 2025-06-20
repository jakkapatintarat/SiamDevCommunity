const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = BookmarkModel;
