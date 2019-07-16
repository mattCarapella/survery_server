const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();


//**************************************************************************************
//****************************** MIDDLEWARE ********************************************
//**************************************************************************************

// Any time a POST, PUT, or PATCH request comes into application, BodyParser will parse it and put it in req.body
app.use(bodyParser.json());

// Tell Express it needs to make use of cookies
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,  	// cookie expires after 30 days (described in ms)
	keys: [keys.cookieKey] 							// used to sign/encrypt cookie. Defined in keys.js
}));

// Tells passport it needs to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

//**************************************************************************************
//**************************************************************************************
//**************************************************************************************



require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
// same as:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);

