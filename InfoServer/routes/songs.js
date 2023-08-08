const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");
const validateRequest = require("../middlewares/validateRequest");
const Joi = require("joi");

// Validation schema for the request body
const songSchema = Joi.object({
    songName: Joi.string().required(),
    artistID: Joi.string().required(),
    songSlug: Joi.string().required(),
    lyrics: Joi.string().required(),
    songImage: Joi.string().required(),
    category: Joi.string().required(),
    region: Joi.string().required(),
    likes: Joi.number().default(0),
    createAt: Joi.date().default(Date.now),
    updateAt: Joi.date().default(Date.now),
});

// GET /api/songs
router.get("/", songsController.getSongs);

// GET /api/songs/:id
router.get("/:id", songsController.getSongById);

// POST /api/songs
router.post("/", validateRequest(songSchema), songsController.addSong);

// PUT /api/songs/:id
router.put("/:id", validateRequest(songSchema), songsController.updateSong);

// POST /api/songs/:id/like
router.post("/:id/like", songsController.likeSong);

// POST /api/songs/:id/unlike (not working)
router.post("/:id/unlike", songsController.unlikeSong);

// DELETE /api/songs/:id
router.delete("/:id", songsController.deleteSong);

module.exports = router;
