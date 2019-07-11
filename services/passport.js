const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// token for proving user identity. Automatically called by passport 
passport.serializeUser((user, done) => {
	done(null, user.id);
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then (user => {
			done(null, user);
		})
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			// Callback function to create a new user using all info sent back from Google
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);

			// search for an existing user with id
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						// theres already a record with profile id
						done(null, existingUser);
					}
					else {
						// create new instance of user and save it to database	
						new User({ googleId: profile.id, displayName: profile.displayName }).save()
							.then(user => done(null, user));
					}
				})
		}
	)
);


