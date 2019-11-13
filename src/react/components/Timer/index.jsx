import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  setSplit,
  startRun,
  setIsPaused,
  setIsRunning,
  setIsComplete,
  setPersonalBests,
} from '../../actions/timerActions';
import {
  initApplication,
} from '../../actions';
import {
  Stopwatch,
  Controls,
  Splits,
  PersonalBest,
  SumOfBest,
} from '..';

class TimerComponent extends React.Component {
  state = {
    time: -1500,
    prevTime: 0,
    currentSplit: 0,
  };

  timerRef = null;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(initApplication());
  }

  updateTimer = (increment) => {
    const { time } = this.state;
    const newTime = time + increment;

    this.setState({ time: newTime });
  };

  startTimer = () => {
    const { dispatch, isPaused, isComplete } = this.props;

    if (isComplete) return;

    if (isPaused) {
      dispatch(setIsPaused(false));
    } else {
      dispatch(startRun());
    }
    this.timerRef = setInterval(() => this.updateTimer(10), 10);
  }

  pauseTimer = () => {
    const { dispatch } = this.props;
    dispatch(setIsPaused(true));
    clearInterval(this.timerRef);
  }

  stopTimer = () => {
    const { prevTime } = this.state;
    const { dispatch, isComplete, splits } = this.props;

    if (isComplete) {
      dispatch(setPersonalBests(prevTime));
    }

    dispatch(setIsPaused(false));
    dispatch(setIsRunning(false));
    dispatch(setIsComplete(false));

    // saveSplitFile(splits)

    clearInterval(this.timerRef);

    this.setState({ time: -1500, currentSplit: 0 });
  }

  splitTime = () => {
    const {
      isRunning, splitLength, dispatch, isComplete,
    } = this.props;
    const { currentSplit, time } = this.state;

    if (isComplete) return;

    if (isRunning && time > 0) {
      if (currentSplit !== splitLength - 1) {
        dispatch(setSplit(time, currentSplit));
        this.setState({ currentSplit: currentSplit + 1 });
      } else {
        dispatch(setSplit(time, currentSplit));
        dispatch(setIsComplete(true));
        clearInterval(this.timerRef);
        this.setState({ currentSplit: 0, prevTime: time });
      }
    }
  }

  prevSplit = () => {
    const { currentSplit } = this.state;

    if (currentSplit > 0) {
      this.setState({
        currentSplit: currentSplit - 1,
      });
    }
  }

  nextSplit = () => {
    const { currentSplit } = this.state;
    const { splitLength } = this.props;

    if (currentSplit < splitLength - 1) {
      this.setState({
        currentSplit: currentSplit + 1,
      });
    }
  }

  render() {
    const {
      time,
      currentSplit,
      currentTimes,
    } = this.state;
    const { splits } = this.props;

    return (
      <div className="timer-container">
        <Splits
          currentTimes={currentTimes}
          currentSplit={currentSplit}
        />
        <TimeContainer>
          <Stopwatch time={time} currentSplit={currentSplit} />
          <PersonalBest splits={splits} />
          <SumOfBest splits={splits} />
        </TimeContainer>
        <Controls
          currentSplit={currentSplit}
          next={this.nextSplit}
          pause={this.pauseTimer}
          prev={this.prevSplit}
          split={this.splitTime}
          start={this.startTimer}
          stop={this.stopTimer}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const {
    splits, isRunning, isComplete, isPaused,
  } = timerReducer || {};
  return {
    isRunning,
    isComplete,
    isPaused,
    splits,
    splitLength: splits.length,
  };
};

export default connect(mapStateToProps)(TimerComponent);

const TimeContainer = styled.div`
padding-top: 2rem;
`;
