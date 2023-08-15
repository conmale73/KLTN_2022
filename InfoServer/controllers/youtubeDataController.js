const { google } = require("googleapis");
const axios = require("axios");

const API_KEY = "AIzaSyCcmWa6ZyX8faEVJlpEto4GrcmOC-NbMC0";

const youtube = google.youtube({
    version: "v3",
    auth: API_KEY,
});

async function getUserPlaylists(userId) {
    try {
        const response = await youtube.playlists.list({
            channelId: userId,
            part: "snippet",
            maxResults: 10,
        });

        const playlists = response.data.items;
        return playlists;
    } catch (error) {
        console.error("Error fetching playlists from YouTube:", error);
        throw error;
    }
}
async function search(query, maxResults) {
    try {
        const response = youtube.search.list({
            q: query,
            part: "snippet",
            maxResults: maxResults,
            type: "video",
        });

        const playlists = response.data.items;
        return playlists;
    } catch (error) {
        console.error("Error fetching playlists from YouTube:", error);
        throw error;
    }
}

module.exports = {
    getUserPlaylists,
};
