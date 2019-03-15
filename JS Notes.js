// JavaScript:

	// Use strict JS rules (vs "everything works without reason" rules
	// Strict JS is closer to normal programming languages in terms of making sense)
	"use strict";

	// Variable types: 

	// Constants, cannot be altered, good for imports
	const a = 'abc';
	// a = 'acbd'; // Will not work because of const

	// Normal variables we're used to in terms of blocks/scopes
	// Ex: for loops, variable inside loop cannot be altered outside loop
	let b = 'abc'
	// let b = 'abcd'; // Will not work because you cannot redeclare variable name
	b = 'abcd'; // Will work

	// Do not use, block-/scope-less
	var c = 'abc';
	var c = 'abcd'; // Will work

	module.exports = {objectName}: // Let you import objectName from another file

	// Class template
	class name {
		constructor(n) {
			// Cannot assign member to variable of same name; causes infinite recursive loop
			this.name = n;
		}

		// Get is a built-in JS getter, will return this._test
		get name() {
			return this.name;
		}

		// Set is a built-in JS setter, 
		set name(n) {
			this.name = n;
		}
		/*
			The built-in getter/setter methods allow you to access/modify using `object._member` syntax
			Ex: 
				let n = new name("cheese");
				n.name; // Will return "cheese"
				n.name = "cheese2"; // Will set n.name to "cheese2"
		*/
	}

	//ES5
	var setNameIdsEs5 = function setNameIds(id, name) {
	  return {
	    id: id,
	    name: name
	  };
	};

	// ES6
	var setNameIdsEs6 = (id, name) => ({ id: id, name: name });

	console.log(setNameIdsEs6 (4, "Kyle"));   // Object {id: 4, name: "Kyle"}

// NodeJS

	// In app.js
	const about = require('./routes/about'); // Imports about about.js from routes
	app.use('/about', about); // Waits for URL/about

	// In about.js
	router.get('/', function(req, res, next) { // Renders about page when page is called, with "/" page
		res.render('About', { title: 'About' });
	});

	// Ex: if app.use('/', about), and router.get('/about', function(req, res, next), same result
		// Better to use app.use('/about', about) and app.get('/') (or any subpages of about)

	// More info: https://www.terlici.com/2014/09/29/express-router.html
	// App.js
	app.use('/cars', cars)

	// Cars.js
	app.get('/brands')
	app.get('/models')

	// URLs: URL/cars/brands, URL/cars/models

	

// REST API
/*
	// Paramaters vs arguments for queries
	
	Params is for url-values
		Ex: /user/:id -> req.params.id

	Queries: req.query contains the query params of the request.
		Ex: sample.com?arg=true&cheese=bad, req.query would be {arg:"true"}

	req.body contains anything in the request body. Typically this is used on PUT and POST requests.

	For example a POST to sample.com with the body of {"foo":"bar"} and a header of type application/json, req.body would contain {foo: "bar"}

	if you were to use req.body instead of req.query, it would most likely not find anything in the body, and therefore not be able to validate the jwt.

	GET: retrieve
	POST: create
	PUT: insert
	PATCH: update
	DELETE: delete
*/

// MongoDB / Mongoose
	// Static methods: does not require instantiating; attributes are class-wide
	animalSchema.statics.findByName = function(name, cb) {
	    return this.find({ name: new RegExp(name, 'i') }, cb);
	};

	// Instance methods: requires instantiating; attributes are object-specific
	animalSchema.methods.findSimilarTypes = function(cb) {
		return this.model('Animal').find({ type: this.type }, cb);
	};

	// Working example of collection, object, save
	const animalSchema = mongoose.Schema({
		name: 	String,
		type: 	String,
		sound: 	String
	});

	animalSchema.methods.speak = function() {
		console.log(this.sound);
	}

	const Animal = mongoose.model('animal', animalSchema);

	const cat = new Animal({
		name: 	'Dawg', 
		type: 	'cat',
		sound: 	'Meow'
	});

	// Option 1 to save:
	cat.save(function (err, cat) {
		if (err) {
			console.log("Something wrong with MongoDB");
		} else {
			cat.speak();
		}
	});
	// Option 2 to save: only creates bareoAnimal document
	Animal.create({});

	// Searches Wifi document model (const Wifi = mongoose.model('Wifi, wifiSchema);)
	// These do not work:
		// const Wifis = mongoose.model('Wifi', wifiSchema);
		// const Wifi = mongoose.model('Wifis', wifiSchema);
	Wifi.find({name: "Eduroam"}, (err, wifiNetwork) => {
		console.log(wifiNetwork);
	});

// JSON
	// Attribute types:
		String: "t"
		Number: 1, 0.3, 1.10
		Object
		Array: []
		Boolean: true, false
		Value
		null 