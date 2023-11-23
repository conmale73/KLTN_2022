const fixDataController = require("../controllers/fixDataController");
const express = require("express");
const router = express.Router();

// PATCH /api/fixData/fixMessages
router.patch("/fixSenderName", fixDataController.fixSenderName);

module.exports = router;
