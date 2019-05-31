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

async function nearbySearch(coordinates) {
	let request = {
		location: coordinates,
		rankby: "distance",
		type: "cafe" // types: ["cafe", "restaurant", "park", "lodging", "library"]
	};
	// await googleMapsClient.placesNearby(request)
	// .asPromise().then(function(response) {
	// 	expect(response.json.results).toEqual(
	// 		arrayContaining([
	// 			objectContaining({
	// 				// name: stringMatching('McDonald\'s')
	// 			})
	// 		])
	// 	);
	// 	console.log(response);
	// })
};

// Online documentation version
// it('gets places for a nearby search query ranked by distance', function(done) {
// 	await googleMapsClient.placesNearby(request)
// 	.asPromise().then(function(response) {
// 		expect(response.json.results).toEqual(
// 			arrayContaining([
// 				objectContaining({
// 					name: stringMatching('McDonald\'s')
// 				})
// 			])
// 		);
// 	})
// 	.then(done, fail);
// });

// Maps JavaScript version
// 	, function(results, status, pagination) {
// 	if (status == google.maps.places.PlacesServiceStatus.OK) {
// 		let places = [];
// 		// clearMarkers(markers);
// 		results.forEach((place) => {
// 			places.push(place);
// 			// createMarker(place.geometry.location, map, place.name, markers);
// 		});
// 	}
// }

// 	);
// }



module.exports = {nearbySearch, uri};

// When to use client- or server-sided API: https://developers.google.com/maps/documentation/geocoding/geocoding-strategies#examples-of-client-side-and-server-side-geocoding