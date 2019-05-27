"use strict";

let googleMaps = require("@google/maps");

// Google Maps API credentials
let uri = "";
if (typeof process.env.PLACES_URI == 'undefined') {
	uri = "AIzaSyBvfLFLuou2MsbXue_o7v7ws3yXrYvtfxg";
} else {
	uri = process.env.PLACES_URI;
}

let googleMapsClient = googleMaps.createClient({
	key: uri
});

let places = []
async function nearbySearch(coordinates) {
	await googleMapsClient.placesNearby(coordinates, function(results, status, pagination) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			places = [];
			// clearMarkers(markers);
			results.forEach((place) => {
				places.push(place);
				// createMarker(place.geometry.location, map, place.name, markers);
			});
		}
	});
}

module.exports = places;