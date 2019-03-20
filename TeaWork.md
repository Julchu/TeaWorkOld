- TeaWork: a place for tea, work, and teamwork
- Mobile/web app to find good workspace restaurants/cafes/spots + remember personal preferences
	- Sign in: required for blocking duplicates (Google/Facebook)
		- Required for saving personal preferences
	- Personal preferences used to conglomerate opinions of each location
	- Uses GMaps api to find cafes nearby

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

[My TODO list](/TODO.md)
