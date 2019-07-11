const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

// Tell Express it needs to make use of cookies
app.use(
	cookieSession({
		// configuration object 
		maxAge: 30 * 24 * 60 * 60 * 1000,  // cookie expires after 30 days (described in ms)
		keys: [keys.cookieKey] 	// used to sign/encrypt cookie. Defined in keys.js
	})
)

// Tells passport it needs to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// same as:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);

