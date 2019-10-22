import React from 'react';
import { Stopwatch, Controls, Splits } from '../';
import { connect } from 'react-redux';
import { 
  startTimer,
  stopTimer,
  setSplit
} from '../../actions/timerActions';


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
    const { dispatch } = this.props;

    this.timerRef = setInterval( () => this.updateTimer(10), 10);
    dispatch(startTimer());
  }

  pauseTimer = () => {
    const { dispatch }  = this.props;

    clearInterval(this.timerRef);
    dispatch(stopTimer());
  }

  stopTimer = () => {
    const { dispatch } = this.props;

    this.setState({ time: 0, currentTimes: []}, () => {
      clearInterval(this.timerRef);
      dispatch(stopTimer())
    });
  }

  splitTime = () => {
    const { dispatch, splitLength} = this.props;
    const { currentSplit, time, currentTimes} = this.state;

    if(currentSplit !== splitLength - 1) {
      this.setState({ 
        currentSplit: currentSplit + 1,
        currentTimes: [...currentTimes, time]
      })
    } else {
      this.setState({ 
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
