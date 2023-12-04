const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// POST /api/posts
router.post("/", postsController.post);

// GET /api/posts/:user_id
router.get("/:user_id", postsController.getPostsByUserID);

// GET /api/posts/:user_id
router.get("/public/:user_id", postsController.getPublicPostsByUserID);

// POST /api/posts/like
router.post("/like", postsController.likePostByUser);

// GET /api/posts/detail/:post_id
router.get("/detail/:post_id", postsController.getDetailPostById);

// PUT /api/posts
router.put("/", postsController.putPostById);

// PUT /api/posts
router.delete("/", postsController.deletePostById);

module.exports = router;
