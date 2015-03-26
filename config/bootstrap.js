/**
 * Bootstrap (sails.config.bootstrap)
 * 
 * An asynchronous bootstrap function that runs before your Sails app gets
 * lifted. This gives you an opportunity to set up your data model, run jobs, or
 * perform some special logic.
 * 
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	
	var passport = require('passport')
	  , FacebookStrategy = require('passport-facebook').Strategy;

	console.info("Registering FacebookStrategy with passport ...");
	
	passport.use(new FacebookStrategy({
	    clientID: sails.config.facebook.FACEBOOK_CLIENT_ID,
	    clientSecret: sails.config.facebook.FACEBOOK_CLIENT_SECRET,
	    callbackURL: sails.config.facebook.FACEBOOK_AUTH_CALLBACK_URL
	  },
	  function(accessToken, refreshToken, profile, done) {
		  
		  User.find().where({pid: profile.id}).then(function(_users){
			  if(_users && _users.length > 0) {
	              return done(null, _users[0], "Existing");
			  } else {
				  User.create({

				    	pid: profile.id,
				    	email: profile.email,
				    	firstName: profile.name.givenName,
				    	lastName: profile.name.familyName,

				          // You can also add any other data you are getting
							// back from Facebook here
				          // as long as it is in your model

				        }).then(function (_user) {
				            console.log("User created: " + JSON.stringify(_user));
				            return done(null, _user, "New");
				        }).catch(function (err) {
				            console.error("Error on creating user");
				            console.error(err);
				            console.error(JSON.stringify(err));
				            return done(err);
				        });
			  }
			  
		  }).catch(function (err) {
	            console.log("ERROR finding user with pid - " + profile.id + ".... ");
	            console.error(err);
	            console.error(JSON.stringify(err));
	            return done(err);
	        });
		  
		  
		  
	  }
	));
	console.info("Registered FacebookStrategy with passport !");

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap! (otherwise your server will never lift, since it's
	// waiting on the bootstrap)
  cb();
};
