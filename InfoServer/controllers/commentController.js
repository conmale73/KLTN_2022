const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const ErrorResponse = require("../utils/errorResponse");
const { ObjectId } = require("mongodb");
const Comment = require("../models/commentModel");

// @desc    Add a new comment
// @route   POST /api/comments
// @access  Public
exports.postComment = async (req, res, next) => {
    try {
        const { post_id, creator, content } = req.body;

//get all comment
exports.getAllComment = async (req, res) => {
    try {
        const comments = await Comment.find();
        console.log(comments)
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllCommentByPostId = async (req, res) => {
        const { post_id } = req.params;

    try {
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page
        // Lấy toàn bộ dữ liệu
        const comments = await Comment.find({ post_id });

        // Đảo ngược mảng
        const reversedComments = comments.reverse();
        //const reversedComments = comments;
        const startIndex = (page - 1) * limit;
        const slicedComments = reversedComments.slice(startIndex, startIndex + limit);

        const totalPosts = reversedComments.length;
        const totalPages = Math.ceil(totalPosts / limit);
        // const components = await Comment.find({ post_id });
        // console.log(components)
        // res.status(200).json(components);
        res.status(200).json({
            success: true,
            data: slicedComments,
            page,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// post comment
exports.addNewComment = async (req, res) => {

    let newComment = req.body;

    let user_info = {
        user_id: new ObjectId(newComment.user_info.user_id),
        avatar: newComment.user_info.avatar,
        username: newComment.user_info.username
        }

    let dataPost = {
        post_id: new ObjectId(newComment.post_id),
        user_info: user_info,
        content: newComment.content
    }
    try {
        const newComment = await Comment.create(dataPost);
            res.status(200).json({
            result: true,
            newComment: newComment
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.countCommentByPostId = async (req, res) => {

    const { post_id } = req.params;
    try {
        const components = await Comment.find({ post_id });
        //console.log(components)
            res.status(200).json({
            totalComment: components.length
            });
        }
    } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editComment = async (req, res) => {
    const { comment_id, content } = req.body;
    try {
        const result = await Comment.updateOne({ _id: comment_id }, { $set: { content: content } });
        res.status(200).json({ result: result.acknowledged });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

        if (!comment) {
            return next(
                new ErrorResponse(
                    `Comment with id ${comment_id} not found`,
                    404
                )
            );
        }

exports.deleteComment = async (req, res) => {
    const { comment_id } = req.body;
    try {
        await Comment.findByIdAndDelete(comment_id);
        res.status(200).json({
            result: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Update comment by id
// @route   PUT /api/comments/:comment_id
// @access  Private
exports.updateCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findByIdAndUpdate(
            comment_id,
            { content },
            { updateAt: Date.now() },
            { new: true }
        );

        if (!comment) {
            return next(
                new ErrorResponse(
                    `Comment with id ${comment_id} not found`,
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete comment by id
// @route   DELETE /api/comments/:comment_id
// @access  Private
exports.deleteCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params;

        const comment = await Comment.findByIdAndDelete(comment_id);

        if (!comment) {
            return next(
                new ErrorResponse(
                    `Comment with id ${comment_id} not found`,
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
