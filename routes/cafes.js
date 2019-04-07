"use strict";

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let file = require('./cafes.json');

let uri = "";
if (typeof process.env.MONGODB_URI == 'undefined') {
	uri = "mongodb://heroku_v670xkbh:km62gbjl3mf08ajvul3a7q49c8@ds051524.mlab.com:51524/heroku_v670xkbh";
} else {
	uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {useNewUrlParser: true});

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = new mongoose.Schema({
	name: {type: String, default: "Name"},
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

let Cafe = mongoose.model("Cafe", cafeSchema, "Cafés");

router.get('/', async function(req, res, next) {
	let cafeList = {"cafés": []};
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
			title: "Cafés",
			about: "List of cafés",
			cafeTypes: cafeSchema.paths.type.enumValues
		});
	}
});

router.get("/submit", async function(req, res, next) {
	res.render("submit", {
		title: "New Café", 
		cafeTypes: cafeSchema.paths.type.enumValues
	})
});

// Basic search function
router.get('/:cafes', async function(req, res, next) {
	let title, content;
	let cafe = await Cafe.findOne({name: req.params.cafes}); //, type: "Restaurant"}
	if (cafe) {
		title = req.params.cafes;
		content = cafe;
	} else {
		title = "Café Not Found";
		content = "Search for another café";
	}
	res.render('cafe', {
		title: title,
		content: content
	});
});

// Search based on type of place
router.get('/:type', async function(req, res, next) {
	let title, content;
	let cafe = await Cafe.find({type: req.params.type});
	// if (cafe) {
	// 	title = req.params.cafes;
	// 	content = cafe;
	// } else {
	// 	title = "Cafe Not Found";
	// 	content = "Search for another cafe";
	// }
	// res.render('cafe', {
	// 	title: title,
	// 	content: content
	// });
});

// Update information
router.patch("/:cafes", async function(req, res, next) {
	await cafe.save();
	res.redirect("/cafes/" + cafe.name);
});

router.post('/submit', async function(req, res, next) {
	// Checking if cafe exists already
	let exists = await Cafe.find({name: req.body.name});
	if (exists == "") {
		// Wi-fi
		let wifiAvailable, wifiName, wifiPassword, wifiFast;
		if (req.body.wifiAvailable == "on") {
			wifiAvailable = true;
			wifiName = req.body.wifiName;
			wifiPassword = req.body.wifiPassword;
			wifiFast = req.body.wifiFast == "on";
		}

		// Bathroom
		let bathroomAvailable, bathroomLocked, bathroomKey, bathroomCode, bathroomClean;
		if (req.body.bathroomAvailable == "on") {
			if (req.body.bathroomLocked == "on") {
				if (req.body.bathroomKey == "on") {
					bathroomKey = true;
				} else {
					bathroomCode = req.body.bathroomCode;
				}
			}
			bathroomClean = req.body.bathroomClean == "on";
		}
		// Creating the Cafe object
		let cafe = new Cafe({
			name: req.body.name || "Cafés",
			type: req.body.type,
			wifi: {
				available: wifiAvailable,
				name: wifiName,
				password: wifiPassword,
				fast: wifiFast
			},
			outlet: req.body.outlet == "on",
			bathroom: {
				available: bathroomAvailable,
				locked: bathroomLocked,
				key: bathroomKey,
				code: bathroomCode,
				clean: bathroomClean
			},
			clean: req.body.clean == "on",
			busy: req.body.busy,
			parking: req.body.parking == "on"
		});
		await cafe.save();
	}
	res.redirect("/cafes/" + req.body.name);
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