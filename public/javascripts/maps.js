"use strict";

function load() {
	var parent = document.getElementById('container1');
	var child = document.getElementById('container2');
	child.style.padding = child.offsetWidth - child.clientWidth + "px";
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
		zoom: 16,
		gestureHandling: 'cooperative'
	});
	let service = new google.maps.places.PlacesService(map);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		// navigator.geolocation.watchPosition(function(position) {
			let currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			// TODO: implement clearing and updating circle on map move
			let cityCircle = new google.maps.Circle({
				map: map,
				center: currentLocation,
				radius: 500
			});

			// Marker on current location
			createMarker(currentLocation, map, "You are here.")

			infoWindow.setPosition(currentLocation);
			infoWindow.setContent('You are here.');
			infoWindow.open(map);

			// Center map on current location
			map.setCenter(currentLocation);
			
			let places = [];
			
			// Search for locations
			// Search for cafes
			let request = {
				location: currentLocation,
				rankBy: google.maps.places.RankBy.DISTANCE,
				type: ["cafe"]
				// types: ["cafe", "restaurant", "park", "lodging", "library"]
			};
			
			// Places API, unable to create separate callback function and store results
			// TODO: implement pagination for more results
			service.nearbySearch(request, function(results, status, pagination) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					results.forEach((place) => {
						places.push(place);
						createMarker(place.geometry.location, map, place.name);
					});
				}
			});

			// Search for restaurants
			// request.type = ["restaurant"];
			// service.nearbySearch(request, function(results, status, pagination) {
			// 	if (status == google.maps.places.PlacesServiceStatus.OK) {
			// 		results.forEach((place) => {
			// 			places.push(place);
			// 			createMarker(place.geometry.location, map, place.name);
			// 		});
			// 	}
			// });

			// // Search for library
			// request.type = ["library"];
			// service.nearbySearch(request, function(results, status, pagination) {
			// 	if (status == google.maps.places.PlacesServiceStatus.OK) {
			// 		results.forEach((place) => {
			// 			places.push(place);
			// 		});
			// 	}
			// });

			// // Marking all places
			// places.forEach(function(place) {
			// 	createMarker(place.geometry.location, map, place.name);
			// });

		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		}, {enableHighAccuracy: true});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

// To return a LatLng object:
// map.getCenter();
