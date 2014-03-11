var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	facebookId: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	age: Number,
	gender: String,
	location: String,
	college: String,
	major: String,
	birthdate: String,
	preferences: Object,
	celebrities: [],
	read: [],
	personas: [],
	address: {},
	complete: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('user', userSchema);