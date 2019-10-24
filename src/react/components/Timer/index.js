import React from 'react';
import { connect } from 'react-redux';
import { stopTimer } from '../../actions/timerActions'
import { Stopwatch, Controls, Splits } from '../';

class Timer extends React.Component {
  state = {
    time: -1500,
    currentSplit: 0,
    currentTimes: []
  };

  timerRef = null;

  updateTimer = (increment) => { 
    const { time } = this.state;
    const newTime = time + increment;

    this.setState({ time: newTime });
  };

  startTimer = () => {
    this.timerRef = setInterval( () => this.updateTimer(10), 10);
  }

  pauseTimer = () => {
    clearInterval(this.timerRef);
  }

  stopTimer = () => {
    clearInterval(this.timerRef); 
    this.setState({ time: 0, currentTimes: []});
  }

  splitTime = () => {
    const { isRunning, splitLength, dispatch} = this.props;
    const { currentSplit, time, currentTimes} = this.state;

    if(isRunning){
      if(currentSplit !== splitLength - 1) {
        this.setState({ 
          currentSplit: currentSplit + 1,
          currentTimes: [...currentTimes, time]
        })
      } else {
        this.setState({ 
          currentSplit: 0,
          currentTimes: [...currentTimes, time]
        })
        clearInterval(this.timerRef);
        dispatch(stopTimer());
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
    const { currentSplit, currentTimes } = this.state;
    const { splitLength } = this.props;

    if(currentSplit < splitLength - 1)
      this.setState({
        currentSplit: currentSplit + 1,
        currentTimes: [...currentTimes, null]
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
  const { splits, isRunning } = timerReducer || {};
  return {
    isRunning,
    splitLength: splits.length
  }
}

export default connect(mapStateToProps)(Timer);
