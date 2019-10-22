import React from 'react';
import { Stopwatch, Controls, Splits } from '../';
import { connect } from 'react-redux';

class Timer extends React.Component {
  state = {
    time: 0,
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
    const { splitLength} = this.props;
    const { currentSplit, time, currentTimes} = this.state;

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
    }
  }

  render() {
    const { 
      time,
      currentSplit,
      currentTimes,
    } = this.state;

    return (
      <div className="timer-container">
        <Splits currentTimes={currentTimes}/>
        <Stopwatch time={time} currentSplit={currentSplit} />
        <Controls 
          currentSplit={currentSplit}
          start={this.startTimer}
          stop={this.stopTimer}
          pause={this.pauseTimer}
          split={this.splitTime}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const { splits } = timerReducer || {};
  return {
    splitLength: splits.length
  }
}

export default connect(mapStateToProps)(Timer);
