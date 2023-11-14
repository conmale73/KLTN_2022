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
const roomsRoutes = require("./routes/rooms");
const groupChatsRoutes = require("./routes/groupChats");
const messagesRoutes = require("./routes/messages");

const morgan = require("morgan");
const http = require("http");

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
app.use("/api/posts", postRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/groupChats", groupChatsRoutes);
app.use("/api/messages", messagesRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Create an HTTP server and wrap it with Socket.IO
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

let onlineUsers = [];
// Define Socket.IO logic here
io.on("connection", (socket) => {
    console.log(`connection ${socket.id} connected`);

    socket.on("addNewOnlineUser", (user_id) => {
        !onlineUsers.some((user) => user.user_id === user_id) &&
            onlineUsers.push({
                user_id: user_id,
                socket_id: socket.id,
            });
        console.log("onlineUsers: ", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("joinChat", (user_id, chat_id) => {
        socket.join(chat_id);
        console.log(`user ${user_id} joined chat ${chat_id}`);
    });

    socket.on("sendMessage", (newMessage) => {
        console.log(newMessage);

        socket.to(newMessage.chat_id).emit("receiveMessage", newMessage);
    });
    socket.on("deleteOnlineUser", (user_id) => {
        onlineUsers = onlineUsers.filter((user) => user.user_id !== user_id);
        console.log("onlineUsers: ", onlineUsers);
        socket.emit("getOnlineUsers", onlineUsers);
    });
    socket.on("disconnect", () => {
        console.log(`connection ${socket.id} disconnected`);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
