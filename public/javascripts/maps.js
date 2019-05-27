"use strict";

function createMarker(pos, map, title, markers) {
	let marker = new google.maps.Marker({
		position: pos,
		map: map, 
		title: title
		// icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
	   //	new google.maps.Size(22,22),
	   //	new google.maps.Point(0,18),
	   //	new google.maps.Point(11,11)),
	});
	markers.push(marker);
}

function clearMarkers(markers) {
	markers.forEach((marker) => {
		marker.setMap(null);
		markers = [];
	});
}

// Places API, unable to create separate callback function and store results
// TODO: implement pagination for more results
function nearbySearch(service, request, map, places, markers) {
	service.nearbySearch(request, function(results, status, pagination) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			places = [];
			clearMarkers(markers);
			results.forEach((place) => {
				places.push(place);
				createMarker(place.geometry.location, map, place.name, markers);
			});
		}
	});
	return places;
}

function passthrough(coordinates) {
	// let placeholder = document.createElement("div");
	// placeholder.innerHTML = coordinates;
	// document.body.appendChild(placeholder);
	// window.history.pushState("string", document.title, "/new-url");

	let newUrl = "?lat=" + coordinates.lat() + "&lng=" + coordinates.lng();
	if (history.pushState) {
		window.history.pushState("string", document.title, newUrl);
	} else {
		document.location.href = newUrl;
	}

	document.getElementById("submitcoords").submit();
}

function initMap() {
	let places = [];
	let markers = [];
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
				radius: 500,
				draggable: true,
			});

			// Marker on current location
			createMarker(currentLocation, map, "You are here.", markers)

			infoWindow.setPosition(currentLocation);
			infoWindow.setContent('You are here.');
			infoWindow.open(map);

			// Center map on current location
			map.setCenter(currentLocation);
			
			// Search for locations
			let request = {
				location: currentLocation,
				rankBy: google.maps.places.RankBy.DISTANCE,
				type: ["cafe"] // types: ["cafe", "restaurant", "park", "lodging", "library"]
			};

			places = nearbySearch(service, request, map, places, markers);
			passthrough(request.location);
			// console.log(currentLocation.lat(), currentLocation.lng());

			// Updates current location based on map movement
			google.maps.event.addListener(map, 'dragend', function() {
				request.location = map.getCenter();
				places = nearbySearch(service, request, map, places, markers);
				cityCircle.setCenter(request.location);
				passthrough(request.location);
			});

			// Getting updated coordinates when circle is dragged
			google.maps.event.addListener(cityCircle, 'dragend', function() {
				request.location = cityCircle.center;
				places = nearbySearch(service, request, map, places, markers);
				passthrough(request.location);
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

