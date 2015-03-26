//var passport = require('passport');

var HomeController = {

	default : function(req, res, next) {
		res.view("home");
	},
	myProfile: function(req, res, next) {
		res.view("myProfile", {user: req.session.user});
	}

};

module.exports = HomeController;
