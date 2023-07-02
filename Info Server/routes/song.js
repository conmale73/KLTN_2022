const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

// GET /api/songs
router.get('/', songsController.getSongs);

// GET /api/songs/:id
router.get('/:id', songsController.getSongById);

// POST /api/songs
router.post('/', songsController.addSong);

// DELETE /api/songs/:id
router.delete('/:id', songsController.deleteSong);

module.exports = router;