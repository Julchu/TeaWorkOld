"use strict";

let express = require("express");
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('about', { title: "TeaWork", about: "About TeaWork"});
});

router.get('/me', function(req, res, next) {
	res.render('about', { title: "Julian", about: "About Julian" });
});

module.exports = router;