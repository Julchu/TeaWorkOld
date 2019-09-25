"use strict";

let express = require("express");
let router = express.Router();
let Cafe = require("../services/mongo").Cafe;

router.get("/", async function(req, res, next) {
	res.render("submit", {
		title: "New Café",
		about: "Add new information about a café",
		cafeTypes: Cafe.schema.obj.type.enum
	});
});

router.post("/", async function(req, res, next) {
	// Checking if cafe exists alreadsy
	let exists = await Cafe.find({ name: req.body.name });
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
