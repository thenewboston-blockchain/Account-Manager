const packageJson = require("./package.json");

const appName = packageJson.productName;
const version = packageJson.version;
const mode = version.includes("beta") ? "beta" : version.includes("alpha") ? "alpha" : "stable";
//const appId = "com." + (mode === "stable" ? "" : mode + ".") + "thenewboston.account.manager.app";
const appId = "com.thenewboston.account.manager.app";
const subVersion = version.slice(version.indexOf(mode));

module.exports = {
	appId,
	appName,
	mode,
	version,
	subVersion
};
