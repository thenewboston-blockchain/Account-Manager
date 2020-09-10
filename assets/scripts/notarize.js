const fs = require("fs");
const path = require("path");
const electronNotarize = require("electron-notarize");
const { mode, version, subVersion, appName, appId } = require("../../app-information.js");

require("dotenv").config();

module.exports = async (params) => {
	// Only notarize the app on Mac OS only.
	if (process.platform !== "darwin" || params.electronPlatformName !== "darwin") {
		return;
	}

	console.log("afterSign hook triggered", params);

	let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
	if (!fs.existsSync(appPath)) {
		throw new Error(`Cannot find application at: ${appPath}`);
	}

	console.log(`Notarizing ${appId} found at ${appPath}`);

	try {
		await electronNotarize.notarize({
			appBundleId: appId,
			appPath: appPath,
			appleId: process.env.APPLE_ID,
			appleIdPassword: process.env.APPLE_PWD
		});
	} catch (error) {
		console.error(error);
	}

	console.log(`Done notarizing ${appId}`);
};
