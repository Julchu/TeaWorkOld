"use strict";

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let file = require('./cafes.json');

// const uri = "mongodb://heroku_v670xkbh:km62gbjl3mf08ajvul3a7q49c8@ds051524.mlab.com:51524/heroku_v670xkbh"
const uri = process.env.MONGODB_URI

mongoose.connect(uri, {useNewUrlParser: true});

// Describing schema (class attributes) cafeSchema for Cafe class
let cafeSchema = new mongoose.Schema({
	name: {type: String, default: ""},
	type: {
		type: String,
		default: "Cafe",
		enum: ["Cafe", "Restaurant", "Other"]
	},
	wifi: {
		available: {type: Boolean, default: false},
		name: {type: String, default: ""},
		
		// TODO: encrypt password
		password: {type: String, default: ""},
		fast: {type: Boolean, default: false}
	},
	outlet: {type: Boolean, default: false},
	bathroom: {
		available: {type: Boolean, default: false},
		locked: {type: Boolean, default: false},
		key: {type: Boolean, default: false},
		code: {type: String, default: ""},
		clean: {type: Boolean, default: false}
	},
	clean: {type: Boolean, default: true},
	busy: {
		morning: {type: Boolean, default: false},
		afternoon: {type: Boolean, default: false},
		evening: {type: Boolean, default: false}
	},
	climate: {
		type: String, 
		enum: ["AC", "Heated", "Ventilated", "Stuffy"]
	}
});

let Cafe = mongoose.model("Cafe", cafeSchema, "Cafes");

router.post('/', async function(req, res, next) {
	let cafes = req.body;
	let cafe = new Cafe({
		name: cafes.name, //req.params.name,
		type: cafes.type,
		wifi: cafes.wifi,
		outlet: cafes.outlet,
		bathroom: cafes.bathroom,
		clean: cafes.clean,
		busy: cafes.busy,
		climate: cafes.climate
	});
	await cafe.save();
	await res.json(cafe);
});

router.get('/', async function(req, res, next) {
	let cafeList = {"cafes": []};
	let cafes = file.cafes;
	// console.log(cafes[0]);

	let cafeFlag = req.query["cafes"];
	console.log(cafeFlag);
	for (let i = 0; i < cafes.length; i++) {
		if (cafeFlag) {
			if (cafes[i].type === "Cafe") {
				cafeList.cafes.push(cafes[i]);
			}
		} else {
			cafeList.cafes.push(cafes[i]);
		}
	}
	// let available = req.query["available"];

	// for (let i = 0; i < cafes.length; i++) {
	// 	if (available) {
	// 		if (products[i].inventory_count > 0) {
	// 			productList.products.push(products[i]);
	// 		}
	// 	} else {
	// 		productList.products.push(products[i]);
	// 	}
	// }
	// productList.products.sort();

	res.json(cafeList);
});

/*uter.get('/:product', async function(req, res, next) {
	let products = file.products;
	let product = products.filter(item => item.title === req.params.product);
	res.json(product);
});

router.patch('/:product', async function (req, res, next) {
	let products = file.products;
	let product = products.filter(item => item.title === req.params.product);
	let inventory_count = parseInt(product[0].inventory_count);
	
	if (inventory_count > 0) {
		product[0].inventory_count -= 1;
		res.json(product);
	} else {
		res.statusCode = 500;
		res.json({
			error: {
				message: "Not enough inventory"
			}
		});
	}
}); */

router.get('/', async function(req, res, next) {
	res.render('cafes', { title: "Cafes" });
});

module.exports = router;