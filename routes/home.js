"use strict";

let express = require("express");
let router = express.Router();


router.post('/', async function(req, res, next) {
	await console.log(req.body.cafeName);
	res.redirect("/cafes/" + req.body.cafeName);
});

router.get("/", function(req, res, next) {
	res.render("home", { title: "Teawork" });
});


module.exports = router;