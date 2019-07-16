const mongoose = require('mongoose');
const { Schema } = mongoose;			// const Schema = mongoose.Schema;

// Schema describes collection and what each individual record looks like
const userSchema = new Schema({
	googleId: String,
	displayName: String,
	credits: { type: Number, default: 0 }
});

// Create a model class and tell mongoose the collection needs to be created
mongoose.model('users', userSchema);