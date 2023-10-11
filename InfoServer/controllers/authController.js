const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const express = require("express");
const bcrypt = require("bcrypt");
// Sign up
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Create the user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate JWT token
        const token = user.generateAuthToken();

        res.status(201).json({ success: true, token });
    } catch (error) {
        next(error);
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
        res.json({ token });
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
