const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const Comment = require("../models/commentModel");

// @desc    Add a new post
// @route   POST /api/posts
// @access  Public
exports.post = async (req, res, next) => {
    try {
        const { user_id, content, privacy } = req.body;

        // Create an array to hold the files with binary data
        const filesWithBinary = [];
        const filesForResponse = [];
        for (const file of content.files) {
            // Convert the base64 data to a binary Buffer
            const base64Data = file.dataURL.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");

            // Create an object with the binary data and other file info
            const fileWithBinary = {
                dataURL: buffer,
                fileInfo: file.fileInfo,
            };
            const fileForResponse = {
                dataURL: base64Data,
                fileInfo: file.fileInfo,
            };

            filesWithBinary.push(fileWithBinary);
            filesForResponse.push(fileForResponse);
        }

        // Update the content with the files containing binary data
        content.files = filesForResponse;

        const newPost = new Post({ user_id, content, privacy });

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

        const post = await Post.findById(post_id);

        if (!post) {
            return next(
                new ErrorResponse(`Post with id ${post_id} not found`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: post,
        });
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

        // Lấy toàn bộ dữ liệu
        const posts = await Post.find({ user_id });

        // Đảo ngược mảng
        const reversedPosts = posts.reverse();

        const startIndex = (page - 1) * limit;
        const slicedPosts = reversedPosts.slice(startIndex, startIndex + limit);

        const totalPosts = reversedPosts.length;
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            success: true,
            data: slicedPosts,
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

exports.likePostByUser = async (req, res) => {

    const { post_id, email_like } = req.body;
    try {
        const post = await Post.findOne({ _id: post_id });

        // Kiểm tra xem userEmail đã tồn tại trong mảng hay không
        const isUserLiked = post.likeUserList.some(user => user.email === email_like);

        if (isUserLiked) {
            // Nếu userEmail đã tồn tại, xóa nó
            await Post.updateOne({ _id: post_id }, { $pull: { likeUserList: { email: email_like } } });
        } else {
            // Nếu userEmail chưa tồn tại, thêm mới
            await Post.updateOne({ _id: post_id }, { $addToSet: { likeUserList: { email: email_like } } });
        }

        // Lấy lại bản ghi sau khi cập nhật
        const updatedPost = await Post.findOne({ _id: post_id });
        const countEmail = updatedPost.likeUserList.length;
        console.log('Post after toggle like:', updatedPost);
        res.status(200).json({
            result: true,
            countEmail: countEmail
        });
    } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//count like
exports.getDetailPostById = async (req, res) => {
    const { post_id } = req.params;
    try {
        const post = await Post.findOne({ _id: post_id });
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.putPostById = async (req, res) => {
    const { post_id, content, privacy } = req.body;
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: post_id },
            { $set: { content, privacy } }, // Cập nhật các trường mong muốn
            { new: true } // Trả về bản ghi sau khi cập nhật
        );
        if (!updatedPost) {
            // Nếu không tìm thấy bài viết
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deletePostById = async (req, res) => {
    const { post_id } = req.body;
    try {
        //Xóa tất cả các comment của bài viết
        await Comment.deleteMany({ post_id: post_id });
        //Xóa bài viết
        const deletedPost = await Post.findOneAndDelete({ _id: post_id });
        if (!deletedPost) {//không thấy bài viết
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post and associated comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};