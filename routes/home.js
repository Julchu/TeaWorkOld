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

// Getting coordinates from URL
router.post('/', async function(req, res) {
	console.log(req.query.lat);
	console.log(req.query.lng);
});

// Loading main page
router.get("/", async function(req, res, next) {
	await res.render("home", {
		title: "Teawork",
		uri: uri
	});
});

module.exports = router;