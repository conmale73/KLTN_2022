const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//GET /api/comment/ ==> count comment of posts
router.get("/", commentController.getAllComment);

//GET /api/comment/post/:post_id
router.get("/post/:post_id", commentController.getAllCommentByPostId);

// POST /api/comment
router.post("/", commentController.addNewComment);

// POST /api/comment/count-comment-post/:post_id
router.get("/count-comment-post/:post_id", commentController.countCommentByPostId);

// PUT /api/comment
router.put("/", commentController.editComment);

// PUT /api/posts
router.delete("/", commentController.deleteComment);

module.exports = router;
