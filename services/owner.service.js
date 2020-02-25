const Owner = require("../models/owner");

module.exports.createOwner = async function(paramOwner) {
  const newOwner = new Owner(paramOwner);
  return await newOwner.save();
};

module.exports.getOwner = async function(id) {
  const owner = await Owner.findById(id);
  return owner;
};

module.exports.getOwners = async function() {
  const owners = await Owner.find();
  return owners;
};