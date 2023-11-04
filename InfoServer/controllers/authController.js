const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const express = require("express");
const bcrypt = require("bcrypt");
// Sign up
exports.signup = async (req, res, next) => {
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

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Log in
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
        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                registration_date: user.registration_date,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

// Log out
exports.logout = async (req, res, next) => {
    try {
        // Clear the token from the user's tokens array
        req.user.tokens = [];
        await req.user.save();

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};
