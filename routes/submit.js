"use strict";

let express = require('express');
let router = express.Router();
let cafes = require("./cafes");
let cafeSchema = cafes.cafeSchema;

router.get("/", async function(req, res, next) {
	console.log(cafeSchema.paths.type.enumValues)
	res.render("submit", {
		title: "New Café", 
		cafeTypes: ["Café", "Restaurant", "Other"]
	});
});

module.exports = router;