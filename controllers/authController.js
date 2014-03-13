

module.exports = {
	login: function (req,res) {
		if(req.isAuthenticated()){
			res.redirect('/');
		} else {
			res.render('login', {title: 'Login'});
		}
	},
	logout: function (req,res) {
		req.logout();
		res.redirect('/');
	},
	loginSuccess: function (req, res) {
		if (req.user.saved) {
			res.redirect('/home');
		} else {
			res.redirect('/onboard');
		}
		
	},
	checkAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	},
	checkAuthAjax: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.send(401);
	}
}