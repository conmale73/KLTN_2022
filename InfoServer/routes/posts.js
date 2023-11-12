const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// POST /api/posts
router.post("/", postsController.post);

// GET /api/posts/:user_id
router.get("/:user_id", postsController.getPostsByUserID);

// GET /api/posts/:user_id
router.get("/public/:user_id", postsController.getPublicPostsByUserID);

module.exports = router;
