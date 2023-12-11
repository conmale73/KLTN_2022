const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const friendStatusSchema = new mongoose.Schema({
    user_id: {// receivedUser_id
        type: ObjectId,
        required: true,
    },
    acceptList: [
        {
            user_accept_id: {
                type: ObjectId,
                required: true,
            },
        },
    ],
    awaitingList: [
        {
            user_awaiting_id: {
                type: ObjectId,
                required: true,
            },
        },
    ],
});

const FriendStatus = mongoose.model("FriendStatus", friendStatusSchema);

module.exports = FriendStatus;
