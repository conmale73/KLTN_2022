const express = require("express");
const router = express.Router();
const hobbyController = require("../controllers/hobbyController");

// GET /api/posts/:user_id
router.get("/:user_id", hobbyController.getAllHobbybyUserId);
// POST /api/posts
router.post("/", hobbyController.addNewHobby);
// PUT /api/posts
router.put("/", hobbyController.editHobby);

// DELETE /api/posts
router.delete("/:id", hobbyController.deleteHobby);

module.exports = router;
