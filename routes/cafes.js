"use strict";

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

const uri = "mongodb://heroku_v670xkbh:km62gbjl3mf08ajvul3a7q49c8@ds051524.mlab.com:51524/heroku_v670xkbh"
// const uri = "MONGODB_URI"

mongoose.connect(uri, {useNewUrlParser: true});

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = new mongoose.Schema({
	name: {type: String, default: ""},

	// Establishment type
	type: {
		type: String,
		default: "Cafe",
		enum: ["Restaurant", "Cafe", "Other"]
	},
	wifi: {
		available: {type: Boolean, default: false},
		name: {type: String, default: ""},
		
		// TODO: encrypt password
		password: {type: String, default: ""},
		fast: {type: Boolean, default: false}
	},
	outlet: {type: Boolean, default: false},
	bathroom: {
		available: {type: Boolean, default: false},
		locked: {type: Boolean, default: false},
		clean: {type: Boolean, default: false}
	},
	clean: {type: Boolean, default: true},
	busy: {
		morning: {type: Boolean, default: false},
		afternoon: {type: Boolean, default: false},
		evening: {type: Boolean, default: false}
	},
	climate: {
		type: String, 
		enum: ["Air-conditioned", "Heated", "Ventilated", "Stuffy"]
	}
});

let Cafe = mongoose.model("Cafe", cafeSchema);

let addWifi = function(available, name, password, speed) {
	let wifi = new Wifi({
		available: available,
		name: name, //req.params.name,
		password: password,
		speed: speed
	});
	wifi.save();
	return wifi;
};



router.post('/', function (req, res, next) {
	addWifi(req.body.available, req.body.name, req.body.password, req.body.speed)
});

router.get('/', function(req, res, next) {
	res.render('cafes', { title: "Cafes" });
});

module.exports = router;