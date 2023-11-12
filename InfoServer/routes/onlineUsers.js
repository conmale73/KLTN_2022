const onlineUserController = require("../controllers/onlineUserController");
const express = require("express");
const router = express.Router();

// POST /api/onlineUsers
router.post("/", onlineUserController.addOnlineUser);

// GET /api/onlineUsers
router.get("/", onlineUserController.getOnlineUsers);

// DELETE /api/onlineUsers/:user_id
router.delete("/:user_id", onlineUserController.deleteOnlineUser);

module.exports = router;
