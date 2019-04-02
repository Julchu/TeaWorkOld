"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const about = require('./routes/about');
const home = require('./routes/home');
const cafes = require('./routes/cafes');
const exit = require('./routes/exit');
const login = require("./routes/login");

const app = express();

/*
var db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, done) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});*/


passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
	},
	function(username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: "Incorrect username." });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		})
	}
))

// if action("/") in login.pug instead of action("login"), use this POST, otherwise use login.js' POST
// Authentication not working yet
app.post("/", 
	passport.authenticate("local", {
		succesRedirect: "/cafes/",
		failureRedirect: "/cafes"
	}), 
	function(req, res, next) {
		res.redirect("/cafes/");	
	}
);

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', home);
app.use('/about', about);
app.use('/exit', exit);
app.use('/cafes', cafes);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

