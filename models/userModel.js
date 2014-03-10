var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	facebookId: String,
	email: String,
	password: String,
	name: String,
	age: Number,
	gender: String,
	location: String,
	college: String,
	major: String,
	preferences: Object,
	read: [],
	personas: [],
	complete: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('user', userSchema);