"use strict";

let express = require('express');
let router = express.Router();
let cafeSchema = require("./cafes");

router.get("/", async function(req, res, next) {
	console.log(cafeSchema.paths.type.enumValues)
	res.render("submit", {
		title: "New Café", 
		cafeTypes: ["Café", "Restaurant", "Other"]
	})
});

module.exports = router;