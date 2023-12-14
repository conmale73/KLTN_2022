const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// Create a user
exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Path to the default avatar in the "assets" folder
        const defaultAvatarPath = path.join(
            __dirname,
            "..",
            "assets",
            "defaultUserAvatar.png"
        );
        const defaultBackgroundPath = path.join(
            __dirname,
            "..",
            "assets",
            "defaultUserBackground.png"
        );
        // Read the default thumbnail image as a buffer
        const avatarBuffer = fs.readFileSync(defaultAvatarPath);
        const base64Avatar = avatarBuffer.toString("base64");

        const backgroundBuffer = fs.readFileSync(defaultBackgroundPath);
        const base64Background = backgroundBuffer.toString("base64");

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
            background: {
                files: [
                    {
                        dataURL: base64Background,
                        fileInfo: {
                            type: "image/png",
                            name: "defaultUserBackground.png",
                            size: backgroundBuffer.length,
                            lastModified: new Date().getTime(),
                        },
                    },
                ],
            },
            avatar: {
                files: [
                    {
                        dataURL: base64Avatar,
                        fileInfo: {
                            type: "image/png",
                            name: "defaultUserAvatar.png",
                            size: avatarBuffer.length,
                            lastModified: new Date().getTime(),
                        },
                    },
                ],
            },
        });

        // Save the user to the database
        const userToResponse = await newUser.save();

        // res.status(201).json({ message: "User created successfully" });
        res.status(201).json({ success: true, data: userToResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// Get a single user
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
// Get a single user by email
exports.getUserByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// Update a user info
exports.updateUserInfo = async (req, res, next) => {
    try {
        const { user_id, username, description, musicType, birthday, phone } =
            req.body;

        const user = User.findById(user_id);

        if (!user) {
            return next(new ErrorResponse(`User not found`, 404));
        }

        const updateUser = await User.findByIdAndUpdate(
            user_id,
            {
                username,
                description,
                musicType,
                birthday,
                phone,
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: updateUser });
    } catch (error) {
        next(error);
    }
};

//Update a user avatar
exports.updateUserAvatar = async (req, res, next) => {
    try {
        const { user_id, avatar } = req.body;

        const user = User.findById(user_id);

        if (!user) {
            return next(new ErrorResponse(`User not found`, 404));
        }
        // Create an array to hold the files with binary data
        const filesForResponse = [];
        for (const file of avatar.files) {
            // Convert the base64 data to a binary Buffer
            const base64Data = file.dataURL.split(",")[1];

            // Create an object with the binary data and other file info

            const fileForResponse = {
                dataURL: base64Data,
                fileInfo: file.fileInfo,
            };

            filesForResponse.push(fileForResponse);
        }

        // Update the avatar with the files containing binary data
        avatar.files = filesForResponse;

        const updateUser = await User.findByIdAndUpdate(
            user_id,
            {
                avatar,
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: updateUser });
    } catch (error) {
        next(error);
    }
};

//Update a user background
exports.updateUserBackground = async (req, res, next) => {
    try {
        const { user_id, background } = req.body;

        const user = User.findById(user_id);

        if (!user) {
            return next(new ErrorResponse(`User not found`, 404));
        }

        const updateUser = await User.findByIdAndUpdate(
            user_id,
            {
                background,
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: updateUser });
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Logout user
exports.logout = async (req, res, next) => {
    try {
        // Clear user token
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

// @desc    Search users by username
// @route   GET /api/users/search/:username
// @access  Public
exports.searchUsersByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;

        // Validate and sanitize input
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or limit value.",
            });
        }

        const startIndex = (page - 1) * limit;

        const users = await User.find(
            { username: { $regex: new RegExp(username, "i") } },
            { _id: 1 }
        )
            .skip(startIndex)
            .limit(limit);

        const totalResults = await User.countDocuments({
            username: { $regex: new RegExp(username, "i") },
        });

        const totalPages = Math.ceil(totalResults / limit);

        // Extract _id values into an array of strings
        const userIds = users.map((user) => user._id.toString());

        res.status(200).json({
            success: true,
            data: userIds,
            page,
            limit,
            totalResults,
            totalPages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
