const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
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
//******************************	 ROUTES 	********************************************
//**************************************************************************************

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
// same as:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);      


// Make sure Express behaves correctly in production
if (process.env.NODE_ENV === 'production') {
	// Make sure Express serves up production assets (main.js, main.css, etc.)
	app.use(express.static('client/build'));

	// Make sure Express serves up index.html if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);

