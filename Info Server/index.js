const express = require('express');
const database = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const songsRouter = require('./routes/songs');
const albumsRouter = require('./routes/albums');

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
database.connect();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/songs', songsRouter);
app.use('/api/albums', albumsRouter);

// Error Handler Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;