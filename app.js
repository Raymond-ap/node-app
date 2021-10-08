const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const placesRoute = require("./routes/places-routes"); // Places Router

const app = express();

app.use("/api/places", placesRoute);


// Error handling middleware
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An Unknown Error Occured"})
});


app.listen(5000);
