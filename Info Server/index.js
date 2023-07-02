const express = require('express');
const bodyParser = require('body-parser');
const songsRouter = require('./routes/songs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/songs', songsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});