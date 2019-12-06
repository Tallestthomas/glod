import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { remote } from 'electron';
import ViewManager from './components/ViewManager';
import configureStore from './store';

const {
  globalShortcut,
} = remote || {};

class App extends Component {
  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      globalShortcut.unregisterAll();
    });
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
height: 100%;
`;
