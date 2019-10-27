import React from 'react';
import { connect } from 'react-redux';
import {
  showControls,
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

    remote.globalShortcut.register('Cmd+1', () => {
      this.handlePrev();
    })

    remote.globalShortcut.register('Cmd+2', () => {
      this.handleNext();
    })

    remote.globalShortcut.register('Cmd+h', () => {
      const { dispatch } = this.props;

      dispatch(showControls())
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

  handlePause = () => {
    const { pause } = this.props;
    pause();
  }

  handleStart = () => {
    const { start } = this.props;
    start();
  }

  handleStop = () => {
    const { stop } = this.props;
    stop();
  }

  handlePrev = () => {
    const { prev } = this.props;
    prev();
  }

  handleNext = () => {
    const { next } = this.props;
    next();
  }

  renderControls = () => {
    const { isRunning } = this.props;
    return ( <div className="controls">
      { !isRunning 
          ?  <button onClick={this.handleStart}>Start</button>
          : <button onClick={this.handleStop}>Stop</button>
      }
      <button onClick={this.handlePause}>Pause</button>
      <button>Previous</button>
      <button>Next</button>
    </div>
    );
  }

  render(){
    const { 
      showControls
    } = this.props || {};

    return (
      showControls ? this.renderControls() : null
    );
  }
}

const mapStateToProps = ({timerReducer}) => {
  const { isRunning, isPaused, isComplete, showControls } = timerReducer;
  return {
    isRunning,
    isPaused,
    isComplete,
    showControls
  }
}

export default connect(mapStateToProps)(Controls);
