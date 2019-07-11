const passport = require('passport');

module.exports = (app) => {

	// Route handlers

	// scope specifies what access should be had within user profile
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

	// When a user visits auth/google/callback the CODE is included in the url. Server sends request to Google with code. Google replies with user details
	app.get('/auth/google/callback', passport.authenticate('google'));

	// Log out user
	app.get('api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// get current user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);	
	});
}