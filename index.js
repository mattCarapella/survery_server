const express = require('express');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');

const app = express();
// authRoutes(app);
require('./routes/authRoutes')(app);

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);