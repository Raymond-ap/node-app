const express = require("express");

const placesContollers = require('../Controllers/places-controller')


const router = express.Router();

router.get(`/:pid`, placesContollers.getPlaceById);

router.get("/user/:uid", placesContollers.getPlaceByUserId);

router.post('/', placesContollers.createPlace)

router.patch('/:pid', placesContollers.updatePlaceById)

router.delete('/:pid', placesContollers.deletePlace)



module.exports = router;
