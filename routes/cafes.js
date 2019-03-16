"use strict";

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
	res.render('cafes', { title: 'Cafes' });
});

module.exports = router;

// /* GET users listing. */
// router.get('/', function(req, res, next) {
// 	res.send('respond with a resource');
// });