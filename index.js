const express = require('express');
const app = express();


app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// dyanimcally figure out which port to listen to. Heroku will pass in environment variable for PORT for proudction env.
const PORT = process.env.PORT || 5000;
app.listen(PORT);