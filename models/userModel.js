var mongoose = require('mongoose');

var celebs = ['oprah_winfrey', 'bill_clinton', 'anderson_cooper', 'steve_jobs', 'jk_rowling', 'sonia_sotomayor', 'gwyneth_paltrow', 'mark_cuban', 'david_foster_wallace', 'julia_roberts', 'jennifer_lawrence', 'michelle_obama', 'tony_hawk', 'sheryl_sandberg', 'steve_jobs', 'jay-z', 'malcolm_gladwell', 'stephenie_meyer', 'hillary_clinton', 'warren_buffett'];

var populateCelebs = function(celebs) {
	var returnObj = {}
	var celebMap = celebs.map(function(celeb){
		returnObj[celeb] = false;
	});
	return returnObj
}

var userSchema = new mongoose.Schema({
	facebookId: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	age: Number,
	sex: String,
	location: String,
	college: String,
	major: String,
	birthdate: String,
	preferences: Object,
	celebs: {
		type: {},
		default: populateCelebs(celebs)
	},
	read: [],
	personas: [],
	address: {},
	complete: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('user', userSchema);