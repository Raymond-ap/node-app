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
  if(!place) {
      res.status(404).json({Message: "Could not find a place for the provided id"})
  }
  res.json(place);
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  res.json(place);
});

module.exports = router;
