import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Timer } from './components';
import configureStore from './store';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <div className="App">
          { /* Menu */ }
          <Timer />
        </div>
      </Provider>
    );
  }
}

export default App;
