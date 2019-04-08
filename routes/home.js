"use strict";

let express = require("express");
let router = express.Router();

router.post('/', function(req, res, next) {
	res.redirect("/cafes/" + req.body.cafeName);
});

router.get("/", function(req, res, next) {
	res.render("home", { title: "Teawork" });
});


module.exports = router;