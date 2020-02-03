// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reservation Table Storage

const tables = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Displays all characters
app.get("/api/reserve", function(req, res) {
  return res.json(tables);
});

// Create New Reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newResy = req.body;

  console.log(newResy);

  tables.push(newResy);
  res.json(tables);
  // fs.writeFile("./tables.html", res.json(tables), err => {
  //   if(err) throw err;
  // })
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
