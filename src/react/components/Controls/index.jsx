import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  toggleShowControls,
} from '../../actions/timerActions';
import Button from '../../styles/Button';

const { remote } = window.require('electron');

class Controls extends React.PureComponent {
  componentDidMount() {
    const { isRunning, isPaused } = this.props;
    remote.globalShortcut.register('Right', () => {
      if (!isRunning || isPaused) {
        this.handleStart();
      }
    });
    remote.globalShortcut.register('Left', () => {
      this.handleStop();
    });

    remote.globalShortcut.register('Up', () => {
      this.handlePrev();
    });

    remote.globalShortcut.register('Down', () => {
      this.handleNext();
    });

    remote.globalShortcut.register('Cmd+h', () => {
      const { dispatch } = this.props;

      dispatch(toggleShowControls());
    });
  }

  componentDidUpdate() {
    const { isRunning, isPaused, split } = this.props;

    if (isRunning && !isPaused
      && remote.globalShortcut.isRegistered('Right')) {
      remote.globalShortcut.unregister('Right');
      remote.globalShortcut.register('Right', () => {
        split();
      });
    } else if (!isRunning || isPaused) {
      remote.globalShortcut.unregister('Right');
      remote.globalShortcut.register('Right', () => {
        this.handleStart();
      });
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
    const { isRunning, isPaused } = this.props;
    return (
      <ControlsContainer>
        { !isRunning || isPaused
          ? <Button onClick={this.handleStart}>Start</Button>
          : <Button onClick={this.handleStop}>Stop</Button>}
        <Button onClick={this.handlePause}>Pause</Button>
        <Button>Previous</Button>
        <Button>Next</Button>
      </ControlsContainer>
    );
  }

  render() {
    const {
      showControls,
    } = this.props || {};

    return (
      showControls ? this.renderControls() : null
    );
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const {
    isRunning,
    isPaused,
    isComplete,
    showControls,
  } = timerReducer;
  return {
    isRunning,
    isPaused,
    isComplete,
    showControls,
  };
};

export default connect(mapStateToProps)(Controls);

const ControlsContainer = styled.div`
display: flex;
padding: 1rem 0.5rem;
`;
