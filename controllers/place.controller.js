const PlaceService = require("../services/place.service");
const boom = require("boom");

module.exports.getPlace = async function(req, res, next) {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const place = await PlaceService.getPlace(id);
    return place;
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports.getPlaces = async function(req, res, next) {
  try {
    const places = await PlaceService.getPlaces();
    return places;
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports.createPlace = async function(req, res, next) {
  try {
    const createdPlace = await PlaceService.createPlace(req);
    return createdPlace;
  } catch (error) {
    throw boom.boomify(error);
  }
};