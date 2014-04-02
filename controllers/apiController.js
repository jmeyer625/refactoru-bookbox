var https = require('https');
var googleapis = require('googleapis')
var bookModel = require('../models/bookModel');
var async = require('async');
var aws = require('aws-lib');
//var aws_config = require('../config/aws_config');

//var AWS_ACCESS_KEY_ID = aws_config.key;
//var AWS_SECRET_ACCESS_KEY = aws_config.secret;
var AWS_ASSOCIATE_TAG = 'bookbox06-20'

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
	// getAwsInfo: function (req,res) {
	// 	bookModel.find({}, function(err,books){
	// 		var queue = [];
	// 		books.map(function(book){
	// 			var prodAdv = aws.createProdAdvClient(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_ASSOCIATE_TAG);
	// 			var options = {SearchIndex: 'Books', Keywords: book.Title, Availability: "Available	", Condition: "New"};
	// 			queue.push(function(cb){
	// 				setTimeout(prodAdv.call('ItemSearch', options, function(err,result){
	// 					if (result && result.Items && result.Items.Item && result.Items.Item[0] && result.Items.Item[0].DetailPageURL) {
	// 						console.log(book.Title, result.Items.Item[0].DetailPageURL);
	// 						book.amazonURL = result.Items.Item[0].DetailPageURL;
	// 						book.save(function(err){
	// 							cb(err,result);
	// 						});
	// 					} else {
	// 						console.log('error:', err);
	// 						console.log('errResult:', result);
	// 						cb(err,result);
	// 					}
	// 				}), 2000);
	// 			});
	// 		});
	// 		async.series(queue, function(err, results){
	// 			console.log(err);
	// 			res.send(results)
	// 		})
	// 	});
		
	// },
	// testBook: function (req,res) {
	// 	bookModel.findOne({}, function(err,book){
	// 		books = [book];
	// 		var queue = [];
	// 		books.map(function(books){
	// 			var prodAdv = aws.createProdAdvClient(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_ASSOCIATE_TAG);
	// 			var options = {SearchIndex: 'Books', Keywords: book.Title, Availability: "Available	", Condition: "New"};
	// 			queue.push(function(cb){
	// 				setTimeout(prodAdv.call('ItemSearch', options, function(err,result){
	// 					if (result && result.Items && result.Items.Item && result.Items.Item[0] && result.Items.Item[0].DetailPageURL) {
	// 						console.log(book.Title, result.Items.Item[0].DetailPageURL);
	// 						book.amazonURL = result.Items.Item[0].DetailPageURL;
	// 						book.save(function(err){
	// 							cb(err,result);
	// 						});
	// 					} else {
	// 						console.log('error:', err);
	// 						console.log('errResult:', result);
	// 						cb(err,result);
	// 					}
	// 				}), 2000);
	// 			});
	// 		});
	// 		async.series(queue, function(err, results){
	// 			console.log(err);
	// 			res.send(results);
	// 		})		
	// 	});
		
	// }
}