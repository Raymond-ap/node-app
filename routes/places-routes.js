const express = require("express");

const router = express.Router();

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
];

router.get(`/:pid`, (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  //Handling Error
  if (!place) {
    const error = new Error("Could not find a place for the provided id");
    error.code = 404;
    throw error
  }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  //Handling Error
  if (!place) {
      const error = new Error("Could not find a user for the provided id")
      error.code = 404
      next(error)
  }

  res.json(place);
});

module.exports = router;
