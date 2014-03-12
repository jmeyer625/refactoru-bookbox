var https = require('https');
var googleapis = require('googleapis')
var bookModel = require('../models/bookModel');

var GOOGLE_KEY = 'AIzaSyBVy86sPgiOiN0cuv6S4vCLKYM7QjpAVos';

module.exports = {
	getBookImage: function(req,res) {
		googleapis.discover('books', 'v1').execute(function(err, client){
			var params = {q: 'ISBN:9780547928227'}
			var req1 = client.books.volumes.list(params);
			req1.execute(function(err, res){
				console.log(res.items[0]);
			})
		})
	}
}