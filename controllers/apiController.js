var https = require('https');
var googleapis = require('googleapis')
var bookModel = require('../models/bookModel');
var async = require('async');

var GOOGLE_KEY = 'AIzaSyATWMf3gDHSGQrdOJxf1DxChOMfr2m6Z1g';

module.exports = {
	getBookImage: function(req,res) {
		bookModel.find({}, function (err,docs){
			var queue = [];
			docs.map(function(doc){
				console.log('doc: ',doc.Title);
				var isbn = doc.ISBN.split('-').join('');
				queue.push(function(cb){
					setTimeout(googleapis.discover('books', 'v1').execute(function(err,client){
						var params = {q: 'ISBN:'+isbn};
						var req1 = client.books.volumes.list(params).withApiKey(GOOGLE_KEY);
						req1.execute(function(err, result){
							if(result && result.items && result.items[0].volumeInfo && result.items[0].volumeInfo.imageLinks && result.items[0].volumeInfo.imageLinks.thumbnail) {
								console.log('google result: ', result.items[0].volumeInfo.imageLinks.thumbnail);
								doc.picture = result.items[0].volumeInfo.imageLinks.thumbnail;
								console.log('picture: ',doc.picture)
								doc.save(function(err){
									cb(err,result)
								});
							} else {
								cb(err, result)
							}
						});
					}), 2000);
				});
				
			});
			async.series(queue, function(err, results){
					console.log(err);
					res.send(results);
			})
		})
	}
}