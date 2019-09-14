"use strict";

let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("about", { title: "About", about: "About TeaWork" });
	// Switch to res.status.send();
});

router.get(["/Julian", "/me"], function(req, res, next) {
	res.render("about", { title: "Julian", about: "About Julian" });
	// Switch to res.status.send();
});

module.exports = router;
