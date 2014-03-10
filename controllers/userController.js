module.exports = {
	onboard: function(req,res) {
		res.render('onboard', {
			user:req.user,
			title: 'BookBox | Sign up'
		});
	}
}