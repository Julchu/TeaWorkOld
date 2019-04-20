"use strict";

let express = require('express');
let router = express.Router();
let Cafe = require("./mongo");

let file = require('./cafes.json');

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
		res.render("cafe", {
			title: cafeList.cafes[0].name,
			content: cafeList.cafes[0].wifi
		});
	} else {
		res.render("cafe", {
			title: "Cafés",
			content: "List of cafés",
		});
	}
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

// Search based on type of place; use url parameters instead
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
// router.patch("/:cafes", async function(req, res, next) {
// 	await cafe.save();
// 	res.redirect("/cafes/" + cafe.name);
// });

// router.get("/submit", async function(req, res, next) {
// 	res.render("submit", {
// 		title: "New Café", 
// 		cafeTypes: Cafe.paths.type.enumValues
// 	})
// });

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
			type: req.body.type || "Cafe",
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

// cafeTypes: Cafe.schema.obj.type.enum

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