const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/groupChatController");

// POST /api/groupChats
router.post("/", groupChatController.createGroupChat);

// GET /api/groupChats/:group_chat_id
router.get("/id/:group_chat_id", groupChatController.getGroupChatByID);

// GET /api/groupChats/user/:user_id
router.get("/user/:user_id", groupChatController.getGroupChatsByUserID);

// GET /api/groupChats/two/
router.post("/two/", groupChatController.getGroupChatOfTwoUsers);

module.exports = router;
