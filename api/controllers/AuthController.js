var passport = require('passport');

/**
 * Authentication Controller
 * 
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
		index : function(req, res) {
			res.view();
		},
		login : function(req, res) {
			res.view("login");
		},

	fbLogin : function(req, res, next) {

		/*
		 * passport.authenticate('facebook', { scope: ['email', 'user_about_me',
		 * 'user_birthday', 'user_education_history', 'user_location',
		 * 'user_religion_politics' ]}, function (err, user) { req.logIn(user,
		 * function (err) { if(err) { console.log(err); req.view('500'); return; }
		 * res.redirect('/'); return; }); })(req, res, next);
		 */

		passport.authenticate(
				'facebook',
				{
					// failureRedirect: '/auth/failed',
					scope : [ 'email', 'user_about_me', 'user_friends' ]
				},
				function(err, user) {
					console.info(">>>> fbLogin - 2 - req = " + req + "; res = "
							+ res);
					req.logIn(user, function(err) {
						console.info(">>>> fbLogin - 3 - req = " + req
								+ "; res = " + res);
						if (err) {
							console.info(">>>> fbLogin - 4 - req = " + req
									+ "; res = " + res);
							req.session.flash = 'There was an error';
							res.redirect('/auth/failed');
							return;
						} else {
							console.info(">>>> fbLogin - 5 - req = " + req
									+ "; res = " + res);
							req.session.user = user;
							res.redirect('/home');
							return;
						}
					});
				})(req, res, next);

	},

	fbLoginCallBack : function(req, res, next) {

		passport.authenticate(
				'facebook',
				function(err, user, info) {
					console.info(">>>> fbLoginCallback - 3 - err = " + err
							+ "; user = " + JSON.stringify(user) + "; info = "
							+ info);
					req.session.user = user;
					return res.redirect("home");
				})(req, res, next);
	},
	logout : function(req, res) {
		req.session.user = null;
		req.session.flash = 'You have logged out';
		res.redirect('/');
	},
	fbLoginFailed : function(req, res) {
		req.session.user = null;
		res.view('fbLoginFailed');
	},

};

module.exports = AuthController;
