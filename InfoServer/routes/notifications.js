const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

//GET /api/notification/ ==> count notification of userId
router.get("/:receivedUser_id", notificationsController.getNotificationsByUserID);

module.exports = router;
