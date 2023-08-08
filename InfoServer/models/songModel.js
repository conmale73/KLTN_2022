const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
    },
    artistID: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    },
    songImage: {
        type: String,
        required: true,
    },
    songSlug: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    // Additional properties...
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
