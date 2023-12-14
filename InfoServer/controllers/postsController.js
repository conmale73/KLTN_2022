const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/userModel");
const Group = require("../models/groupModel");

// @desc    Add a new post
// @route   POST /api/posts
// @access  Public
exports.post = async (req, res, next) => {
    try {
        const { user_id, content, privacy, group_id } = req.body;

        // Create an array to hold the files with binary data
        const filesForResponse = [];
        for (const file of content.files) {
            // Convert the base64 data to a binary Buffer
            const base64Data = file.dataURL.split(",")[1];

            // Create an object with the binary data and other file info

            const fileForResponse = {
                dataURL: base64Data,
                fileInfo: file.fileInfo,
            };

            filesForResponse.push(fileForResponse);
        }

        // Update the content with the files containing binary data
        content.files = filesForResponse;

        const newPost = new Post({ user_id, content, privacy, group_id });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

// @desc    Get post by id
// @route   GET /api/posts/:post_id
exports.getPostById = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { user_id } = req.body;

        const post = await Post.findById(post_id);

        if (!post) {
            return next(
                new ErrorResponse(`Post with id ${post_id} not found`, 404)
            );
        }
        if (post.privacy === "PUBLIC") {
            res.status(200).json({
                success: true,
                data: post,
            });
        } else if (post.privacy === "PRIVATE") {
            if (post.user_id != user_id) {
                res.status(200).json({
                    success: true,
                    data: post,
                });
            } else {
                res.status(200).json({
                    success: false,
                    data: null,
                    message: "You don't have permission to view this post",
                });
            }
        } else if (post.privacy === "GROUP") {
            const group = await Group.findById(post.group_id);
            if (group.members.includes(user_id)) {
                res.status(200).json({
                    success: true,
                    data: post,
                });
            }
        } else {
            res.status(200).json({
                success: false,
                data: null,
                message: "You don't have permission to view this post",
            });
        }
    } catch (error) {
        next(error);
    }
};
// @desc    Get all posts of a user
// @route   POST /api/posts/user/:user_id
exports.getPostsByUserID = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalPosts = await Post.find({ user_id }).countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        console.log(totalPosts);
        const posts = await Post.find({ user_id })
            .sort({ createAt: -1 }) // Sort by createAt in ascending order
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

        const posts = await Post.find({ user_id, privacy: "PUBLIC" }) // Filter by user_id and privacy
            .sort({ createAt: -1 }) // Sort by createAt in ascending order
            .skip(startIndex)
            .limit(limit);

        posts.forEach((post) => {
            const commentCount = Comment.find({
                post_id: post._id,
            }).countDocuments();
            post.commentCount = commentCount;
        });
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

// @desc    Like a post
// @route   POST /api/posts/like/:post_id
exports.likePost = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { user_id } = req.body;

        const post = await Post.findById(post_id);

        if (!post) {
            return next(
                new ErrorResponse(`Post with id ${post_id} not found`, 404)
            );
        }

        // Check if the post has already been liked
        if (post.likes.find((like) => like.user_id == user_id)) {
            return next(
                new ErrorResponse(
                    `Post with id ${post_id} has already been liked by user with id ${user_id}`,
                    400
                )
            );
        } else {
            post.likes.push({ user_id });

            await post.save();

            res.status(200).json({
                success: true,
                data: post,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Unlike a post
// @route   PATCH /api/posts/unlike/:post_id
exports.unlikePost = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { user_id } = req.body;

        const post = await Post.findById(post_id);

        if (!post) {
            return next(
                new ErrorResponse(`Post with id ${post_id} not found`, 404)
            );
        }

        // Check if the post has already been liked
        if (!post.likes.find((like) => like.user_id == user_id)) {
            return next(
                new ErrorResponse(
                    `Post with id ${post_id} has not been liked by user with id ${user_id}`,
                    400
                )
            );
        } else {
            post.likes = post.likes.filter((like) => like.user_id != user_id);

            await post.save();

            res.status(200).json({
                success: true,
                data: post,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get newsfeed
// @route   GET /api/posts/newsfeed/:user_id
// @access  Public
exports.getNewsfeed = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;

        const friendList = await User.find(); // Change with real friendlist later
        const friendIDs = friendList.map((friend) => friend._id.toString());

        const totalPosts = await Post.find({
            user_id: { $in: friendIDs },
        }).countDocuments();

        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find({
            user_id: { $in: friendIDs },
        })
            .sort({ createAt: -1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: posts,
            page,
            totalPages: totalPages,
        });
    } catch (error) {
        next(error);
    }
};
