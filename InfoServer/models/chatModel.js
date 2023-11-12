const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    first_id: {
        type: String,
        required: true,
    },
    second_id: {
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

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
