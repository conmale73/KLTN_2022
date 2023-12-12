const Group = require("../models/groupModel");
const GroupChat = require("../models/groupChatModel");
const ErrorResponse = require("../utils/errorResponse");

const fs = require("fs");
const path = require("path");

// @desc    Create a new group
// @route   POST /api/groups
// @access  Public
exports.createGroup = async (req, res, next) => {
    try {
        const {
            name,
            creator_id,
            privacy,
            description,
            requireVerify,
            visible,
        } = req.body;

        // Path to the default thumbnail image in the "assets" folder
        const defaultGroupThumbnailPath = path.join(
            __dirname,
            "..",
            "assets",
            "defaultGroupThumbnail.jpg"
        );

        // Read the default thumbnail image as a buffer
        const groupThumbnailBuffer = fs.readFileSync(defaultGroupThumbnailPath);
        const base64GroupThumbnail = groupThumbnailBuffer.toString("base64");

        const newGroup = new Group({
            name,
            creator_id,
            privacy,
            members: [creator_id],
            requireVerify,
            visible,
            thumbnail: {
                files: [
                    {
                        dataURL: base64GroupThumbnail,
                        fileInfo: {
                            type: "image/jpg",
                            name: "defaultGroupThumbnail.jpg",
                            size: groupThumbnailBuffer.length,
                            lastModified: new Date().getTime(),
                        },
                    },
                ],
            },
            description,
        });

        const defaultGroupChatThumbnailPath = path.join(
            __dirname,
            "..",
            "assets",
            "defaultGroupChatThumbnail.png"
        );
        const groupChatThumbnailBuffer = fs.readFileSync(
            defaultGroupChatThumbnailPath
        );
        const base64GroupChatThumbnail =
            groupChatThumbnailBuffer.toString("base64");

        const newGroupChat = new GroupChat({
            group_id: newGroup._id,
            group_name: "Group Chat for " + name,
            group_thumbnail: {
                files: [
                    {
                        dataURL: base64GroupChatThumbnail,
                        fileInfo: {
                            type: "image/png",
                            name: "defaultGroupChatThumbnail.jpg",
                            size: groupChatThumbnailBuffer.length,
                            lastModified: new Date().getTime(),
                        },
                    },
                ],
            },
            members: [creator_id],
        });

        const savedGroup = await newGroup.save();
        const savedGroupChat = await newGroupChat.save();

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: newGroup._id },
            { chat_id: savedGroupChat._id },
            { new: true }
        );

        res.status(201).json(updatedGroup);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
exports.getAllGroups = async (req, res, next) => {
    try {
        const groups = await Group.find();

        res.status(200).json({
            success: true,
            data: groups,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all public groups
// @route   GET /api/groups/public
// @access  Public
exports.getAllPublicGroups = async (req, res, next) => {
    try {
        const groups = await Group.find({ privacy: "PUBLIC" });

        res.status(200).json({
            success: true,
            data: groups,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all groups by user id
// @route   GET /api/groups/user/:user_id
// @access  Public
exports.getGroupsByUserId = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page

        const startIndex = (page - 1) * limit;

        const totalResults = await Group.find({
            members: user_id,
        }).countDocuments();

        const totalPages = Math.ceil(totalResults / limit);

        const groups = await Group.find({ members: user_id })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: groups,
            page,
            totalPages,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get group by id
// @route   GET /api/groups/:group_id
// @access  Public
exports.getGroupById = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }
        if (group.privacy === "PUBLIC") {
            res.status(200).json({
                success: true,
                data: group,
            });
        } else if (group.privacy === "PRIVATE") {
            if (group.visible == true) {
                res.status(200).json({
                    success: true,
                    data: group,
                });
            } else {
                if (group.members.includes(user_id)) {
                    res.status(200).json({
                        success: true,
                        data: group,
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        data: null,
                        message: "You don't have permission to view this group",
                    });
                }
            }
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Request to join group
// @route   PUT /api/groups/request-join/:group_id
// @access  Public
exports.requestJoinGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.privacy == "PRIVATE") {
            if (group.members.includes(user_id)) {
                return next(
                    new ErrorResponse(
                        `User with id ${user_id} is already a member of group with id ${group_id}`,
                        400
                    )
                );
            } else {
                if (group.requireVerify == true) {
                    group.pendingRequests.push(user_id);
                    //TODO: Send notification to group.creator_id
                } else {
                    group.members.push(user_id);

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: group_id },
                        { $addToSet: { members: user_id } }, // $addToSet prevents duplicate members
                        { new: true }
                    );
                    res.status(200).json({
                        success: true,
                        data: updatedGroup,
                    });
                }
            }
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Add user to group
// @route   PUT /api/groups/add-user/:group_id
// @access  Public
exports.addUserToGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.privacy == "PRIVATE") {
            if (group.members.includes(user_id)) {
                return next(
                    new ErrorResponse(
                        `User with id ${user_id} is already a member of group with id ${group_id}`,
                        400
                    )
                );
            } else {
                if (group.requireVerify == true) {
                    //TODO: Send notification to user_id

                    //Add user_id to group.pending_members
                    group.pendingMembers.push(user_id);
                    //TODO: if user_id accepts, add user_id to group.members
                }
            }
        } else if (group.privacy == "PUBLIC") {
            if (group.members.includes(user_id)) {
                return next(
                    new ErrorResponse(
                        `User with id ${user_id} is already a member of group with id ${group_id}`,
                        400
                    )
                );
            } else {
                //TODO: Send notification to user_id
                // group.pendingMembers.push(user_id);
                //TODO: if user_id accepts, add user_id to group.members
                const updatedGroup = await Group.findOneAndUpdate(
                    { _id: group_id },
                    { $addToSet: { members: user_id } }, // $addToSet prevents duplicate members
                    { new: true }
                );
                res.status(200).json({
                    success: true,
                    data: updatedGroup,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Remove user from group
// @route   PUT /api/groups/remove-user/:group_id
// @access  Public
exports.removeUserFromGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { creator_id, user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (!group.members.includes(user_id)) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is not a member of group with id ${group_id}`,
                    400
                )
            );
        } else {
            if (group.creator_id != creator_id) {
                return next(
                    new ErrorResponse(
                        `User with id ${creator_id} is not authorized to remove users from group with id ${group_id}`,
                        401
                    )
                );
            }
            const updatedGroup = await Group.findOneAndUpdate(
                { _id: group_id },
                { $pull: { members: user_id } },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: updatedGroup,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Join PUBLIC group
// @route   PUT /api/groups/join/:group_id
// @access  Public
exports.joinPublicGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.privacy != "PUBLIC") {
            return next(
                new ErrorResponse(
                    `Group with id ${group_id} is not a PUBLIC group`,
                    400
                )
            );
        }

        if (group.members.includes(user_id)) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is already a member of group with id ${group_id}`,
                    400
                )
            );
        } else {
            const updatedGroup = await Group.findOneAndUpdate(
                { _id: group_id },
                { $addToSet: { members: user_id } }, // $addToSet prevents duplicate members
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: updatedGroup,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Leave group
// @route   PUT /api/groups/leave/:group_id
// @access  Public
exports.leaveGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (!group.members.includes(user_id)) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is not a member of group with id ${group_id}`,
                    400
                )
            );
        } else {
            const updatedGroup = await Group.findOneAndUpdate(
                { _id: group_id },
                { $pull: { members: user_id } },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: updatedGroup,
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update group thumbnail by id
// @route   PATCH /api/groups/thumbnail/:group_id
// @access  Public
exports.updateGroupThumbnailById = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id, files } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.creator_id != user_id) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is not authorized to update thumbnail of group with id ${group_id}`,
                    401
                )
            );
        }

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: group_id },
            { thumbnail: { files } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedGroup,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update group by id
// @route   PATCH /api/groups/:group_id
// @access  Public
exports.updateGroupById = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id, name, privacy, description } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.creator_id != user_id) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is not authorized to update group with id ${group_id}`,
                    401
                )
            );
        }

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: group_id },
            { name, privacy, description },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedGroup,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete group by id
// @route   DELETE /api/groups/:group_id
// @access  Public
exports.deleteGroupById = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { user_id } = req.body;

        const group = await Group.findById(group_id);

        if (!group) {
            return next(
                new ErrorResponse(`Group with id ${group_id} not found`, 404)
            );
        }

        if (group.creator_id != user_id) {
            return next(
                new ErrorResponse(
                    `User with id ${user_id} is not authorized to delete group with id ${group_id}`,
                    401
                )
            );
        }

        await Group.findByIdAndDelete(group_id);

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// @desc  Search for groups by name
// @route GET /api/groups/search/:group_name
// @access Public
exports.searchGroupsByName = async (req, res, next) => {
    try {
        const { group_name } = req.params;

        const groups = await Group.find({
            name: { $regex: group_name, $options: "i" },
        });

        res.status(200).json({
            success: true,
            data: groups,
        });
    } catch (error) {
        next(error);
    }
};

// @desc  Search for groups by name that user is a member of
// @route GET /api/groups/search/:group_name/:user_id
// @access Public
exports.searchGroupsByNameAndUserId = async (req, res, next) => {
    try {
        const { group_name, user_id } = req.params;

        const groups = await Group.find({
            name: { $regex: group_name, $options: "i" },
            members: user_id,
        });

        res.status(200).json({
            success: true,
            data: groups,
        });
    } catch (error) {
        next(error);
    }
};
