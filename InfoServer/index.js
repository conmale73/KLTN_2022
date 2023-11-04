require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const songsRouter = require("./routes/songs");
const albumsRouter = require("./routes/albums");
const artistsRouter = require("./routes/artists");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const morgan = require("morgan");
const http = require("http");
const jsonParser = express.json({ limit: "50mb" });

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
database.connect();

// Middlewares
app.use(morgan("dev"));
app.use(cors((origin = "http://localhost:5173"), (credentials = true)));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/users", usersRoutes);
app.use("/api/posts", jsonParser, postRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Create an HTTP server and wrap it with Socket.IO
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Define Socket.IO logic here
socketIo.on("connection", (socket) => {
    console.log("A user connected");

    // Handle custom events here
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
