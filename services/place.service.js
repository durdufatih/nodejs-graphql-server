const Place = require("../models/place");

module.exports.createPlace = async function(paramPlace) {
  const newPlace = new Place(paramPlace);
  return await newPlace.save();
};

module.exports.getPlace = async function(id) {
  const place = await Place.findById(id);
  return place;
};

module.exports.getPlaces = async function() {
  const places = await Place.find();
  return places;
}