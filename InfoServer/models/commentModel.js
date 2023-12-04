const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: {
        type: ObjectId,
        required: true,
    },
    user_info: {
        user_id: {
            type: ObjectId,
            required: true,
        },
        avatar: {
            type: String, // Assuming the image is a URL
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

