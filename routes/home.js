"use strict";

let express = require("express");
let router = express.Router();

// Google Maps API credentials
let uri = "";
if (typeof process.env.PLACES_URI == 'undefined') {
	uri = "AIzaSyBvfLFLuou2MsbXue_o7v7ws3yXrYvtfxg";
} else {
	uri = process.env.PLACES_URI;
}

// Search bar
router.post('/', function(req, res, next) {
	res.redirect("/cafes/" + req.body.cafeName);
});

// Loading main page
router.get("/", async function(req, res, next) {

	await res.render("home", {
		title: "Teawork",
		uri: uri
	});
	console.log(req.query);
});

module.exports = router;