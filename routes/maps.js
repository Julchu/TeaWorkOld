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
	await googleMapsClient.placesNearby(request, function(results, status, pagination) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			let places = [];
			// clearMarkers(markers);
			results.forEach((place) => {
				places.push(place);
				// createMarker(place.geometry.location, map, place.name, markers);
			});
		}
	});
}

// it('gets places for a nearby search query ranked by distance', function(done) {
// googleMaps.placesNearby({
// 	language: 'en',
// 	location: [-33.865, 151.038],
// 	rankby: 'distance',
// 	minprice: 1,
// 	maxprice: 4,
// 	opennow: true,
// 	type: 'restaurant'
// })
// .asPromise()
// .then(function(response) {
// 	expect(response.json.results).toEqual(
// 		arrayContaining([
// 			objectContaining({
// 				name: stringMatching('McDonald\'s')
// 			})
// 		])
// 	);
// })
// 	.then(done, fail);
// });

module.exports = {nearbySearch, uri};