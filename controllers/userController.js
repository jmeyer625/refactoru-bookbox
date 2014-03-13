var userModel = require('../models/userModel');
var passages = require('../config/bookpassages');

module.exports = {
	onboard: function(req,res) {
		if(!req.user) {
			res.redirect('/createAccount')
		} else {
			userModel.findOne({_id: req.user._id}, function(err,user){
				res.render('onboard', {
					user: user,
					passages: passages.passages,
					title: 'BookBox | Sign up'
				});
			});
		}
		
	},
	createProfile: function (req,res) {
		var submitted = req.body;
		console.log(submitted);
		userModel.findOne({_id: req.user._id}, function(err,user){
			user.address = {
				address_line_1: submitted.address_line_1,
				address_line_2: submitted.address_line_2,
				address_city: submitted.address_city,
				address_state: submitted.address_state,
				address_zip: submitted.address_zip
			};
			user.birthdate = submitted.birthdate;
			for (key in submitted.celeb) {
				user.celebs[key] = true;
			}
			for (key in submitted.passages) {
				user.passages[key] = true;
			}
			user.markModified('celebs');
			user.markModified('passages');
			user.saved = true;
			user.save(function(err){
				console.log(err);
				res.redirect('/writefile');
			});
		});
	},
	showPage: function(req,res) {
		userModel.findOne({_id:req.user._id}, function(err,user){
			if (user.saved) {
				res.render('userpage', {
					user: user,
					title: 'BookBox | ' + user.firstName + ' ' + user.lastName
				});
			} else {
				res.redirect('/onboard')
			}
			
		})
	}
}