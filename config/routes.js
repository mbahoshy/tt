var mod = require('../config/modules');
var Auth = require('./auth');
var Users = require('../models/user');

module.exports = function (app, passport) {

	//responds with index.html
	app.get("/", function(req, res) {


	});

	//responds with hvac.html
	app.get("/classroom", Auth.isAuthenticated, mod.getClassroom);

	//respond with class info
	app.get("/class/:id", Auth.isAuthenticated, mod.getClass);

	//respond with user info
	app.get("/users/:id", Auth.isAuthenticated, mod.getUser);

	app.get('/slides/:id/:type', Auth.isAuthenticated, mod.returnSlides);

	app.get('/json/:id', Auth.isAuthenticated, mod.returnJson);

	app.get('/slideTemplate/:type', Auth.isAuthenticated, mod.slideTemplate);

	app.get('/nav/:type', Auth.isAuthenticated, mod.getNav);

	app.post('/login',
	  	passport.authenticate('local', { successRedirect: '/classroom/#0',
	                                   failureRedirect: '/'
	                                 })
	);

	app.post("/signup", Auth.userExist, function (req, res, next) {
		Users.signup(req.body.email, req.body.password, function(err, user){
			if(err) throw err;
			req.login(user, function(err){
				if(err) return next(err);
				return res.redirect("/classroom/#0");
			});
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('index.html');
	});


}