/* eslint-disable no-console  */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { app, BrowserWindow, Menu } from "electron";
import contextMenu from "electron-context-menu";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer";

const electronSquirrelStartup = require("electron-squirrel-startup");

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isMac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
	app.quit();
}

const template = [
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{ role: "about" },
						{ type: "separator" },
						{ role: "services" },
						{ type: "separator" },
						{ role: "hide" },
						{ role: "hideothers" },
						{ role: "unhide" },
						{ type: "separator" },
						{ role: "quit" }
					]
				}
			]
		: []),
	{
		label: "File",
		submenu: [ isMac ? { role: "close" } : { role: "quit" } ]
	},
	{
		label: "Edit",
		submenu: [
			{ role: "undo" },
			{ role: "redo" },
			{ type: "separator" },
			{ role: "cut" },
			{ role: "copy" },
			{ role: "paste" },
			...(isMac
				? [
						{ role: "pasteAndMatchStyle" },
						{ role: "delete" },
						{ role: "selectAll" },
						{ type: "separator" },
						{
							label: "Speech",
							submenu: [ { role: "startspeaking" }, { role: "stopspeaking" } ]
						}
					]
				: [ { role: "delete" }, { type: "separator" }, { role: "selectAll" } ])
		]
	},
	{
		label: "View",
		submenu: [
			{ role: "forcereload" },
			{ role: "toggledevtools" },
			{ type: "separator" },
			{ role: "resetzoom" },
			{ role: "zoomin" },
			{ role: "zoomout" },
			{ type: "separator" },
			{ role: "togglefullscreen" }
		]
	},
	{
		label: "Window",
		submenu: [
			{ role: "minimize" },
			{ role: "zoom" },
			...(isMac
				? [ { type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" } ]
				: [ { role: "close" } ])
		]
	},
	{
		role: "help",
		submenu: [
			{
				click: async () => {
					const { shell } = require("electron");
					await shell.openExternal("https://electronjs.org");
				},
				label: "Learn More"
			}
		]
	}
] as Electron.MenuItemConstructorOptions[];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

contextMenu();

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		height: 1080,
		webPreferences: {
			nodeIntegration: true
		},
		width: 1920
	});
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.setName("TNB Account Manager");

app.whenReady().then(() => {
	installExtension([ REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS ])
		.then((name) => console.log(`Added Extension: ${name}`))
		.catch((error) => console.log("An error occurred: ", error));
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (!isMac) {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
