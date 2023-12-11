const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    senderUser_id: {
        type: ObjectId,
        required: true,
    },
    receivedUser_id: {
        type: ObjectId,
        required: true,
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

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
