const GroupController = require("../controllers/groupControllers");
const express = require("express");
const router = express.Router();

// POST /api/groups
router.post("/", GroupController.createGroup);

// GET /api/groups
router.get("/", GroupController.getAllGroups);

// GET /api/groups/public
router.get("/public", GroupController.getAllPublicGroups);

// GET /api/groups/user/:user_id
router.get("/user/:user_id", GroupController.getGroupsByUserId);

// GET /api/groups/:group_id
router.get("/:group_id", GroupController.getGroupById);

// PUT /api/groups/request-join/:group_id
router.put("/request-join/:group_id", GroupController.requestJoinGroup);

// PUT /api/groups/add-user/:group_id
router.put("/add-user/:group_id", GroupController.addUserToGroup);

// PUT /api/groups/remove-user/:group_id
router.put("/remove-user/:group_id", GroupController.removeUserFromGroup);

// PUT /api/groups/join/:group_id
router.put("/join/:group_id", GroupController.joinPublicGroup);

// PUT /api/groups/leave/:group_id
router.put("/leave/:group_id", GroupController.leaveGroup);

// PATCH /api/groups/thumbnail/:group_id
router.patch("/thumbnail/:group_id", GroupController.updateGroupThumbnailById);

// PATCH /api/groups/:group_id
router.patch("/:group_id", GroupController.updateGroupById);

// DELETE /api/groups/:group_id
router.delete("/:group_id", GroupController.deleteGroupById);

// GET /api/groups/search/:group_name
router.get("/search/:group_name", GroupController.searchGroupsByName);

// GET /api/groups/search/:group_name/:user_id
router.get(
    "/search/:group_name/:user_id",
    GroupController.searchGroupsByNameAndUserId
);

module.exports = router;
