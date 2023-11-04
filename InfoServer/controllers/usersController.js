const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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

// Create a user
exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Create a new user
        const newUser = new User({ username, email, password });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
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
