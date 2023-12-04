const User = require("../models/userModel");
const Message = require("../models/messageModel");
const GroupChat = require("../models/groupChatModel");

exports.fixSenderName = async (req, res, next) => {
    try {
        const messages = await Message.find();

        const users = await User.find();

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const user = users.find(
                (user) => user._id.toString() === message.sender_id.toString()
            );
            message.sender_name = user.username;
            await message.save();
        }
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
};