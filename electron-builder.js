const appInformation = require("./app-information.json");
const artifactName =
	"${productName}-${version}" +
	(appInformation.mode !== "stable" ? `-${appInformation.mode}.${appInformation["sub-version"]}` : "") +
	"-${os}.${ext}";

const appId =
	"com." + (appInformation.mode === "stable" ? "" : appInformation.mode + ".") + "thenewboston.account.manager.app";

module.exports = {
	productName: appInformation.name,
	appId,
	directories: {
		buildResources: "assets",
		output: "release"
	},
	asar: false,
	files: [ "bundle/**/*", "!build", "!node_modules", "app-information.json" ],
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
