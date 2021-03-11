/* eslint-disable no-console  */

import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import contextMenu from 'electron-context-menu';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';
import fs from 'fs';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';
import menu from './menu';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isMac = process.platform === 'darwin';
const gotTheLock = app.requestSingleInstanceLock();

Menu.setApplicationMenu(menu);

contextMenu({
  menu: (defaultActions) => [defaultActions.inspect()],
});

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1920,
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized() || !mainWindow.isFocused()) {
        mainWindow.restore();
        mainWindow.focus();
      }
    }
  });
  app.whenReady().then(() => {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension: ${name}`))
      .catch((error) => console.log('An error occurred: ', error));
  });
  app.on('ready', createWindow);
}

app.setName('TNB Account Manager');

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMac) {
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

ipcMain.on(IpcChannel.downloadSigningKey, (event, {filePath, payload: signingKey}) => {
  try {
    fs.writeFileSync(filePath, signingKey);
    event.reply(getSuccessChannel(IpcChannel.downloadSigningKey));
  } catch (error) {
    console.log(`Failed to save file: ${IpcChannel.downloadSigningKey}`, error);
    event.reply(getFailChannel(IpcChannel.downloadSigningKey), error.toString());
  }
});

ipcMain.on(IpcChannel.exportStoreData, (event, {filePath, payload: storeData}) => {
  try {
    fs.writeFileSync(filePath, storeData);
    event.reply(getSuccessChannel(IpcChannel.exportStoreData));
  } catch (error) {
    console.log(`Failed to save file: ${IpcChannel.exportStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.exportStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.importStoreData, (event, {filePath}) => {
  try {
    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(jsonData);
      if (!data.managed_banks) {
        event.reply(getFailChannel(IpcChannel.importStoreData), 'Data is improperly formatted');
        return;
      }
      // eslint-disable-next-line no-underscore-dangle
      if (data.__internal__) {
        // eslint-disable-next-line no-underscore-dangle
        delete data.__internal__;
      }

      event.reply(getSuccessChannel(IpcChannel.importStoreData), data);
    });
  } catch (error) {
    console.log(`Failed to read file: ${IpcChannel.importStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.importStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.restartApp, (event) => {
  try {
    console.log('Trying to restart app');
    mainWindow.webContents.reloadIgnoringCache();
    setTimeout(() => {
      event.reply(getSuccessChannel(IpcChannel.restartApp));
    }, 1000);
  } catch (error) {
    console.log('Failed to restart app', error);
    setTimeout(() => {
      event.reply(getFailChannel(IpcChannel.restartApp), error.toString());
    }, 1000);
  }
});
