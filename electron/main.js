const { app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const isDev = require('electron-is-dev')
const path = require('path');
const { channels } = require('../src/shared/constants');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900, 
    height: 680
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    globalShortcut.unregisterAll();
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, { 
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});
