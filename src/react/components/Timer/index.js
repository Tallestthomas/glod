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
    currentSplit: 0
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

    this.setState({ time: 0}, () => {
      clearInterval(this.timerRef);
      dispatch(stopTimer())
    });
  }

  splitTime = () => {
    const { dispatch, splitLength} = this.props;
    const { currentSplit, time} = this.state;

    if(currentSplit !== splitLength - 1) {

      dispatch(setSplit(currentSplit, time));
      this.setState({ currentSplit: currentSplit + 1 })
    } else {
      dispatch(setSplit(currentSplit, time));
      clearInterval(this.timerRef);
      dispatch(stopTimer())
    }
  }

  render() {
    const { time, currentSplit } = this.state;
    return (
      <div className="timer-container">
        <Splits />
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
