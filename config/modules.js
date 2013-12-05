var path = require("path"),
	express = require("express"),
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Users = require('../models/user'),
    Nav = require('../models/nav');


var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@dharma.mongohq.com:10062/tradeTrainer';
var Schema = mongoose.Schema;

mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected to database!');
});

function getClasses (req, res) {
	Nav.find({}, 'name snippet active', function(err, documents) {
		res.json(documents);
	});
}

function getNav (req, res) {
	var id = req.param("classid");
	if (id == 'reset') {
		id = req.session.classid;
	} else {
		req.session.classid = id
	}

	Nav.findById(id, function(err, documents){
		res.json(documents);
	});
}

var gamejson = mongoose.model('gamejson', 
           new Schema({}), 
           'GameJson');



function getUser (req, res){
	var tmpuser = {};
	tmpuser = _.omit(req.user, 'pword', '_id', 'hash', 'salt');
	res.json(req.user);
	
}

function slideTemplate (req, res) {
	console.log(req.session.classid);
	var type = req.param("type");
	if (type === 'lesson') {
		res.sendfile('./templates/slidetemplate.html');
	} else if (type === 'problem') {
		res.sendfile('./templates/problemtemplate.html');
	}
}

function returnSlides (req, res) {
	var id = req.param("id");
	var type = req.param("type");

	req.session.lessonid = id; // sets lesson id
	req.session.lessontype = type; // sets lesson type

	
	console.log('return slides called');
	console.log('lesson id: ' + req.session.lessonid); //log lesson id
	

	res.sendfile('./slides/' + id + '.html');
}

function getSession (req, res) {
	var type = req.param("query");
	
	console.log(req.session[type]);
	console.log('lesson id: ' + req.session.lessonid); // log lesson id

	res.send(req.session[type]); //sends requested session data
}

function signUp (req, res, next) {
	Users.signup(req.body.email, req.body.password, function(err, user){
		if(err) throw err;
		req.login(user, function(err){
			if(err) return next(err);
			return res.redirect("/classroom/#0");
		});
	});
}


exports.signUp = signUp;
exports.getSession = getSession;
exports.getUser = getUser;
exports.returnSlides = returnSlides;
exports.slideTemplate = slideTemplate;
exports.getClasses = getClasses;
exports.getNav = getNav;

// exports.getClassroom = getClassroom;
// exports.returnJson = returnJson;
// exports.getClass = getClass;

/*

var UsersDB = [{
	userid:"2",
	name:"Mountain Dew",
	email:"mdForReal@gmail.com",
	level:"Journeyman",
	totalprogress:'75',
	progress: [
	{classroomid: "0", progress:"50%", chapterscompleted:"2", lessonscomleted:"22", problemscompleted:null, averagescore:null, progress:[
		{chapterid:"0", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons: [
			{lessonid:"0", completed:true},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:true}
		]},
		{chapterid:"1", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons:[
			{lessonid:"0", completed:false},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:true}
		]},
		{chapterid:"2", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons:[
			{lessonid:"0", completed:true},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:false}
		]}
	]}
	]
}];
*/

// function getClassroom (req, res) {
// 		res.redirect('pages/hvac.html');
// }

// function getClass (req, res){
// 	console.log(req.user);
// 	var id = req.param("id");
// 	if(id!=='reset') {
// 		req.session.classid = id;
// 	} else {
// 		id = req.session.classid;
// 	}
// 	NavData.find({"classid": id}, function(err, documents) {
// 		res.json(documents[0]);
// 	});

// }

// function returnJson (req, res) {
// 	var id = req.param("id");
// 	gamejson.find({"slideid": id}, function(err, documents) {
// 		res.json(documents[0]);
// 	});
// }