const OnlineUser = require("../models/onlineUserModel");

exports.addOnlineUser = async (req, res, next) => {
    try {
        const { user_id, socket_id } = req.body;

        const newOnlineUser = new OnlineUser({ user_id, socket_id });

        const savedOnlineUser = await newOnlineUser.save();
        res.status(201).json(savedOnlineUser);
    } catch (error) {
        next(error);
    }
};

exports.getOnlineUsers = async (req, res, next) => {
    try {
        const onlineUsers = await OnlineUser.find();
        res.status(200).json({
            success: true,
            data: onlineUsers,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOnlineUser = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const deletedOnlineUser = await OnlineUser.findOneAndDelete({
            user_id,
        });
        res.status(200).json({
            success: true,
            data: deletedOnlineUser,
        });
    } catch (error) {
        next(error);
    }
};
