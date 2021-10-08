const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const placesRoute = require("./routes/places-routes"); // Places Router

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknown Error Occured" });
});

app.listen(5000);
