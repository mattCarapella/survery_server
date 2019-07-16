// 'next' is called when function is complete and passes it to next middleware in the chain
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'Please log in.' });
	}
	next();
};