// Node modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// Database
const database = require("./db/db.json");

// The port the server will be using
const PORT = 3001;

// Initializing the express app
const app = express();

// Allows the app to accept JSON data
app.use(express.json());
// Allows the app to use URL encoded data
app.use(express.urlencoded({ extended: true }));

// Allows the app to use the files of the public folder
app.use(express.static("public"));

// PATH for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// PATH for the notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API PATH to get the notes of a user
app.get("/api/notes", (req, res) => {
  res.json(database);
});

// API PATH to save a note of a user
app.post("/api/notes", (req, res) => {
  // Saves notes to the database
  fs.write("./db/db.json", JSON.stringify(req.body), (err) => {
    if (err) console.log(err);
  });
});

// Server init
app.listen(PORT, () => {
  console.log(`\nServer started!\n\nServer link: http://localhost:${PORT}`);
});
