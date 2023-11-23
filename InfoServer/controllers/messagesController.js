const Message = require("../models/messageModel");

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res, next) => {
    try {
        const { chat_id, sender_id, sender_name, content } = req.body;

        const newMessage = new Message({
            chat_id,
            sender_id,
            sender_name,
            content,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all messages by chat id
// @route   GET /api/messages/chat/:chat_id
// @access  Public
exports.getMessagesByChatID = async (req, res, next) => {
    try {
        const { chat_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalPosts = await Message.countDocuments({ chat_id });
        const totalPages = Math.ceil(totalPosts / limit);

        const messages = await Message.find({ chat_id })
            .sort({ timeStamp: -1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: messages,
            page,
            totalPages,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get last message by chat id
// @route   GET /api/messages/last/:chat_id
// @access  Public

exports.getLastMessageByChatID = async (req, res, next) => {
    try {
        const { chat_id } = req.params;

        const lastMessage = await Message.findOne({ chat_id }).sort({
            timeStamp: -1,
        });

        res.status(200).json({
            success: true,
            data: lastMessage,
        });
    } catch (error) {
        next(error);
    }
};
