import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Timer } from './components';
import configureStore from './store';
import styled from 'styled-components';
const { remote } = window.require('electron');

class App extends Component {
  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      remote.globalShortcut.unregisterAll();
    })

    window.addEventListener('contextmenu', () => {
      /*
       * @TODO
       * Figure out menu logic for toggling, perhaps look into preferences menu
       */
      console.log('right clicked');
    });

    remote.getCurrentWindow().setBackgroundColor("#0000")
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu');
    window.removeEventListener('beforeunload');
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <AppContainer>
          { /* Menu */ }
          <Timer />
        </AppContainer>
      </Provider>
    );
  }
}

export default App;

const AppContainer = styled.div`
background: transparent;
`
