import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { Router, Route } from 'react-router-dom';
import history from './utils/history';

import { Timer, SplitsMenu } from './components';
import configureStore from './store';

const { remote } = window.require('electron') || {};
const {
  Menu,
  globalShortcut,
} = remote || {};

class App extends Component {
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
              history.push('/splits');
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
          <Router history={history}>
            <Route exact path="/" component={Timer} />
            <Route exact path="/splits" component={SplitsMenu} />
          </Router>
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
