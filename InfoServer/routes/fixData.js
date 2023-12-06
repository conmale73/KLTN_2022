const fixDataController = require("../controllers/fixDataController");
const express = require("express");
const router = express.Router();

// PATCH /api/fixData/fixMessages
router.patch("/fixSenderName", fixDataController.fixSenderName);

// PATCH /api/fixData/fixPostTimeStamps
router.patch("/fixPostTimeStamps", fixDataController.fixPostTimeStamps);

// PATCH /api/fixData/fixPostCommentsCount
router.patch("/fixPostCommentsCount", fixDataController.fixPostCommentsCount);
module.exports = router;
