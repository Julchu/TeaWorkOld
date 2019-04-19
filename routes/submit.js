"use strict";

let express = require('express');
let router = express.Router();
let cafeTypes = require("./cafes").cafeTypes;
// let Cafe = require("./cafes").cafe;
let Cafe = require("./mongo");

router.get("/", async function(req, res, next) {
	res.render("submit", {
		title: "New Café", 
		about:"Add new information about a café",
		cafeTypes: Cafe.schema.obj.type.enum
	});
});

module.exports = router;