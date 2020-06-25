"use strict";

let mongoose = require('mongoose');

let uri = "";
if (typeof process.env.MONGODB_URI == 'undefined') {
	uri = "mongodb://heroku_sncdkqzk:o0378sar6evgp12nckbv44hf3d@ds131942.mlab.com:31942/heroku_sncdkqzk";
} else {
	uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {useNewUrlParser: true});

// Google Maps supported types of establishments: https://developers.google.com/places/supported_types

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	type: {
		type: String,
		default: "Café",
		enum: ["Café", "Restaurant", "Other"]
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
		key: {type: Boolean, default: false},
		code: {type: String, default: ""},
		clean: {type: Boolean, default: false}
	},
	clean: {type: Boolean, default: true},
	busy: {
		morning: {type: Boolean, default: false},
		afternoon: {type: Boolean, default: false},
		evening: {type: Boolean, default: false}
	},
	parking: {type: Boolean, default: false}
});

let userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	bookmarks: [{type: String}]
});

let Cafe = mongoose.model("Cafe", cafeSchema, "Cafés");
let User = mongoose.model("User", userSchema, "Users");

module.exports = {Cafe, User};