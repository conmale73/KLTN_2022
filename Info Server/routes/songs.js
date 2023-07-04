const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const validateRequest = require('../middlewares/validateRequest');
const Joi = require('joi');

// Validation schema for the request body
const songSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
  album: Joi.string().required(),
});

// GET /api/songs
router.get('/', songsController.getSongs);

// GET /api/songs/:id
router.get('/:id', songsController.getSongById);

// POST /api/songs
router.post('/', validateRequest(songSchema), songsController.addSong);

// DELETE /api/songs/:id
router.delete('/:id', songsController.deleteSong);

module.exports = router;
