var userModel = require('../models/userModel');

module.exports = {
	onboard: function(req,res) {
		userModel.findOne({_id: req.user._id}, function(err,user){
			res.render('onboard', {
				user: user,
				title: 'BookBox | Sign up'
			});
		});
	},
	createProfile: function (req,res) {
		var submitted = req.body;
		userModel.findOne({_id: req.user._id}, function(err,user){
			console.log(user.celebs)
			user.address = {
				address_line_1: submitted.address_line_1,
				address_line_2: submitted.address_line_2,
				address_city: submitted.address_city,
				address_state: submitted.address_state,
				address_zip: submitted.address_zip
			};
			user.birthdate = submitted.birthdate;
			for (key in submitted.celeb) {
				console.log(key);
				user.celebs[key] = true;
			}
			
			user.markModified('celebs');
			user.save(function(err){
				console.log(err);
				res.redirect('/home');
			})
		});
	}
}