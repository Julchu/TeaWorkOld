"use strict";

let express = require('express');
let router = express.Router();

router.get("/", async function(req, res, next) {
	res.render("submit", {
		title: "New Café", 
		cafeTypes: ["Café", "Restaurant", "Other"]
	})
});

module.exports = router;