"use strict";

let express = require('express');
let router = express.Router();

router.post("/", function(req, res, next) {
	res.redirect("/cafes/");
})

router.get("/", function(req, res, next) {
	res.render("login", {
		title: "Login",
		about: "About"
	});
});

module.exports = router;