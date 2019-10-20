import React, { Component } from 'react';
import './App.css';
import { Timer } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        { /* Menu */ }
        <Timer />
      </div>
    );
  }
}

export default App;
