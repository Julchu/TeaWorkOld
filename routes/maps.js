let uri = "";
if (typeof process.env.PLACES_URI == 'undefined') {
	uri = "AIzaSyB5onXIIm_aoftt4QQnyXRsy8LevJ7oCyw";
} else {
	uri = process.env.PLACES_URI;
}

// https://maps.googleapis.com/maps/api/place/nearbysearch/json
//   ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=uri