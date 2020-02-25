const Tenant = require("../models/tenant");

module.exports.createTenant = async function(paramTenant) {
  const newTenant = new Tenant(paramTenant);
  return await newTenant.save();
};

module.exports.getTenant = async function(id) {
  const tenant = Tenant.findById(id);
  return tenant;
};