const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 3001;
const removeAccents = require("./utils/removeAccent");

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST",
        allowedHeaders: "Content-Type,Authorization",
    })
);

// Set up a static folder for MP3 files
app.use(express.static("public"));

app.use(bodyParser.json());

// Route for serving the MP3 file
app.get("/music/:filename", (req, res, next) => {
    // const { filename } = removeAccents(req.params);
    const { filename } = req.params;

    res.sendFile(`${__dirname}/public/music/${filename}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
