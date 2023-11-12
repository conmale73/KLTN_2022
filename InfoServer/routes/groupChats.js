const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/groupChatController");

// POST /api/groupChats
router.post("/", groupChatController.createGroupChat);

// GET /api/groupChats/:group_chat_id
router.get("/:group_chat_id", groupChatController.getGroupChatByID);

// GET /api/groupChats/user/:user_id
router.get("/user/:user_id", groupChatController.getGroupChatsByUserID);

module.exports = router;
