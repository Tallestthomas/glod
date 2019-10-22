import React from 'react';
import { connect } from 'react-redux';
import {
  startTimer,
  stopTimer
} from '../../actions/timerActions'
const { remote } = window.require('electron');

class Controls extends React.PureComponent {
  componentDidMount() {
    const { isRunning } = this.props;
    remote.globalShortcut.register('Cmd+g', () => {
      if(!isRunning){
        this.handleStart()
      }
    })
    remote.globalShortcut.register('Cmd+r', () => {
      this.handleStop();
    })
  }

  componentDidUpdate(){
    const { isRunning, split} = this.props;
    if(isRunning 
      && remote.globalShortcut.isRegistered('Cmd+g')) {
      remote.globalShortcut.unregister('Cmd+g')
      remote.globalShortcut.register('Cmd+g', () => {
        split()
      })
    } else if(!isRunning) {
      remote.globalShortcut.unregister('Cmd+g')
      remote.globalShortcut.register('Cmd+g', () => {
        this.handleStart()
      })
    }
  }

  componentWillUnmount() {
    remote.globalShortcut.unregister('Cmd+g')
    remote.globalShortcut.unregister('Cmd+r')
  }

  handlePause = () => {
    const { dispatch, pause } = this.props;

    dispatch(stopTimer());
    pause();
  }

  handleStart = () => {
    const { dispatch, start } = this.props;

    dispatch(startTimer());
    start();
  }

  handleStop = () => {
    const { dispatch, stop } = this.props;
    dispatch(stopTimer());
    stop();
  }

  render(){
    const { 
      isRunning, 
      split, 
    } = this.props || {};

    return (
      <div className="controls">
        { !isRunning 
            ?  <button onClick={this.handleStart}>Start</button>
            : <button onClick={this.handleStop}>Stop</button>
        }
        <button onClick={this.handlePause}>Pause</button>
        <button>Previous</button>
        <button>Next</button>
        <button onClick={() => split()}>Split</button>
      </div>
    );
  }
}

const mapStateToProps = ({timerReducer}) => {
  const { isRunning } = timerReducer;
  return {
    isRunning
  }
}

export default connect(mapStateToProps)(Controls);
