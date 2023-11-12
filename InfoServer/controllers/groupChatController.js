const GroupChat = require("../models/groupChatModel");

// @desc    Create a new group chat
// @route   POST /api/groupChats
// @access  Public
exports.createGroupChat = async (req, res, next) => {
    try {
        const { group_id, members } = req.body;

        const newGroupChat = new GroupChat({ group_id, members });

        const savedGroupChat = await newGroupChat.save();
        res.status(201).json(savedGroupChat);
    } catch (error) {
        next(error);
    }
};

// @desc    Get a group chat by id
// @route   GET /api/groupChats/:group_chat_id
// @access  Public
exports.getGroupChatByID = async (req, res, next) => {
    try {
        const { group_chat_id } = req.params;

        const groupChat = await GroupChat.findOne({ _id: group_chat_id });

        res.status(200).json({
            success: true,
            data: groupChat,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all group chats by user id
// @route   GET /api/groupChats/user/:user_id
// @access  Public
exports.getGroupChatsByUserID = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const groupChats = await GroupChat.find({ members: user_id });

        res.status(200).json({
            success: true,
            data: groupChats,
        });
    } catch (error) {
        next(error);
    }
};
