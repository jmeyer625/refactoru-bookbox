var mongoose = require('mongoose');
var passages = require('../config/bookpassages');

var celebs = ['oprah_winfrey', 'bill_clinton', 'anderson_cooper', 'steve_jobs', 'jk_rowling', 'sonia_sotomayor', 'gwyneth_paltrow', 'mark_cuban', 'david_foster_wallace', 'julia_roberts', 'jennifer_lawrence', 'michelle_obama', 'tony_hawk', 'sheryl_sandberg', 'steve_jobs', 'jay-z', 'malcolm_gladwell', 'stephenie_meyer', 'hillary_clinton', 'warren_buffett'];

var populateCelebs = function(celebs) {
	var returnObj = {}
	var celebMap = celebs.map(function(celeb){
		returnObj[celeb] = false;
	});
	return returnObj
}

var populatePassages = function(passages) {
	var returnObj = {};
	var passagesMap = passages.passages.map(function(passage){
		returnObj[passage.title] = false;
	})
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
	dislikes: {
		type: [],
		default: []
	},
	likes: {
		type: [],
		default: []
	},
	read: {
		type: [],
		default: []
	},
	sent: {
		type: [],
		default: []
	},
	recs: {
		type: [],
		default: []
	},
	address: {},
	complete: {
		type: Boolean,
		default: false
	},
	saved: {
		type: Boolean,
		default: false
	},
	passages: {
		type: {},
		default: populatePassages(passages)
	}
});

userSchema.methods.filterRecs = function(cb) {
	var toRemove = [];
	for (var i=0; i<this.recs.length; i++) {
		if (this.dislikes.indexOf(this.recs[i]._id)!==-1) {
			toRemove.push(this.recs[i]);
		}
		if (this.read.indexOf(this.recs[i]._id)!==-1) {
			toRemove.push(this.recs[i]);
		}
		if (this.sent.indexOf(this.recs[i]._id)!==-1) {
			toRemove.push(this.recs[i]);
		}
	}
	if (toRemove.length) {
		for (var i=0; i<toRemove.length; i++) {
			var removed = this.recs.splice(this.recs.indexOf(toRemove[i]), 1);
			console.log(removed);
		}
		this.markModified('recs');
		this.save(function(err){
			cb(err);
		});
	} else {
		cb(null);
	}
}

module.exports = mongoose.model('user', userSchema);