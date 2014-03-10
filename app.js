
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var passportConfig = require('./config/passport');

var authController = require('./controllers/authController');
var userController = require('./controllers/userController');	

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({secret: 'secret string right'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/bookbox');
}

app.get('/', function (req,res){
	res.render('index', {title:'BookBox'})
});

app.get('/onboard', userController.onboard);


//Authentication routes
app.get('/facebook', passport.authenticate('facebook',{scope: ['email', 'user_birthday', 'user_likes']} ));
app.get('/facebook/callback', 
	passport.authenticate('facebook', {failureRedirect: '/login'}),
	authController.loginSuccess
);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
