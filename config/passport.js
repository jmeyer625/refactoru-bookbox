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



var fbStrategy = new facebookStrategy({
	clientID: '289976004486010',
	clientSecret: '6263b67f20668c6c381343a69e080aee',
	callbackURL: 'http://bookbox.herokuapp/facebook/callback'
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