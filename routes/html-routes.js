// Dependencies
const path = require("path");


// Routes
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/board", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/board.html"));
  });

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/adindex", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });



};