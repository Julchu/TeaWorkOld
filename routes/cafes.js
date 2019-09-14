"use strict";

let express = require("express");
let router = express.Router();
let Cafe = require("./mongo").Cafe;
let file = require("../cafes.json");

router.get("/", async function(req, res, next) {
	let cafeList = { cafés: [] };
	let cafes = file.cafes;

	let cafeFlag = req.query["cafe"];
	let restaurantFlag = req.query["restaurant"];
	let otherFlag = req.query["other"];

	if (cafeFlag || restaurantFlag || otherFlag) {
		for (let i = 0; i < cafes.length; i++) {
			if (cafeFlag) {
				if (cafes[i].type === "Cafe") {
					cafeList.cafes.push(cafes[i]);
				}
			} else if (restaurantFlag) {
				if (cafes[i].type === "Restaurant") {
					cafeList.cafes.push(cafes[i]);
				}
			} else if (otherFlag) {
				if (cafes[i].type === "Other") {
					cafeList.cafes.push(cafes[i]);
				}
			} else {
				cafeList.cafes.push(cafes[i]);
			}
		}
		res.render("cafe", {
			title: cafeList.cafes[0].name,
			content: cafeList.cafes[0].wifi
		});
	} else {
		let title, content;
		let cafes = await Cafe.find(); // .limit(5); // Limits to 5 documents
		if (cafes) {
			content = cafes;
		}
		res.render("cafes", {
			title: "Cafés",
			about: "List of cafés",
			content: content
		});
	}
});

// Navbar search functionality requires POST method for clean URL
router.post("/:cafes", async function(req, res, next) {
	let title, content, about;
	let cafe = await Cafe.findOne({ name: req.params.cafes }); //, type: "Restaurant"}
	if (cafe) {
		title = req.params.cafes;
		about = "About " + title;
		content = cafe;
	} else {
		title = "Café Not Found";
	}
	res.render("cafe", {
		title: title,
		about: about,
		content: content
	});
});

// Search functionality for URL redirection
router.get("/:cafes", async function(req, res, next) {
	let title, content, about;
	let cafe = await Cafe.findOne({ name: req.params.cafes }); //, type: "Restaurant"}
	if (cafe) {
		title = req.params.cafes;
		about = "About " + title;
		content = cafe;
	} else {
		title = "Café Not Found";
	}
	res.render("cafe", {
		title: title,
		about: about,
		content: content
	});
});

module.exports = router;

// Search based on type of place; use url parameters instead
// router.get('/:type', async function(req, res, next) {
// 	let title, content;
// 	let cafe = await Cafe.find({type: req.params.type});
// if (cafe) {
// 	title = req.params.cafes;
// 	content = cafe;
// } else {
// 	title = "Cafe Not Found";
// 	content = "Search for another cafe";
// }
// res.render('cafe', {
// 	title: title,
// 	content: content
// });
// });

// Update information
// router.patch("/:cafes", async function(req, res, next) {
// 	await cafe.save();
// 	res.redirect("/cafes/" + cafe.name);
// });

// router.get("/submit", async function(req, res, next) {
// 	res.render("submit", {
// 		title: "New Café",
// 		cafeTypes: Cafe.paths.type.enumValues
// 	})
// });

// if (inventory_count > 0) {
// 	product[0].inventory_count -= 1;
// 	res.json(product);
// } else {
// 	res.statusCode = 500;
// 	res.json({
// 		error: {
// 			message: "Not enough inventory"
// 		}
// 	});
// }
