const { mode, subVersion, appName, version, appId } = require("./app-information.js");
const artifactName = "${productName}-" + version + "-${os}.${ext}";

module.exports = {
	productName: appName,
	appId,
	directories: {
		buildResources: "assets",
		output: "release"
	},
	asar: false,
	files: [ "bundle/**/*", "!build", "!node_modules", "package.json" ],
	mac: {
		target: [ "dmg", "zip" ],
		artifactName
	},
	win: {
		target: [ "nsis", "zip" ],
		artifactName
	},
	linux: {
		target: [ "AppImage" ],
		artifactName
	},
	dmg: {
		title: "${productName}-${version}"
	},
	afterSign: __dirname + "/assets/scripts/notarize.js",
	extends: null
};
