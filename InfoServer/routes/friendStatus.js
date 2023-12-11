const express = require("express");
const router = express.Router();
const friendStatusController = require("../controllers/friendStatusController");

//GET /api/notification/ ==> count notification of userId
router.get("/:user_id", friendStatusController.checkfriendStatus);


// POST /api/friendStatus/cancel-when-waiting
router.post("/cancel-when-waiting", friendStatusController.cancelFriendStatusWhenWaiting);
// POST /api/friendStatus/cancel-when-friend
router.post("/cancel-when-friend", friendStatusController.cancelFriendStatusWhenFriend);

module.exports = router;
