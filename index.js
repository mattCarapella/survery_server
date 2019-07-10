const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/authRoutes')(app);
// same as:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);