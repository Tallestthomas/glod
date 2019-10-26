import React from 'react';
import { connect } from 'react-redux';
import { 
  setSplit, 
  startRun, 
  setIsPaused,
  setIsRunning,
  setIsComplete,
  updateBestDurations 
} from '../../actions/timerActions'
import { Stopwatch, Controls, Splits } from '../';

class Timer extends React.Component {
  state = {
    time: -1500,
    currentSplit: 0,
  };

  timerRef = null;

  updateTimer = (increment) => { 
    const { time } = this.state;
    const newTime = time + increment;

    this.setState({ time: newTime });
  };

  startTimer = () => {
    const { dispatch, isPaused, isComplete } = this.props;

    if(isComplete) return;

    if(isPaused) {
      dispatch(setIsPaused(false))
    } else {
      dispatch(startRun())
    }
    this.timerRef = setInterval( () => this.updateTimer(10), 10);
  }

  pauseTimer = () => {
    const { dispatch } = this.props; 
    dispatch(setIsPaused(true))
    clearInterval(this.timerRef);
  }

  stopTimer = () => {
    const { dispatch } = this.props;

    dispatch(setIsPaused(false));
    dispatch(setIsRunning(false));
    dispatch(setIsComplete(false));
    clearInterval(this.timerRef); 
    this.setState({ time: 0, currentSplit: 0 });
  }

  splitTime = () => {
    const { isRunning, splitLength, dispatch} = this.props;
    const { currentSplit, time } = this.state;

    if(isRunning){
      if(currentSplit !== splitLength - 1) {
        dispatch(setSplit(time, currentSplit))
        this.setState({ currentSplit: currentSplit + 1 })
      } else {
        dispatch(setSplit(time, currentSplit))
        this.setState({ currentSplit: 0 })
        clearInterval(this.timerRef);
        dispatch(setIsRunning(false));
        dispatch(setIsComplete(true));
        dispatch(updateBestDurations());
      }
    }

  }

  prevSplit = () => {
    const { currentSplit, currentTimes } = this.state;

    if(currentSplit > 0)
      this.setState({
        currentSplit: currentSplit - 1,
        currentTimes: currentTimes.slice(0, -1)
      });
  }

  nextSplit = () => {
    const { currentSplit } = this.state;
    const { splitLength } = this.props;

    if(currentSplit < splitLength - 1)
      this.setState({
        currentSplit: currentSplit + 1,
      });
  }

  render() {
    const { 
      time,
      currentSplit,
      currentTimes,
    } = this.state;

    return (
      <div className="timer-container">
        <Splits 
          currentTimes={currentTimes}
          currentSplit={currentSplit}
        />
        <Stopwatch time={time} currentSplit={currentSplit} />
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
    )
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const { splits, isRunning, isComplete, isPaused } = timerReducer || {};
  return {
    isRunning,
    isComplete,
    isPaused,
    splitLength: splits.length
  }
}

export default connect(mapStateToProps)(Timer);
