// const uuid = require('uuid/dist/v4')

const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the famous sky scrapers in the world!",
    location: {
      lat: 40.74948770693409,
      lng: 73.98559187217705,
    },
    address: "New York, NY 10001, USA",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Midtown South",
    description: "Dense with skyscrapers, including the Empire State Building,",
    location: {
      lat: 40.74797250382559,
      lng: -73.98227646758923,
    },
    address: "New York, NY",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  //Handling Error
  if (!place) {
    // const error = new HttpError("Could not find a place for the provided id", 404);
    // const error = new Error("Could not find a place for the provided id");
    // error.code = 404;
    throw new HttpError("Could not find a place for the provided id", 404);
  }
  res.json(place);
};


const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  //Handling Error
  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json(place);
};

// Create Places Controller
const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: new Date().getTime().toString(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };

    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({place: createdPlace})

}

const updatePlaceById = (req, res, next) => {
    const { title, description } = req.body
    const placeId = req.params.pid
    
    const updatedPlace ={...DUMMY_PLACES.find(p => p.id === placeId)}
    const placeIndex = DUMMY_PLACES.find(p => p.id === placeId)
    updatedPlace.title = title
    updatedPlace.description = description

    DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({place: updatedPlace})

    if(!updatedPlace) {
        throw new HttpError("Could not find a place for the provided id", 404)
    }

    
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.updatePlaceById = updatePlaceById
