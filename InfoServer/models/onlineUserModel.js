const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const onlineUserSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    socket_id: {
        type: String,
        required: true,
    },
});

const OnlineUser = mongoose.model("OnlineUser", onlineUserSchema);

module.exports = OnlineUser;
