var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	year: Number,
	genres: [],
	personas: [],
	length: Number,
	ISBN: String
})

module.exports = mongoose.model('book', bookSchema);