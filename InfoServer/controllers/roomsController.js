const { ObjectId } = require("mongodb");
const Room = require("../models/roomModel");
const User = require("../models/userModel");
const GroupChat = require("../models/groupChatModel");

// @desc    Create a new room
// @route   POST /api/rooms
// @access  Public
exports.createRoom = async (req, res, next) => {
    try {
        const { name, creator_id, privacy, description } = req.body;

        const newRoom = new Room({
            name,
            creator_id,
            privacy,
            description,
            participants: [creator_id],
        });
        const newGroupChat = new GroupChat({
            group_id: newRoom._id,
            members: [creator_id],
        });
        const savedRoom = await newRoom.save();
        const savedGroupChat = await newGroupChat.save();

        const updatedRoom = await Room.findOneAndUpdate(
            { _id: newRoom._id },
            { chat_id: savedGroupChat._id },
            { new: true }
        );

        res.status(201).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};
// @desc    Join a room
// @route   POST /api/rooms/join/:room_id
// @access  Public
exports.joinRoom = async (req, res, next) => {
    try {
        const { room_id } = req.params;

        const room = await Room.findOne({ _id: room_id });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        } else {
            const { participants } = room;

            const groupChat = await GroupChat.findOne({
                group_id: room_id,
            });

            const { members } = groupChat;

            if (
                participants.includes(req.body.user_id) &&
                members.includes(req.body.user_id)
            ) {
                return res.status(201).json(room);
            } else if (
                participants.includes(req.body.user_id) &&
                !members.includes(req.body.user_id)
            ) {
                members.push(req.body.user_id);

                const updatedGroupChat = await GroupChat.findOneAndUpdate(
                    { group_id: room_id },
                    { members },
                    { new: true }
                );
                return res.status(201).json(room);
            } else if (
                !participants.includes(req.body.user_id) &&
                members.includes(req.body.user_id)
            ) {
                participants.push(req.body.user_id);

                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: room_id },
                    { participants },
                    { new: true }
                );

                res.status(201).json(updatedRoom);
            } else if (
                !participants.includes(req.body.user_id) &&
                !members.includes(req.body.user_id)
            ) {
                participants.push(req.body.user_id);
                members.push(req.body.user_id);

                const updatedGroupChat = await GroupChat.findOneAndUpdate(
                    { group_id: room_id },
                    { members },
                    { new: true }
                );
                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: room_id },
                    { participants },
                    { new: true }
                );

                res.status(201).json(updatedRoom);
            }
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Quit a room
// @route   POST /api/rooms/quit/:room_id
// @access  Public
exports.quitRoom = async (req, res, next) => {
    try {
        const { room_id } = req.params;

        const room = await Room.findOne({ _id: room_id });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        } else {
            const { participants } = room;

            if (participants.includes(req.body.user_id)) {
                participants.splice(participants.indexOf(req.body.user_id), 1);

                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: room_id },
                    { participants },
                    { new: true }
                );

                res.status(201).json(updatedRoom);
            } else {
                return res.status(201).json(room);
            }
        }
    } catch (error) {
        next(error);
    }
};
// @desc    Get room by id
// @route   POST /api/rooms/:room_id
// @access  Public
exports.getRoomByID = async (req, res, next) => {
    try {
        const { room_id } = req.params;

        const room = await Room.findOne({ _id: room_id });

        const creator_id = room.creator_id.toString();

        const creator = await User.findOne({ _id: creator_id });

        room.creator_id = creator;

        res.status(200).json({
            success: true,
            data: room,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all public rooms
// @route   GET /api/rooms
// @access  Public
exports.getAllPublicRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({ privacy: "PUBLIC" });

        res.status(200).json({
            success: true,
            data: rooms,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all rooms (admin only)
// @route   GET /api/rooms
// @access  Public
exports.getAllRooms = async (req, res, next) => {
    try {
        const user_id = new ObjectId(req.body.user_id);

        if (user_id != "64a572c866ab977f9fc0bdd7") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        } else {
            const rooms = await Room.find();

            res.status(200).json({
                success: true,
                data: rooms,
            });
        }
    } catch (error) {
        next(error);
    }
};
