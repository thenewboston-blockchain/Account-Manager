import {app, BrowserWindow} from 'electron';
import contextMenu from 'electron-context-menu';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const electronSquirrelStartup = require('electron-squirrel-startup');

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

contextMenu();

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1920,
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((error) => console.log('An error occurred: ', error));
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
