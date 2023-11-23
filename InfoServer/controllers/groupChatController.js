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

        // Find group chats where members include user_id and group_id is not null
        const groupChats = await GroupChat.find({
            members: user_id,
            group_id: { $ne: null },
        });

        res.status(200).json({
            success: true,
            data: groupChats,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all chats by user id
// @route   GET /api/groupChats/all/:user_id
// @access  Public
exports.getAllChatsByUserID = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        // Find group chats where members include user_id
        const groupChats = await GroupChat.find({
            members: user_id,
        });

        res.status(200).json({
            success: true,
            data: groupChats,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get group chat of two users. If it doesn't exist, create one.
// @route   GET /api/groupChats/two/
// @access  Public
exports.getGroupChatOfTwoUsers = async (req, res, next) => {
    try {
        const { members } = req.body;
        if (members.length != 2) {
            res.status(400).json({
                success: false,
                error: "Number of members must be 2",
            });
        } else {
            const groupChats = await GroupChat.findOne({
                members: { $all: members },
                group_id: null,
            });

            if (!groupChats) {
                const newGroupChat = new GroupChat({ members });
                const savedGroupChat = await newGroupChat.save();
                res.status(201).json(savedGroupChat);
            } else {
                res.status(200).json(groupChats);
            }
        }
    } catch (error) {
        next(error);
    }
};
