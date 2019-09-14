"use strict";

let express = require("express");
let User = require("../services/mongo").User;
let router = express.Router();

router.get("/", function(req, res, next) {
	res.render("login", {
		title: "Login",
		about: "Sign-in/Register"
	});
});

// Basic login functionality, all credentials (non-encrypted) saved on MongoDB
router.post("/", async function(req, res) {
	console.log(req.body.email);
	console.log(req.body.password);
	let exists = await User.find({ email: req.body.email });
	if (exists == "") {
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
	}
	// Passport Login
	// else {

	// }
});

module.exports = router;

/*

http://www.passportjs.org/docs/
http://www.passportjs.org/docs/username-password/
http://www.passportjs.org/packages/passport-google-oauth20/

C:\Users\Julian\Documents\Projects\ProjectOrganizer\ProjectOrganizer317\BackEnd\app.js:
   21  let session = require('express-session');
   22  
   23: let passport = require('passport');
   24: let LocalStrategy = require('passport-local').Strategy;
   25: require('./config/passport')(passport);
   26  
   27  let api = require('./routes/api');
   ..
   44  
   45  app.use(session({ secret: 'shhsecret' }));
   46: app.use(passport.initialize());
   47: app.use(passport.session());
   48  
   49  app.use('/', dashboard);

C:\Users\Julian\Documents\Projects\ProjectOrganizer\ProjectOrganizer317\BackEnd\config\passport.js:
    1: // This is the main configuration file for passport and login stuff
    2  
    3: // const passport = require('passport');
    4: const LocalStrategy = require('passport-local');
    5  const sql = require('../routes/sql.js');
    6  const User = require('../objects/User.js').User;
    7  
    8  
    9: module.exports = (passport) => {
   10  
   11:     passport.serializeUser( (user, done) => {
   12          // console.log("Serializing:", user.data);
   13          done(null, user.data["UserID"]);
   14      })
   15  
   16:     passport.deserializeUser( async (userId, done) => {
   17          // console.log("Deserializing:", userId);
   18          try {
   ..
   30      })
   31  
   32:     passport.use("signup", new LocalStrategy({
   33          usernameField: "newUser",
   34          passwordField: "newPass",
   ..
   59      }));
   60  
   61:     passport.use("login", new LocalStrategy({
   62          usernameField: "user",
   63          passwordField: "pass",

C:\Users\Julian\Documents\Projects\ProjectOrganizer\ProjectOrganizer317\BackEnd\routes\login.js:
    4  let path = require('path');
    5  let sql = require('./sql');
    6: let passport = require('passport');
    7  
    8  let router = express.Router();
    .
   24      if (newUser && newPass && newPass === newPassConfirm && newEmail) {
   25          // console.log("Signup!")
   26:         passport.authenticate("signup", (err, user, info) => {
   27              // console.log("Ended");
   28              if (err) return next(err);
   ..
   41      else if (user && pass) {
   42          // console.log("Login!")
   43:         passport.authenticate("login", (err, user, info) => {
   44              if (err) return next(err);
   45              // console.log("Ended");
*/
