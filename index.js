const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			// Callback function to create a new user using all info sent back from Google
			console.log('access token: ' + accessToken);
			console.log('refresh token: ' + refreshToken);
			console.log('profile: ' + profile);
		}

	)
);

// Route handlers
app.get(
	'/auth/google', 
	passport.authenticate('google', {
		// scope specifies what access should be had within user profile
		scope: ['profile', 'email']
	})
);

// When a user visits auth/google/callback the CODE is included in the url. Server sends request to Google with code. Google replies with user details
app.get(
	'auth/google/callback', passport.authenticate('google')
);

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);