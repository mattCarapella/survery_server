const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send("Thanks for your feedback!");
	});

	// figure out which surveys a user created
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});
		res.send(surveys);
	});

	// webhook handler
	app.post('/api/surveys/webhooks', (req, res) => {
		// extract survey id and choice 
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body) 
			.map(({ email, url }) => {
				// extract path from URL and return surveyId and choice
				const match = p.test(new URL(url).pathname);
				if(match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				} 
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice}) => {
				Survey.updateOne(
					{
						_id: surveyId, 
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					}, 
					{
						$inc: { [choice]: 1 },		// $inc increments
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec() 
			})
			.value();

		res.send({});
	});

	// create a new survey
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject, 
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now() 
		});

		try {	
			// Send an email
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			await survey.save();
			req.user.credits-=1;
			const user = await req.user.save();
			res.send(user);   				// send back user model with updated number of credits
		} catch(err) {
			res.status(422).send(err);
		}

	});

	// returns list of surveys by current_user
	// app.get('/api/surveys', (res, req) => {

	// });

	// record feedback from a user
	// app.post('api/surveys/webhooks', (res, req) => {

	// });

}; 







// ******** REFACTOR 1

	// // webhook handler
	// app.post('/api/surveys/webhooks', (req, res) => {
	// 	// console.log(req.body);
	// 	// res.send({});

	// 	const events = _.map(req.body, event => {
	// 		// extract path from URL 
	// 		const pathname = new URL(event.url).pathname;
	// 		// extract survey id and choice 
	// 		const p = new Path('/api/surveys/:surveyId/:choice');
	// 		// return surveyId and choice
	// 		const match = p.test(pathname);

	// 		if(match) {
	// 			return { email: event.email, surveyId: match.surveyId, choice: match.choice };
	// 		} 

	// 		// console.log(p.test(pathname));
	// 	});
	// });




// ********** REFACTOR 2

	// // webhook handler
	// app.post('/api/surveys/webhooks', (req, res) => {
	// 	// console.log(req.body);
	// 	const events = _.map(req.body, ({ email, url }) => {
	// 		// extract path from URL 
	// 		const pathname = new URL(url).pathname;
	// 		// extract survey id and choice 
	// 		const p = new Path('/api/surveys/:surveyId/:choice');
	// 		// return surveyId and choice
	// 		const match = p.test(pathname);

	// 		if(match) {
	// 			return { email, surveyId: match.surveyId, choice: match.choice };
	// 		} 
	// 	});

	// 	// Remove duplicates 
	// 	const compactEvents = _.compact(events);
	// 	const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
	// 	console.log(uniqueEvents);

	// 	res.send({});
	// });


	// ******************** REFACTOR 3 -> to use chain helper

	// 	// webhook handler
	// app.post('/api/surveys/webhooks', (req, res) => {
	// 	// extract survey id and choice 
	// 	const p = new Path('/api/surveys/:surveyId/:choice');

	// 	// console.log(req.body);
	// 	const events = _.map(req.body, ({ email, url }) => {
	// 		// extract path from URL and return surveyId and choice
	// 		const match = p.test(new URL(url).pathname);

	// 		if(match) {
	// 			return { email, surveyId: match.surveyId, choice: match.choice };
	// 		} 
	// 	});

	// 	// Remove duplicates 
	// 	const compactEvents = _.compact(events);
	// 	const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
	// 	console.log(uniqueEvents);

	// 	res.send({});
	// });