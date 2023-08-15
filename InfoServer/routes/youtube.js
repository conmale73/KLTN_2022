const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtubeDataController");

// GET user's playlists
router.get("/playlists/user-playlists/user=:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const playlists = await youtubeController.getUserPlaylists(userId);
        res.json(playlists);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching playlists from YouTube",
        });
    }
});

module.exports = router;
