var bookModel = require('../models/bookModel');
var userModel = require('../models/userModel')
var async = require('async');
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = {
	getBooks: function(req,res) {
		bookModel.find({}, function(err,docs){
			var fArray = [];
			var fixData = function(doc, cb) {

				doc.title = doc.Title;
				doc.author = doc.Author;
				doc.genres = [];
				doc.personas = [];
				doc.celebs = [];
				if(doc['Genre 1']) {
					doc.genres.push(doc['Genre 1']);
				}
				if(doc['Genre 2']) {
					doc.genres.push(doc['Genre 2']);
				}
				if(doc['Persona 1']) {
					doc.personas.push(doc['Persona 1']);
				}
				if (doc['Persona 2']) {
					doc.personas.push(doc['Persona 2']);
				}
				if (doc.Celebrities) {
					doc.celebs = doc.Celebrities.split(';')
				}
				doc.genre = doc['Female/Male/Both'];
				doc.length = doc.Length;
				doc.save(cb)
			}

			docs.map(function(doc){
				fArray.push(function(cb){
					fixData(doc, function(err,doc){
						cb(err,doc);
					});
				});
			})

			async.series(fArray, function(err,results){
				res.render('books', {docs:results});
			})
			
		})
	},
	showBooks: function (req,res) {
		bookModel.find({}, function(err,docs){
			console.log(err);
			res.render('books', {docs:docs});
		})
	},
	writeFiles: function (req,res) {
		bookModel.find({}, function(err,docs){
			docs = JSON.stringify(docs);
			fs.writeFile('./tmp/test.json', docs, function(err){
				if (err) {
					console.log(err);
				} else {
					console.log('Saved books');
				}
				userModel.find({_id:req.user._id}, function(err,user){
					user = JSON.stringify(user);
					fs.writeFile('./tmp/user.json', user, function(err){
						err ? console.log(err) : console.log('Saved user');
						res.redirect('/');
					})
				})
			})
		})
	},
	doCalc: function(req,res) {
		exec('python produceRecs.py', function(err,stdout, stderr){
			console.log('stdout: ' + stdout);
		    console.log('stderr: ' + stderr);
		    if (err !== null) {
		      console.log('exec error: ' + err);
		    }
		    res.send(stdout);
		})
	}
}