const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const placesRoute = require('./routes/places-routes') // Places Router


const app = express()

app.use('/api/places',placesRoute)


app.listen(5000)
