const { utils: { fromBuildIdentifier } } = require("@electron-forge/core");
const appInformation = require("./app-information.json");
require("dotenv").config();

/*
MODE : beta, alpha, stable
SUB_VERSION : version for beta, alpha. For stable version, ignore
*/

module.exports = {
	buildIdentifier: appInformation.mode, // beta or prod
	packagerConfig: {
		name: appInformation.name,
		icon: __dirname + "/assets/icon.icns",
		appBundleId: fromBuildIdentifier({
			beta: "com.beta.thenewboston.account.manager.app",
			alpha: "com.alpha.thenewboston.account.manager.app",
			stable: "com.thenewboston.account.manager.app"
		}),
		"hardened-runtime": true,
		asar: true
	},
	publishers: [
		{
			name: "@electron-forge/publisher-github",
			config: {
				repository: {
					owner: "tpikachu",
					name: "TNB-Account-Manager"
				},
				prerelease: true
			}
		}
	],
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "thenewboston",
				iconUrl: __dirname + "/assets/icon.ico",
				setupIcon: __dirname + "/assets/icon.ico"
			}
		},
		{
			name: "@electron-forge/maker-dmg",
			config: {
				icon: __dirname + "/assets/icon.icns"
			}
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: [ "darwin", "win32", "linux" ]
		},
		{
			name: "@electron-forge/maker-deb",
			config: {}
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {}
		}
	],
	plugins: [
		[
			"@electron-forge/plugin-webpack",
			{
				mainConfig: __dirname + "/webpack.main.config.js",
				renderer: {
					config: __dirname + "/webpack.renderer.config.js",
					entryPoints: [
						{
							html: __dirname + "/public/index.html",
							js: __dirname + "/src/renderer/renderer.tsx",
							name: "main_window"
						}
					]
				}
			}
		]
	]
};
