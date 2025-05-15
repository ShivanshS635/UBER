const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API}`
  );

  console.log(data)
  if (data.status === "OK") {
    return {
      ltd: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    };
  } else {
    throw new Error("Unable to get coordinates");
  }
}

module.exports.getDistanceTime = async (origin, destination) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API}`
  );

  if (data.status === "OK") {
    return data.rows[0].elements[0];
  } else {
    throw new Error("Unable to get distance and time");
  }
}  

module.exports.getSuggestion = async (input) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API}`
  );

  if (data.status === "OK") {
    return data.predictions;
  } else {
    throw new Error("Unable to get suggestions");
  }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ ltd, lng ], radius / 6371 ]
      }
    }
  });

  return captains;
};
