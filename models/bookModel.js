var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	Title: String,
	Author: String,
	'Genre 1': String,
	'Genre 2': String,
	'Persona 1': String,
	'Persona 2': String,
	'Female/Male/Both': String,
	Length: String,
	Celebrities: String,
	title: String,
	author: String,
	year: Number,
	celebs: {
		type: [],
		default: []
	},
	genres: {
		type:[],
		default: []
	},
	personas: {
		type:[],
		default: []
	},
	gender: String,
	length: Number,
	ISBN: String,
	picture: String
})

module.exports = mongoose.model('book', bookSchema);