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
		}
	}
}
```

## // TODO: 
```
Finish adding inputs appropriate to required cafe attributes to GUI
Figure out how to run local script from HTML side (troubles with Pug searching directory from URL)
Add parking as filter
Fix Wi-Fi speed filter (Boolean, not String, therefore dropdown/checkbox ands not textbox)
```
