"use strict";

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

const uri = "mongodb://heroku_v670xkbh:km62gbjl3mf08ajvul3a7q49c8@ds051524.mlab.com:51524/heroku_v670xkbh"
// const uri = "MONGODB_URI"

mongoose.connect(uri, {useNewUrlParser: true});

let wifiSchema = mongoose.Schema({
	availability: {type: Boolean, default: false},
	name: {type: String, default: ""},
	// TODO: encrypt password
	password: {type: String, default: ""},
	speed: {type: String, default: ""}
});

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = mongoose.Schema({
	name: {type: String, default: ""},
	type: {type: String, default: "cafe"},
	wifi: {type: wifiSchema, default: () => ({
		availability: true, 
		name: eduroam, 
		speed: "slow"})
	},
	bathroom: {type: Boolean, default: false},
});

let Cafe = mongoose.model('Cafe', cafeSchema);
let Wifi = mongoose.model('Wifi', wifiSchema);

// let addWifi = function(availability, name, password, speed) {
// 	let wifi = new Wifi({
// 		availability: availability,
// 		name: name, //req.params.name,
// 		password: password,
// 		speed: speed
// 	});

// 	wifi.save();
// };

router.post('/', function (req, res, next) {

});

router.get('/', function(req, res, next) {
	res.render('cafes', { title: 'Cafes' });
});

module.exports = router;

// /* GET users listing. */
// router.get('/', function(req, res, next) {
// 	res.send('respond with a resource');
// });

// let UserSchema = new Schema({
// 	statuses: {
// 		online: {
// 			type: Boolean,
// 			default: true
// 		},
// 		verified: {
// 			type: Boolean,
// 			default: false
// 		},
// 		banned: {
// 			type: Boolean,
// 			default: false
// 		}
// 	},
// 	//...
// })