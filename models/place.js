const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const placeSchema = new mongoose.Schema({
  title: String,
  city: String,
  ownerId: ObjectId,
  tenantId: ObjectId
});

module.exports = mongoose.model("Place", placeSchema);