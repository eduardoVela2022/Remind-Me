// Node modules
const express = require("express");
const path = require("path");
const fs = require("fs");

const DATABASE_PATH = "./db/db.json";

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
  res.json(JSON.parse(fs.readFileSync(DATABASE_PATH)));
});

// API PATH to save a note of a user
app.post("/api/notes", (req, res) => {
  // The note array from the database is obtained
  const databaseData = JSON.parse(fs.readFileSync(DATABASE_PATH));

  // New note is added to the note array
  databaseData.push(req.body);

  // Saves the modified note array in the database
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(databaseData));

  res.json("Note was saved successfully");
});

// Server init
app.listen(PORT, () => {
  console.log(`\nServer started!\n\nServer link: http://localhost:${PORT}`);
});
