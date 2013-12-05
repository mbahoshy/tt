var mod = require('../config/modules');
var Auth = require('./auth');


module.exports = function (app, passport) {

	//responds with index.html
	app.get("/", function(req, res) {


	});

	app.get('/getClasses', Auth.isAuthenticated, mod.getClasses);

	app.get('/getNav/:classid', Auth.isAuthenticated, mod.getNav);

	app.get('/session/:query', Auth.isAuthenticated, mod.getSession);

	//responds with hvac.html
	// app.get("/classroom", Auth.isAuthenticated, mod.getClassroom);

	//respond with class info
	// app.get("/class/:id", Auth.isAuthenticated, mod.getClass);

	//respond with user info
	app.get("/user", Auth.isAuthenticated, mod.getUser);

	app.get('/slides/:id/:type', Auth.isAuthenticated, mod.returnSlides);

	// app.get('/json/:id', Auth.isAuthenticated, mod.returnJson);

	app.get('/slideTemplate/:type', Auth.isAuthenticated, mod.slideTemplate);

	

	

	app.post('/login',
	  	passport.authenticate('local', { successRedirect: '/classroom.html',
	                                   failureRedirect: '/'
	                                 })
	);

	app.post("/signup", Auth.userExist, mod.signUp);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('index.html');
	});


}