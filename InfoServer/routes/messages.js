const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// POST /api/messages
router.post("/", messagesController.createMessage);

// GET /api/messages/chat/:chat_id
router.get("/chat/:chat_id", messagesController.getMessagesByChatID);

module.exports = router;
