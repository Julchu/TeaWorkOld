"use strict";

let express = require("express");
let router = express.Router();

router.get('/', function(req, res, next) {
	res.render("home", { title: "TeaWork" });
});

module.exports = router;