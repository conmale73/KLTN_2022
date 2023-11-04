const Post = require("../models/postModel");
const express = require("express");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Add a new post
// @route   POST /api/posts
// @access  Public
exports.post = async (req, res, next) => {
    try {
        const { user_id, content, privacy } = req.body;

        // Create an array to hold the files with binary data
        const filesWithBinary = [];

        for (const file of content.files) {
            // Convert the base64 data to a binary Buffer
            const base64Data = file.dataURL.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");

            // Create an object with the binary data and other file info
            const fileWithBinary = {
                dataURL: buffer,
                fileInfo: file.fileInfo,
            };

            filesWithBinary.push(fileWithBinary);
        }

        // Update the content with the files containing binary data
        content.files = filesWithBinary;

        const newPost = new Post({ user_id, content, privacy });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all posts of a user
// @route   POST /api/posts/:user_id
exports.getPostsByUserID = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalPosts = await Post.find({ user_id }).countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find({ user_id })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: posts,
            page,
            totalPages,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get public posts of a user
// @route   POST /api/posts/:user_id
exports.getPublicPostsByUserID = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find({ user_id }, { privacy: "public" })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: posts,
            page,
            totalPages,
        });
    } catch (error) {
        next(error);
    }
};
