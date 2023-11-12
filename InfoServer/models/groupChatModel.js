const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const groupChatSchema = new mongoose.Schema({
    group_id: {
        type: ObjectId,
        required: true,
    },
    members: [
        {
            type: ObjectId,
        },
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const GroupChat = mongoose.model("GroupChat", groupChatSchema);

module.exports = GroupChat;
