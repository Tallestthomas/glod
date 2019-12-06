const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Menu,
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const { channels } = require('../src/shared/constants');

app.disableHardwareAcceleration();

let mainWindow = null;
let menuWindow = null;

function createMenu() {
  menuWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 720,
    height: 680,
    hasShadow: false,
  });

  menuWindow.loadURL('http://localhost:3000?settings');

  menuWindow.on('closed', () => {
    menuWindow = null;
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
    },
    width: 400,
    height: 680,
    transparent: true,
    hasShadow: false,
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000?timer' : `file://${path.join(__dirname, '../index.html?timer')}`);

  if (isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const template = [
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Edit Settings',
          click: () => createMenu(),
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { role: 'toggleDevTools' },
        { role: 'reload' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
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
