// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");
const apiRoutes = require("./routes/api-routes");
const adminRoutes = require("./routes/admin-routes");
const apiNHL = require("./routes/api-nhl");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("./public"));


// Routes
// =============================================================
require("./routes/html-routes")(app)
app.use("/api", apiRoutes);
//app.use("/admin", adminRoutes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
