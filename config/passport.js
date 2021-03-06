var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;
var userModel = require('../models/userModel');

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(uid, done){
	userModel.findOne({_id:uid}, function(err,user){
		done(err,user);
	})
});

var devId = '223555101166538';
var devSecret = 'b7171b2e71a89c3ba2cfd3c62b6a5e37';

var prodId = '439798682789902'
var prodSecret = '6f62c823358a37325e3ba83405b7f0f5'

var fbStrategy = new facebookStrategy({
	clientID: prodId,
	clientSecret: prodSecret,
	callbackURL: 'http://bookbox.herokuapp.com/facebook/callback'
	//callbackURL: 'http://localhost:3000/facebook/callback'

}, function(accessToken, refreshToken, profile, done) {

	userModel.findOne({facebookId:profile.id}, function(err,user){
		
		if(user) {
			return done(err, user);
		}

		var newUser = new userModel({
			facebookId: profile.id, 
			username: profile.username,
			profile: profile,
			sex: profile.gender,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value
		});
		newUser.save(function(err,doc){
			return done(err,doc);
		})
	})
});

passport.use(fbStrategy);