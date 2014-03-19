var userModel = require('../models/userModel');
var bookModel = require('../models/bookModel');
var passages = require('../config/bookpassages');
var async = require('async');

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
				user.filterRecs(function(err){
					if (err) console.log (err);
					res.render('userpage', {
						user: user,
						books: user.recs.slice(0,12),
						title: 'BookBox | ' + user.firstName + ' ' + user.lastName
					});
				})
				
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
	},
	rateBooks: function(req,res) {
		userModel.findOne({_id: req.user._id}, function(err, user){
			if (err) console.log(err);
			bookModel.find({}, function(err, books){
				books = books.filter(function(book){
					console.log((user.likes.indexOf(book._id) === -1),(user.dislikes.indexOf(book._id) === -1));
					return ((user.likes.indexOf(book._id) === -1) && (user.dislikes.indexOf(book._id) === -1));
				});
				res.render('userrating', {
					user: req.user,
					books: books
				});
			})
			
		});
	},
	showProfile: function(req,res) {
		userModel.findOne({_id:req.user._id}, function(err,user){
			if (err) console.log(err);
			res.render('profile', {
				user: user
			});
		});
	},
	filter: function(req,res) {
		userModel.findOne({_id:req.user._id}, function(err,user){
			user.filterRecs(function(err){
				if(err) console.log(err);
				res.redirect('/');
			});
		});
	},
	showRated: function(req,res) {
		userModel.findOne({_id: req.user._id}, function(err,user){
			user.filterRecs(function(err){
				var queue = [];
				var dislikes = [];
				var likes = [];
				var read = [];
				if (user.dislikes.length){
					console.log('got to dislikes')
					user.dislikes.map(function(dislike){
						queue.push(function(cb){
							bookModel.findOne({_id:dislike}, function(err,book){
								console.log('found book(dislike)', book);
								if (err) console.log(err);
								dislikes.push(book);
								cb(err,book);
							});
						});
					})
				}
				if (user.likes.length) {
					console.log('got to likes')
					user.likes.map(function(like){
						queue.push(function(cb){
							bookModel.findOne({_id:like}, function(err,book){
								console.log('found book(like)', book);
								if (err) console.log(err);
								likes.push(book);
								cb(err,book);
							});
						});
					});
				}
				if (user.dislikes.length){
					console.log('got to read')
					user.read.map(function(item){
						queue.push(function(cb){
							bookModel.findOne({_id:item}, function(err,book){
								console.log('found book(read)', book);
								if (err) console.log(err);
								read.push(book);
								cb(err,book);
							});
						});
					});
				}
				console.log(queue);
				if (queue.length) {
					async.series(queue, function(err, results){
						if (err) res.send(err);
						res.render('rated', {
							user: user,
							dislikes: dislikes,
							likes: likes,
							read: read
						})
					})
				} else {
					res.render('/')
				}
				
			})
		})
	}
}