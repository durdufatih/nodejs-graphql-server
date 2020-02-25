const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number
});

module.exports = mongoose.model("Tenant", tenantSchema);