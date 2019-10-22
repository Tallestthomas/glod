import React from 'react';
import { connect } from 'react-redux';

class Controls extends React.PureComponent {
  render(){
    const { 
      isRunning, 
      start, 
      stop, 
      split, 
      pause 
    } = this.props || {};

    console.log('render');

    return (
      <div className="controls">
        { !isRunning 
            ?  <button onClick={() => start()}>Start</button>
            : <button onClick={() => stop()}>Stop</button>
        }
        <button onClick={() => pause()}>Pause</button>
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
