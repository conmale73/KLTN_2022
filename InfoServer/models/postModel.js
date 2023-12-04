const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: Object,
        required: true,

        text: {
            type: String,
        },
        files: [
            {
                dataURL: {
                    type: Buffer,
                },
                fileInfo: {
                    type: Object,
                },
            },
        ],
    },
    likes: [
        {
            user_id: {
                type: ObjectId,
            },
            timeStamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    privacy: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
