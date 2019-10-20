import React from 'react';
import { Stopwatch, Controls, Splits } from '../';

const Timer = () => {
  return (
    <div className="timer-container">
      <Splits />
      <Stopwatch time={0} />
      <Controls />
    </div>
  )
}

export default Timer;
