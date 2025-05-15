const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res, next) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }
    const coordinates = await mapService.getAddressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) {
        return res.status(400).json({ message: 'Origin and destination are required' });
        }
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

module.exports.getSuggestion = async (req, res, next) => {
    try {
        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ message: 'Input is required' });
        }
        const suggestion = await mapService.getSuggestion(input);
        return res.status(200).json(suggestion);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}