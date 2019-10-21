import React from 'react';

const Controls = (props) => {
  const { isRunning, start, stop, split, pause } = props || {};

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
};

export default Controls;
