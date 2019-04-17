"use strict";

let express = require('express');
let router = express.Router();

let uri = "";
if (typeof process.env.PLACES_URI == 'undefined') {
	uri = "AIzaSyBvfLFLuou2MsbXue_o7v7ws3yXrYvtfxg";
} else {
	uri = process.env.PLACES_URI;
}

function initMap() {
	let map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}

router.get("/", async function(req, res, next) {
	res.render("maps", {
		title: "Maps", 
		// cafeTypes: ["Café", "Restaurant", "Other"],
		uri: uri
		// initMap: initMap()
	});
});

module.exports = router;

// https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap

// https://maps.googleapis.com/maps/api/place/nearbysearch/json
//   ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=uri