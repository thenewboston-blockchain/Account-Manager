const { utils: { fromBuildIdentifier } } = require("@electron-forge/core");

console.log(process.env.MODE);
module.exports = {
	buildIdentifier: process.env.MODE, // beta or prod
	packagerConfig: {
		icon: "assets/app-icon/mac/icon.icns",
		appBundleId: fromBuildIdentifier({
			beta: "com.beta.thenewboston.account.manager.app",
			prod: "com.thenewboston.account.manager.app"
		})
		// asar: true
	},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "thenewboston",
				iconUrl: __dirname + "/assets/app-icon/win/icon.ico",
				setupIcon: __dirname + "/assets/app-icon/win/icon.ico"
			}
		},
		{
			name: "@electron-forge/maker-dmg",
			config: {
				icon: "assets/app-icon/mac/icon.icns"
			}
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: [ "darwin" ]
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
				mainConfig: "./webpack.main.config.js",
				renderer: {
					config: "./webpack.renderer.config.js",
					entryPoints: [
						{
							html: "./public/index.html",
							js: "./src/renderer/renderer.tsx",
							name: "main_window"
						}
					]
				}
			}
		]
		// [ "@electron-forge/plugin-auto-unpack-natives" ]
	]
};
