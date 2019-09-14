"use strict";

let express = require("express");
let router = express.Router();
let nearbySearch = require("../services/maps").nearbySearch;
let uri = require("../services/maps").uri;

// Getting coordinates from URL
router.post("/", function(req, res) {
	// nearbySearch(req.body.lat + "," + req.body.lng);
	let coordinates = req.body.lat + "," + req.body.lng;
	// console.log(nearbySearch.toString());
	nearbySearch(coordinates);
});

// Loading main page
router.get("/", async function(req, res, next) {
	await res.render("home", {
		title: "Teawork",
		uri: uri
	});
});

router.get("/api/", function(req, res, next) {
	let data = {
		banana: "Banana",
		potato: "Potato",
		cheese: "Cheese"
	};
	res.status(200).send(data);
});

module.exports = router;
