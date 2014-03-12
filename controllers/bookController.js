var bookModel = require('../models/bookModel');
var async = require('async');
var fs = require('fs');

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
	writeFile: function (req,res) {
		bookModel.find({}, function(err,docs){
			docs = JSON.stringify(docs);
			fs.writeFile('./tmp/test.json', docs, function(err){
				if (err) {
					console.log(err);
				} else {
					console.log('Saved!');
				}
				res.redirect('/');
			})
		})
	}
}