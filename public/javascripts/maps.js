"use strict";

function initMap() {
	let map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		mapTypeControl: false,
		zoom: 18
	});

	let infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		let pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		// Marker on current location
		let marker = new google.maps.Marker({
			position: pos,
			map: map, 
			title: "You are here."
			
			// icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
   //                                                  new google.maps.Size(22,22),
   //                                                  new google.maps.Point(0,18),
   //                                                  new google.maps.Point(11,11)),
		})
			infoWindow.setPosition(pos);
			infoWindow.setContent('You are here.');
			infoWindow.open(map);

			// Center map on current location
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
			});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}