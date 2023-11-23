const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const groupChatSchema = new mongoose.Schema({
    group_name: {
        type: String,
        default: "",
    },
    group_thumbnail: {},
    group_id: {
        type: ObjectId,
        default: null,
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
