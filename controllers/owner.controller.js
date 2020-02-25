const OwnerService = require("../services/owner.service");
const boom = require("boom");

module.exports.getOwner = async function(req, res, next) {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const owner = await OwnerService.getOwner(id);
    return owner;
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports.getOwners = async function(req, res, next) {
  try {
    const owner = await OwnerService.getOwners();
    return owner;
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports.createOwner = async function(req, res, next) {
  try {
    const createdOwner = await OwnerService.createOwner(req);
    return createdOwner;
  } catch (error) {
    throw boom.boomify(error);
  }
};