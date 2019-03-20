"use strict";

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let file = require('./cafes.json');

const uri = "mongodb://heroku_v670xkbh:km62gbjl3mf08ajvul3a7q49c8@ds051524.mlab.com:51524/heroku_v670xkbh"
// const uri = process.env.MONGODB_URI

mongoose.connect(uri, {useNewUrlParser: true});

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = new mongoose.Schema({
	name: {type: String, default: "Name"},
	type: {
		type: String,
		default: "Cafe",
		enum: ["Cafe", "Restaurant", "Other"]
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
	}
});

let Cafe = mongoose.model("Cafe", cafeSchema, "Cafes");

// TODO: cafes.pug action '/' + place

router.get('/', async function(req, res, next) {
	let cafeList = {"cafes": []};
	let cafes = file.cafes;
	
	let cafeFlag = req.query["cafe"];
	let restaurantFlag = req.query["restaurant"];
	let otherFlag = req.query["other"];

	if (cafeFlag || restaurantFlag || otherFlag) {
		for (let i = 0; i < cafes.length; i++) {
			if (cafeFlag) {
				if (cafes[i].type === "Cafe") {
					cafeList.cafes.push(cafes[i]);
				}
			} else if (restaurantFlag) {
				if (cafes[i].type === "Restaurant") {
					cafeList.cafes.push(cafes[i]);
				}
			} else if (otherFlag) {
				if (cafes[i].type === "Other") {
					cafeList.cafes.push(cafes[i]);
				}
			} else {
				cafeList.cafes.push(cafes[i]);
			}
		}
		res.render('cafes', {
			title: cafeList.cafes[0].name,
			cafeWifi: cafeList.cafes[0].wifi
		});
	} else {
		res.render("cafes", {
			title: "Cafes",
			cafeTypes: cafeSchema.paths.type.enumValues
		});
	}
});

router.get('/:cafes', async function(req, res, next) {
	res.render('cafes', {
		title: req.params.cafes,
		cafeTypes: cafeSchema.paths.type.enumValues
	});
});

router.post('/', async function(req, res, next) {
	let wifiAvailable, wifiName, wifiPassword, wifiSpeed;
	if (req.body.WifiAvailable == "on") {
		wifiAvailable = true;
		wifiName = req.body.WifiName;
		wifiPassword = req.body.WifiPassword;
		wifiSpeed = req.body.WifiSpeed;
	}

	let cafe = new Cafe({
		name: req.body.Name || "Cafe",
		type: req.body.Type,
		wifi: {
			available: wifiFlag,
			name: wifiName,
			password: wifiPassword,
			speed: wifiSpeed
		},
		outlet: req.body.Outlet,
		bathroom: req.body.Bathroom,
		clean: req.body.Clean,
		busy: req.body.Busy
	});
	await cafe.save();
	await res.redirect("/cafes/" + cafe.name);
});

module.exports = router;

// if (inventory_count > 0) {
// 	product[0].inventory_count -= 1;
// 	res.json(product);
// } else {
// 	res.statusCode = 500;
// 	res.json({
// 		error: {
// 			message: "Not enough inventory"
// 		}
// 	});
// }