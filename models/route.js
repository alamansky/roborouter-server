let mongoose = require("mongoose");

let routeSchema = new mongoose.Schema({
  tech: String,
  route: Array,
  timestamp: Number
});

module.exports = mongoose.model("Route", routeSchema);
