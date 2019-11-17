import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import ViewManager from './components/ViewManager';
import configureStore from './store';

const { remote } = window.require('electron') || {};
const {
  Menu,
  globalShortcut,
} = remote || {};

class App extends Component {
  menu = null

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      globalShortcut.unregisterAll();
    });

    // getCurrentWindow().setBackgroundColor('#0000');

    const template = [
      {
        label: 'Preferences',
        submenu: [
          {
            label: 'Edit Splits',
            click: () => {
            },
          },
          {
            label: 'Edit Settings',
            click: () => {
              const { BrowserWindow } = remote;
              this.menu = new BrowserWindow({
                webPreferences: {
                  nodeIntegration: true,
                  nativeWindowOpen: true,
                },
                width: 400,
                height: 680,
                transparent: true,
                hasShadow: false,
              });
              this.menu.on('closed', () => {
                this.menu = null;
              });
              this.menu.loadURL('http://localhost:3000?settings');
            },
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

  componentWillUnmount() {
    window.removeEventListener('beforeunload');
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <AppContainer>
          <ViewManager />
        </AppContainer>
      </Provider>
    );
  }
}

export default App;


const AppContainer = styled.div`
font-family: Verdana, sans-serif;
font-weight: bold;
background: #344e5c;
height: 100vh;
`;
