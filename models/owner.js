const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number
});

module.exports = mongoose.model("Owner", ownerSchema);