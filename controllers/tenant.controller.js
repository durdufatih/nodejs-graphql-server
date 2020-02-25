const TenantService = require("../services/tenant.service");
const boom = require("boom");

module.exports.getTenant = async function(req, res, next) {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const tenant = await TenantService.getTenant(id);
    return tenant;
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports.createTenant = async function(req, res, next) {
  try {
    const createdTenant = await TenantService.createTenant(req);
    return createdTenant;
  } catch (error) {
    throw boom.boomify(error);
  }
};