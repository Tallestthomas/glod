const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
} = require('electron');
const os = require('os');
const isDev = require('electron-is-dev');
const path = require('path');

const { channels } = require('../src/shared/constants');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 400,
    height: 680,
    transparent: true,
    hasShadow: false,
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);

  if (isDev) {
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application\ Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'),
    );
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application\ Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0'),
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});
