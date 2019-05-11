// Create the places service.
var service = new google.maps.places.PlacesService(map);
var getNextPage = null;
var moreButton = document.getElementById('more');
moreButton.onclick = function() {
moreButton.disabled = true;
	if (getNextPage) {
		getNextPage();
	}
};

// Perform a nearby search.
service.nearbySearch({location: pyrmont, radius: 500, type: ['store']}, function(results, status, pagination) {
		if (status !== 'OK') {
			return;
		}
		createMarkers(results);
		moreButton.disabled = !pagination.hasNextPage;
		getNextPage = pagination.hasNextPage && function() {
			pagination.nextPage();
		};
	});