const express = require("express");
const cors = require("cors");
const axios = require("axios");
const database = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const songsRouter = require("./routes/songs");
const albumsRouter = require("./routes/albums");
const artistsRouter = require("./routes/artists");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
database.connect();

// Middlewares
app.use(express.json());

app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/users", usersRoutes);

//Youtube api
app.get("/api/youtube-search", async (req, res) => {
    const API_KEY = "AIzaSyCcmWa6ZyX8faEVJlpEto4GrcmOC-NbMC0";
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                part: "snippet",
                maxResults: req.query.maxResults,
                q: req.query.query,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// Error Handler Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
