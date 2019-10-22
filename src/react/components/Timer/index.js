import React from 'react';
import { connect } from 'react-redux';
import { Stopwatch, Controls, Splits } from '../';
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
    const { splits, dispatch } = this.props;
    const { currentSplit, time} = this.state;

    if(currentSplit !== splits.length - 1) {

      dispatch(setSplit(currentSplit, time));
      this.setState({ currentSplit: currentSplit + 1 })
    } else {
      dispatch(setSplit(currentSplit, time));
      clearInterval(this.timerRef);
      dispatch(stopTimer())
    }
  }

  render() {
    const { isRunning, splits } = this.props;
    const { time, currentSplit } = this.state;
    return (
      <div className="timer-container">
        <Splits splits={splits}/>
        <Stopwatch time={time} currentSplit={currentSplit} />
        <Controls 
          isRunning={isRunning}
          start={this.startTimer}
          stop={this.stopTimer}
          pause={this.pauseTimer}
          split={this.splitTime}
        />
      </div>
    )
  }
}

const mapStateToProps = ({timerReducer}) => {
  const { isRunning, splits } = timerReducer;
  return {
    isRunning,
    splits
  }
}

export default connect(mapStateToProps)(Timer);
