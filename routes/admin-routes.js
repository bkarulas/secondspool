// Dependencies
const path = require("path");


// Routes
module.exports = function(app) {

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });


};