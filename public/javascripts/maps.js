"use strict";

function load() {
	var parent = document.getElementById('container1');
	var child = document.getElementById('container2');
	child.style.padding = child.offsetWidth - child.clientWidth + "px";
}

// Places API
function nearbyPlaces(results, status) {
	// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=""&location=""&rankby=distance
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (let i = 0; i < results.length; i++) {
			let place = results[i];
			createMarker(results[i]);
		}
	}
}

function createMarker(pos, map, title) {
	let marker = new google.maps.Marker({
		position: pos,
		map: map, 
		title: title
		// icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
	   //	new google.maps.Size(22,22),
	   //	new google.maps.Point(0,18),
	   //	new google.maps.Point(11,11)),
	});
}

function initMap() {
	let infoWindow = new google.maps.InfoWindow;
	let map = new google.maps.Map(document.getElementById('map'), {
		mapTypeControl: false,
		zoom: 18
	});
	let service = new google.maps.places.PlacesService(map);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			let pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			// Marker on current location
			createMarker(pos, map, "You are here.")

			infoWindow.setPosition(pos);
			infoWindow.setContent('You are here.');
			infoWindow.open(map);

			// Center map on current location
			map.setCenter(pos);
			
			// Location requires ints (or smaller decimals?) to not throw error
			let request = {
				location: {
					lat: parseInt(43.472752400000005),
					lng: parseInt(-80.5248797)
				},
				radius: "500", 
				types: ["cafe", "restaurant", "park", "lodging", "library"]
			};
			// Display information
			service.nearbySearch(request, nearbyPlaces);
			
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
			});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}