const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// POST /api/posts
router.post("/", postsController.post);

// GET /api/posts/:post_id
router.get("/:post_id", postsController.getPostById);

// GET /api/posts/:user_id
router.get("/user/:user_id", postsController.getPostsByUserID);

// GET /api/posts/:user_id
router.get("/public/:user_id", postsController.getPublicPostsByUserID);

// POST /api/posts/like/:post_id
router.post("/like/:post_id", postsController.likePost);

// PATCH /api/posts/unlike/:post_id
router.patch("/unlike/:post_id", postsController.unlikePost);

// GET /api/posts/newsfeed/:user_id
router.get("/newsfeed/:user_id", postsController.getNewsfeed);
module.exports = router;
