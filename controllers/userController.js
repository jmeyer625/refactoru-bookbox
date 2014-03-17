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
					books: user.recs.slice(0,12),
					title: 'BookBox | ' + user.firstName + ' ' + user.lastName
				});
			} else {
				res.redirect('/onboard')
			}
			
		})
	},
	addLike: function(req,res) {
		var bookId = req.body.bookId;
		userModel.findOne({_id:req.user._id}, function(err,user){
			if (user.likes.indexOf(bookId) === -1) {
				user.likes.push(bookId);
				user.markModified('likes');
				user.save(function(err){
					if (err) console.log(err);
					res.send('Saved!');
				});
			} else {
				res.send('Already saved');
			}
			
		});
	},
	addDislike: function(req,res) {
		var bookId = req.body.bookId;
		userModel.findOne({_id:req.user._id}, function(err,user){
			if (user.dislikes.indexOf(bookId) === -1) {
				user.dislikes.push(req.body.bookId);
				user.markModified('dislikes');
				user.save(function(err){
					if (err) console.log(err);
					res.send('Saved!');
				});
			} else {
				res.send('Already saved');
			}
				
		});
	},
	addRead: function(req,res) {
		var bookId = req.body.bookId;
		userModel.findOne({_id:req.user._id}, function(err,user){
			if (user.dislikes.indexOf(bookId) === -1) {
				user.read.push(req.body.bookId);
				user.markModified('read');
				user.save(function(err){
					if (err) console.log(err);
					res.send('Saved!');
				});
			} else {
				res.send('Already saved');
			}
		});
	}
}