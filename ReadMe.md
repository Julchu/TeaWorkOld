# TeaWork: a place for tea, work, and teamwork

## About 
TeaWork is a web and mobile app to find good workspaces at cafes, restaurants, and other spots (parks, schools), and help remember personal preferences

## Features
Signing in (using Google/Facebook accounts) is required as a measure of blocking duplicate/fake submissions
```
- Allows users to saving personal preferences and bookmarks
- Personal preferences and submissions are used to describe each location
- Uses GMaps api to find cafes
```

## Format of Cafe objects
```
{
	cafes
	{
		name: {type: String, default: "Name"},
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
		parking: {type: Boolean, default: false}
	}
}

```
## // TODO: 
```
- NodeJS
-- Implement update/overwrite/merge functionality
-- Implement functionality to search by filter
- User sessions with PassportJS
-- Get authentication working
-- Local
-- Google
-- Facebook
- Password encryption with BCryptJS (not BCrypt)
- Bootstrap 4
-- Login page
-- Add Bootstrap cards to display submit page
-- Add Bootstrap cards to display cafe information
--- Search functionality
--- Search bar fit dropdown menu
-- Filter Tables
- jQuery, React, React Native
```

## Links
- Convert HTML/Pug
-- https://html2jade.org/
- Nav bar tutorial
-- https://www.w3schools.com/bootstrap4/bootstrap_navbar.asp
- Collapsable nav bar
-- https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_navbar_collapse
